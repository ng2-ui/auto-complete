import {
	AfterViewInit,
	booleanAttribute,
	ComponentRef,
	Directive,
	forwardRef,
	numberAttribute,
	OnDestroy,
	OnInit,
	TemplateRef,
	ViewContainerRef,
	inject,
	input,
	output,
} from '@angular/core';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NguiAutoCompleteComponent, NguiAutoCompleteSelection } from './auto-complete.component';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector -- public API selector is kebab-case by design
	selector: '[ngui-auto-complete]',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => NguiAutoCompleteDirective),
			multi: true,
		},
	],
})
export class NguiAutoCompleteDirective implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
	viewContainerRef = inject(ViewContainerRef);
	private overlay = inject(Overlay);

	public autocomplete = input(false, { transform: booleanAttribute });
	public autoCompletePlaceholder = input('', { alias: 'auto-complete-placeholder' });
	// Required — array, URL string, or a function returning an `Observable`.
	public source = input.required<any>();
	public pathToData = input('', { alias: 'path-to-data' });
	public minChars = input(0, { alias: 'min-chars', transform: numberAttribute });
	// Controls the text shown in the input after selecting an object: a property name
	// (e.g. `display-with="name"`) or a function (`[display-with]="(item) => …"`).
	public displayWith = input<string | ((item: any) => string) | undefined>(undefined, { alias: 'display-with' });
	public acceptUserInput = input(true, { alias: 'accept-user-input', transform: booleanAttribute });
	// 0 means "no limit" (the `if (maxNumList())` guard treats 0 as falsy).
	public maxNumList = input(0, { alias: 'max-num-list', transform: numberAttribute });
	public selectValueOf = input('', { alias: 'select-value-of' });
	public loadingTemplate = input<TemplateRef<void> | null>(null);
	public listFormatter = input<((arg: any) => string) | string | undefined>(undefined, { alias: 'list-formatter' });
	public loadingText = input('Loading', { alias: 'loading-text' });
	public blankOptionText = input('', { alias: 'blank-option-text' });
	// Empty string and "unset" mean different things here: '' suppresses the no-match row,
	// `undefined` shows the default text — so this input stays optional rather than defaulting.
	public noMatchFoundText = input<string | undefined>(undefined, { alias: 'no-match-found-text' });
	public tabToSelect = input(true, { alias: 'tab-to-select', transform: booleanAttribute });
	public selectOnBlur = input(false, { alias: 'select-on-blur', transform: booleanAttribute });
	public matchFormatted = input(false, { alias: 'match-formatted', transform: booleanAttribute });
	public autoSelectFirstItem = input(false, { alias: 'auto-select-first-item', transform: booleanAttribute });
	public openOnFocus = input(true, { alias: 'open-on-focus', transform: booleanAttribute });
	public closeOnFocusOut = input(true, { alias: 'close-on-focusout', transform: booleanAttribute });
	public reFocusAfterSelect = input(true, { alias: 're-focus-after-select', transform: booleanAttribute });
	public ignoreAccents = input(true, { alias: 'ignore-accents', transform: booleanAttribute });
	// `ng-template`s forwarded to the dropdown component (itemTemplate takes precedence over the
	// string `list-formatter`; headerTemplate renders a non-selectable header row).
	public itemTemplate = input<TemplateRef<{ $implicit: any; index: number }> | null>(null);
	public headerTemplate = input<TemplateRef<void> | null>(null);

	public zIndex = input(1, { alias: 'z-index', transform: numberAttribute });
	// 'down' / 'up' force the dropdown below / above the input; 'auto' (default) opens
	// below unless the input sits near the bottom of the viewport.
	public openDirection = input<'auto' | 'up' | 'down'>('auto', { alias: 'open-direction' });

	// Fires when the user commits a value (a list pick or an accepted custom value); `fromSource`
	// distinguishes the two. The value itself also flows through Angular forms via the
	// ControlValueAccessor below (`[(ngModel)]`, `[formControl]` or `formControlName`).
	public valueSelected = output<NguiAutoCompleteSelection>();
	public noMatchFound = output<void>();

	private componentRef?: ComponentRef<NguiAutoCompleteComponent>;
	private overlayRef: OverlayRef | null = null;
	private el: HTMLElement;
	private inputEl!: HTMLInputElement;
	private value: any;
	private revertValue: any;
	private dropdownJustHidden = false;
	private scheduledBlurHandler: any;
	private documentClickListener!: (e: MouseEvent) => any;
	private dropdownSubs = new Subscription();

	// ControlValueAccessor callbacks (registered by Angular forms).
	private onChange: (value: any) => void = () => {};
	private onTouched: () => void = () => {};

	constructor() {
		this.el = this.viewContainerRef.element.nativeElement;
	}

	ngOnInit(): void {
		// Blur event is handled only after a click event.
		// This is to prevent handling of blur events resulting from interacting with a scrollbar
		// introduced by content overflow (Internet explorer issue).
		// See issue description here: http://stackoverflow.com/questions/2023779/clicking-on-a-divs-scroll-bar-fires-the-blur-event-in-ie
		this.documentClickListener = (e) => {
			if (this.scheduledBlurHandler) {
				this.scheduledBlurHandler();
				this.scheduledBlurHandler = null;
			}
		};

		document.addEventListener('click', this.documentClickListener);
	}

	ngAfterViewInit() {
		// if this element is not an input tag, move dropdown after input tag
		// so that it displays correctly
		this.inputEl = this.el.tagName === 'INPUT' ? (this.el as HTMLInputElement) : (this.el.querySelector('input') as HTMLInputElement);

		// Render any value Angular forms wrote before the input element was available.
		this.renderInputValue(this.value);

		if (this.openOnFocus()) {
			this.inputEl.addEventListener('focus', (e) => this.showAutoCompleteDropdown(e));
		}

		if (this.closeOnFocusOut()) {
			this.inputEl.addEventListener('focusout', (e) => this.hideAutoCompleteDropdown(e));
		}

		if (!this.autocomplete()) {
			this.inputEl.setAttribute('autocomplete', 'off');
		}
		this.inputEl.addEventListener('blur', (e) => {
			this.scheduledBlurHandler = () => {
				return this.blurHandler(e);
			};
		});
		this.inputEl.addEventListener('keydown', (e) => this.keydownEventHandler(e));
		this.inputEl.addEventListener('input', (e) => this.inputEventHandler(e));
	}

	ngOnDestroy(): void {
		this.dropdownSubs.unsubscribe();
		if (this.overlayRef) {
			this.overlayRef.dispose();
			this.overlayRef = null;
		}
		this.componentRef = undefined;
		if (this.documentClickListener) {
			document.removeEventListener('click', this.documentClickListener);
		}
	}

	// ----- ControlValueAccessor -----

	writeValue(value: any): void {
		this.value = value;
		this.renderInputValue(value);
	}

	registerOnChange(fn: (value: any) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		if (this.inputEl) {
			this.inputEl.disabled = isDisabled;
		}
	}

	private renderInputValue(value: any): void {
		const item = value && typeof value === 'object' ? this.setToStringFunction(value) : value;
		this.renderValue(item === null || item === undefined ? '' : item);
	}

	// show auto-complete list anchored to the current element via a CDK overlay
	public showAutoCompleteDropdown = (event?: any): void => {
		if (this.dropdownJustHidden) {
			return;
		}
		this.hideAutoCompleteDropdown();
		this.scheduledBlurHandler = null;

		// Render the dropdown in a CDK overlay anchored to the input. The overlay lives at the
		// document root, so it escapes any ancestor's clipping / stacking context (e.g. a
		// mat-form-field), and the position strategy flips it above/below on overflow.
		this.overlayRef = this.overlay.create({
			width: this.inputEl.getBoundingClientRect().width,
			scrollStrategy: this.overlay.scrollStrategies.reposition(),
			direction: (getComputedStyle(this.inputEl).direction as 'ltr' | 'rtl') || 'ltr',
			positionStrategy: this.overlay
				.position()
				.flexibleConnectedTo(this.inputEl)
				.withFlexibleDimensions(false)
				.withPush(false)
				.withPositions(this.dropdownPositions()),
		});
		// Honour the z-index input within the overlay layer (rarely needed — the overlay already
		// renders above page content; useful only to order overlapping overlays).
		this.overlayRef.hostElement.style.zIndex = '' + this.zIndex();

		this.componentRef = this.overlayRef.attach(new ComponentPortal(NguiAutoCompleteComponent));

		const component = this.componentRef.instance;
		// The host is an inline custom element and the overlay pane is a flex container, so it would
		// otherwise shrink to its content. Force it to fill the overlay's (input-matched) width.
		const host = this.componentRef.location.nativeElement as HTMLElement;
		host.style.display = 'block';
		host.style.width = '100%';
		component.keyword = this.inputEl.value;

		// Forward inputs to the dynamically created dropdown component. Signal inputs are
		// read-only from outside, so we set them through the ComponentRef.
		this.componentRef.setInput('show-input-tag', false); // Do NOT display autocomplete input tag separately
		this.componentRef.setInput('path-to-data', this.pathToData());
		this.componentRef.setInput('min-chars', this.minChars());
		this.componentRef.setInput('source', this.source());
		this.componentRef.setInput('placeholder', this.autoCompletePlaceholder());
		this.componentRef.setInput('accept-user-input', this.acceptUserInput());
		this.componentRef.setInput('max-num-list', this.maxNumList());

		this.componentRef.setInput('loading-text', this.loadingText());
		this.componentRef.setInput('loadingTemplate', this.loadingTemplate());
		this.componentRef.setInput('list-formatter', this.listFormatter());
		this.componentRef.setInput('blank-option-text', this.blankOptionText());
		this.componentRef.setInput('no-match-found-text', this.noMatchFoundText());
		this.componentRef.setInput('tab-to-select', this.tabToSelect());
		this.componentRef.setInput('select-on-blur', this.selectOnBlur());
		this.componentRef.setInput('match-formatted', this.matchFormatted());
		this.componentRef.setInput('auto-select-first-item', this.autoSelectFirstItem());
		this.componentRef.setInput('itemTemplate', this.itemTemplate());
		this.componentRef.setInput('headerTemplate', this.headerTemplate());
		this.componentRef.setInput('ignore-accents', this.ignoreAccents());

		this.dropdownSubs.unsubscribe();
		this.dropdownSubs = new Subscription();
		this.dropdownSubs.add(component.valueSelected.subscribe(this.onSelection));
		this.dropdownSubs.add(component.noMatchFound.subscribe(() => this.noMatchFound.emit()));

		this.revertValue = typeof this.revertValue !== 'undefined' ? this.revertValue : '';

		setTimeout(() => {
			component.reloadList(this.inputEl.value);
			component.dropdownVisible.set(true);
			this.overlayRef?.updatePosition();
		});
	};

	// Preferred connected positions, ordered by `open-direction`. CDK falls through the list and
	// flips on overflow; `auto`/`down` prefer below, `up` prefers above.
	private dropdownPositions(): ConnectedPosition[] {
		const below: ConnectedPosition = { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' };
		const above: ConnectedPosition = { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' };
		return this.openDirection() === 'up' ? [above, below] : [below, above];
	}

	public blurHandler(event: any) {
		if (this.componentRef) {
			const component = this.componentRef.instance;
			this.onTouched();

			if (this.selectOnBlur()) {
				component.selectOne(component.filteredList()[component.itemIndex() ?? -1], component.itemIndex() ?? -1);
			}

			if (this.closeOnFocusOut()) {
				this.hideAutoCompleteDropdown(event);
			}
		}
	}

	public hideAutoCompleteDropdown = (event?: any): void => {
		if (this.componentRef) {
			let currentItem: any;
			const hasRevertValue = typeof this.revertValue !== 'undefined';
			if (this.inputEl && hasRevertValue && this.acceptUserInput() === false) {
				currentItem = this.componentRef.instance.findItemFromSelectValue(this.inputEl.value);
			}
			this.dropdownSubs.unsubscribe();
			if (this.overlayRef) {
				this.overlayRef.dispose();
				this.overlayRef = null;
			}
			this.componentRef = undefined;

			if (this.inputEl && hasRevertValue && this.acceptUserInput() === false && currentItem === null && this.inputEl.value !== '') {
				this.selectNewValue(this.revertValue);
				currentItem = this.revertValue;
			} else if (this.inputEl && this.acceptUserInput() === true && typeof currentItem === 'undefined' && event && event.target.value) {
				this.enterNewText(event.target.value);
			}
			this.revertValue = currentItem;
		}
		this.dropdownJustHidden = true;
		setTimeout(() => (this.dropdownJustHidden = false), 100);
	};

	public setToStringFunction(item: any): any {
		if (item && typeof item === 'object') {
			let displayVal;
			const displayWith = this.displayWith();

			if (typeof displayWith === 'function') {
				displayVal = displayWith(item);
			} else if (typeof displayWith === 'string' && displayWith) {
				displayVal = item[displayWith];
			} else {
				displayVal = item.value;
			}
			item.toString = () => displayVal;
		}
		return item;
	}

	// Route the dropdown's unified selection event to the matching handler.
	private onSelection = (selection: NguiAutoCompleteSelection) => {
		if (selection.fromSource) {
			this.selectNewValue(selection.item, selection.index);
		} else {
			this.selectCustomValue(selection.value);
		}
	};

	public selectNewValue = (item: any, index = -1) => {
		// make displayable value
		if (item && typeof item === 'object') {
			item = this.setToStringFunction(item);
		}

		this.renderValue(item);

		// make return value
		let val = item;
		const selectValueOf = this.selectValueOf();
		if (selectValueOf && item !== null && typeof item === 'object') {
			val = item[selectValueOf];
		}
		this.value = val;
		this.onChange(val);
		this.onTouched();
		this.valueSelected.emit({ value: val, item, index, fromSource: true });
		this.hideAutoCompleteDropdown();
		setTimeout(() => {
			if (this.reFocusAfterSelect()) {
				this.inputEl.focus();
			}

			return this.inputEl;
		});
	};

	public selectCustomValue = (text: string) => {
		this.valueSelected.emit({ value: text, item: text, index: -1, fromSource: false });
		this.hideAutoCompleteDropdown();
		setTimeout(() => {
			if (this.reFocusAfterSelect()) {
				this.inputEl.focus();
			}

			return this.inputEl;
		});
	};

	public enterNewText = (value: any) => {
		this.renderValue(value);
		this.value = value;
		this.onChange(value);
		this.hideAutoCompleteDropdown();
	};

	private keydownEventHandler = (evt: any) => {
		if (this.componentRef) {
			const component = this.componentRef.instance;
			component.inputElKeyHandler(evt);
		}
	};

	private inputEventHandler = (evt: any) => {
		if (this.componentRef) {
			const component = this.componentRef.instance;
			component.dropdownVisible.set(true);
			component.keyword = evt.target.value;
			component.reloadListInDelay(evt);
		} else {
			this.showAutoCompleteDropdown();
		}
	};

	private renderValue(item: any) {
		if (!!this.inputEl) {
			this.inputEl.value = '' + item;
		}
	}
}
