import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	numberAttribute,
	OnInit,
	TemplateRef,
	ViewEncapsulation,
	inject,
	input,
	model,
	output,
	signal,
	viewChild,
} from '@angular/core';
import { NguiAutoCompleteService } from './auto-complete.service';
import { Observable } from 'rxjs';

/** Payload emitted by `(valueSelected)` when the user commits a value. */
export interface NguiAutoCompleteSelection<T = any> {
	/** The committed value — the same value `[(ngModel)]` / `[(value)]` receives. */
	value: T;
	/** The full picked object (or the typed text for a custom value). */
	item: T;
	/** Row position in the shown list; `-1` when the value was typed (`fromSource: false`). */
	index: number;
	/** `true` when the user picked a value from `[source]`; `false` when they typed their own. */
	fromSource: boolean;
}
import { FormsModule } from '@angular/forms';
import { NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
	selector: 'ngui-auto-complete',
	templateUrl: './auto-complete.component.html',
	styleUrls: ['./auto-complete.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [NguiAutoCompleteService],
	imports: [FormsModule, NgClass, NgTemplateOutlet],
})
export class NguiAutoCompleteComponent implements OnInit {
	autoComplete = inject(NguiAutoCompleteService);

	/**
	 * public input properties
	 */
	public autocomplete = input(false, { transform: booleanAttribute });
	public listFormatter = input<((arg: any) => string) | undefined>(undefined, { alias: 'list-formatter' });
	public source = input<any>();
	public pathToData = input('', { alias: 'path-to-data' });
	public minChars = input(0, { alias: 'min-chars', transform: numberAttribute });
	public placeholder = input('');
	public blankOptionText = input('', { alias: 'blank-option-text' });
	// Empty string and "unset" mean different things here: '' suppresses the no-match row,
	// `undefined` shows the default text — so this input stays optional rather than defaulting.
	public noMatchFoundText = input<string | undefined>(undefined, { alias: 'no-match-found-text' });
	public acceptUserInput = input(true, { alias: 'accept-user-input', transform: booleanAttribute });
	public loadingText = input('Loading', { alias: 'loading-text' });
	public loadingTemplate = input<string | null>(null, { alias: 'loading-template' });
	// 0 means "no limit" (the `if (maxNumList())` guard treats 0 as falsy).
	public maxNumList = input(0, { alias: 'max-num-list', transform: numberAttribute });
	public showInputTag = input(true, { alias: 'show-input-tag', transform: booleanAttribute });
	public showDropdownOnInit = input(false, { alias: 'show-dropdown-on-init', transform: booleanAttribute });
	public tabToSelect = input(true, { alias: 'tab-to-select', transform: booleanAttribute });
	public matchFormatted = input(false, { alias: 'match-formatted', transform: booleanAttribute });
	public autoSelectFirstItem = input(false, { alias: 'auto-select-first-item', transform: booleanAttribute });
	public selectOnBlur = input(false, { alias: 'select-on-blur', transform: booleanAttribute });
	public reFocusAfterSelect = input(true, { alias: 're-focus-after-select', transform: booleanAttribute });
	public headerItemTemplate = input<string | null>(null, { alias: 'header-item-template' });
	public ignoreAccents = input(true, { alias: 'ignore-accents', transform: booleanAttribute });
	// Angular template alternatives to the string `list-formatter` / `header-item-template`.
	// When provided they take precedence; the item template receives the item as `$implicit`
	// and the row index as `index`.
	public itemTemplate = input<TemplateRef<{ $implicit: any; index: number }> | null>(null);
	public headerTemplate = input<TemplateRef<void> | null>(null);
	// When used as a standalone component (not via the directive), `up` renders the
	// dropdown above the input; `down`/`auto` keep it below.
	public openDirection = input<'auto' | 'up' | 'down'>('auto', { alias: 'open-direction' });

	// Two-way bindable selected value: `[(value)]="myValue"`.
	public value = model<any>();

	// Fires when the user commits a value (a list pick or an accepted custom value); `fromSource`
	// distinguishes the two. The bare value is also available via `[(value)]`.
	public valueSelected = output<NguiAutoCompleteSelection>();
	public noMatchFound = output<void>();

	public autoCompleteInput = viewChild<ElementRef>('autoCompleteInput');
	public autoCompleteContainer = viewChild<ElementRef>('autoCompleteContainer');

	public dropdownVisible = signal(false);
	public isLoading = signal(false);

	public filteredList = signal<any[]>([]);
	public minCharsEntered = signal(false);
	public itemIndex = signal<number | null>(null);
	public keyword: string;

	private el: HTMLElement; // this component  element `<ngui-auto-complete>`
	private timer = 0;

	private delay = (() => {
		let timer = null;
		return (callback: any, ms: number) => {
			clearTimeout(timer);
			timer = setTimeout(callback, ms);
		};
	})();
	private selectOnEnter = false;

	/**
	 * constructor
	 */
	constructor() {
		const elementRef = inject(ElementRef);

		this.el = elementRef.nativeElement;
	}

	/**
	 * user enters into input el, shows list to select, then select one
	 */
	ngOnInit(): void {
		this.autoComplete.source = this.source();
		this.autoComplete.pathToData = this.pathToData();
		this.autoComplete.listFormatter = this.listFormatter();
		if (this.autoSelectFirstItem()) {
			this.itemIndex.set(0);
		}
		setTimeout(() => {
			const input = this.autoCompleteInput();
			if (input && this.reFocusAfterSelect()) {
				input.nativeElement.focus();
			}
			if (this.showDropdownOnInit()) {
				this.showDropdownList({ target: { value: '' } });
			}
		});
	}

	public isSrcArr(): boolean {
		return Array.isArray(this.source());
	}

	public reloadListInDelay = (evt: any): void => {
		const delayMs = this.isSrcArr() ? 10 : 500;
		const keyword = evt.target.value;

		// executing after user stopped typing
		this.delay(() => this.reloadList(keyword), delayMs);
	};

	public showDropdownList(event: any): void {
		this.dropdownVisible.set(true);
		this.reloadList(event.target.value);
	}

	public hideDropdownList(): void {
		this.selectOnEnter = false;
		this.dropdownVisible.set(false);
	}

	public findItemFromSelectValue(selectText: string): any {
		const matchingItems = this.filteredList().filter((item) => '' + item === selectText);
		return matchingItems.length ? matchingItems[0] : null;
	}

	public reloadList(keyword: string): void {
		this.filteredList.set([]);
		if (keyword.length < (this.minChars() || 0)) {
			this.minCharsEntered.set(false);
			return;
		} else {
			this.minCharsEntered.set(true);
		}

		const maxNumList = this.maxNumList();
		const source = this.source();

		if (this.isSrcArr()) {
			// local source
			this.isLoading.set(false);
			let list = this.autoComplete.filter(source, keyword, this.matchFormatted(), this.ignoreAccents());
			if (maxNumList) {
				list = list.slice(0, maxNumList);
			}
			this.filteredList.set(list);
			if (this.minCharsEntered() && !this.filteredList().length) {
				this.noMatchFound.emit();
			}
		} else {
			// remote source
			this.isLoading.set(true);

			if (typeof source === 'function') {
				// custom function that returns observable
				(source(keyword) as Observable<any>).subscribe({
					next: (resp) => {
						if (this.pathToData()) {
							const paths = this.pathToData().split('.');
							paths.forEach((prop) => (resp = resp[prop]));
						}
						let list = resp;
						if (maxNumList) {
							list = list.slice(0, maxNumList);
						}
						this.filteredList.set(list);
						this.isLoading.set(false);
						if (this.minCharsEntered() && !this.filteredList().length) {
							this.noMatchFound.emit();
						}
					},
					error: (error) => {
						console.warn(error);
						this.isLoading.set(false);
					},
				});
			} else {
				// remote source
				this.autoComplete.getRemoteData(keyword).subscribe({
					next: (resp) => {
						let list = resp ? resp : [];
						if (maxNumList) {
							list = list.slice(0, maxNumList);
						}
						this.filteredList.set(list);
						this.isLoading.set(false);
						if (this.minCharsEntered() && !this.filteredList().length) {
							this.noMatchFound.emit();
						}
					},
					error: (error) => {
						console.warn(error);
						this.isLoading.set(false);
					},
				});
			}
		}
	}

	public selectOne(data: any, index = -1) {
		if (!!data || data === '') {
			this.value.set(data);
			this.valueSelected.emit({ value: data, item: data, index, fromSource: true });
		} else {
			this.valueSelected.emit({ value: this.keyword, item: this.keyword, index: -1, fromSource: false });
		}
	}

	public blurHandler(evt: any) {
		if (this.selectOnBlur()) {
			this.selectOne(this.filteredList()[this.itemIndex()], this.itemIndex() ?? -1);
		}

		this.hideDropdownList();
	}

	public inputElKeyHandler = (evt: any) => {
		const totalNumItem = this.filteredList().length;

		if (!this.selectOnEnter && this.autoSelectFirstItem() && 0 !== totalNumItem) {
			this.selectOnEnter = true;
		}

		switch (evt.keyCode) {
			case 27: // ESC, hide auto complete
				this.selectOnEnter = false;
				this.selectOne(undefined);
				break;

			case 38: // UP, select the previous li el
				if (0 === totalNumItem) {
					return;
				}
				this.selectOnEnter = true;
				this.itemIndex.set((totalNumItem + this.itemIndex() - 1) % totalNumItem);
				this.scrollToView(this.itemIndex());
				break;

			case 40: // DOWN, select the next li el or the first one
				if (0 === totalNumItem) {
					return;
				}
				this.selectOnEnter = true;
				this.dropdownVisible.set(true);
				const sum = this.itemIndex() === null ? 0 : this.itemIndex() + 1;
				this.itemIndex.set((totalNumItem + sum) % totalNumItem);
				this.scrollToView(this.itemIndex());
				break;

			case 13: // ENTER, choose it!!
				if (this.selectOnEnter) {
					this.selectOne(this.filteredList()[this.itemIndex()], this.itemIndex() ?? -1);
				}
				evt.preventDefault();
				break;

			case 9: // TAB, choose if tab-to-select is enabled
				if (this.tabToSelect()) {
					this.selectOne(this.filteredList()[this.itemIndex()], this.itemIndex() ?? -1);
				}
				break;
		}
	};

	public scrollToView(index) {
		const container = this.autoCompleteContainer().nativeElement;
		const ul = container.querySelector('ul');
		const li = ul.querySelector('li'); // just sample the first li to get height
		const liHeight = li.offsetHeight;
		const scrollTop = ul.scrollTop;
		const viewport = scrollTop + ul.offsetHeight;
		const scrollOffset = liHeight * index;
		if (scrollOffset < scrollTop || scrollOffset + liHeight > viewport) {
			ul.scrollTop = scrollOffset;
		}
	}

	public trackByIndex(index, item) {
		return index;
	}

	get emptyList(): boolean {
		return !(
			this.isLoading() ||
			(this.minCharsEntered() && !this.isLoading() && !this.filteredList().length) ||
			this.filteredList().length
		);
	}
}
