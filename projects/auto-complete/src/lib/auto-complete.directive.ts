import {
	AfterViewInit,
	booleanAttribute,
	ComponentRef,
	Directive,
	Input,
	numberAttribute,
	OnChanges,
	OnDestroy,
	OnInit,
	SimpleChanges,
	TemplateRef,
	ViewContainerRef,
	inject,
	input,
	output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AbstractControl, ControlContainer, FormControl, FormGroup, FormGroupName } from '@angular/forms';
import { NguiAutoCompleteComponent } from './auto-complete.component';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector -- public API selector is kebab-case by design
	selector: '[ngui-auto-complete]',
})
export class NguiAutoCompleteDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {
	viewContainerRef = inject(ViewContainerRef);
	private parentForm = inject(ControlContainer, { optional: true, host: true, skipSelf: true });

	public autocomplete = input(false, { transform: booleanAttribute });
	public autoCompletePlaceholder = input<string | undefined>(undefined, { alias: 'auto-complete-placeholder' });
	public source = input<any>();
	public pathToData = input<string | undefined>(undefined, { alias: 'path-to-data' });
	public minChars = input(0, { alias: 'min-chars', transform: numberAttribute });
	public displayPropertyName = input<string | undefined>(undefined, { alias: 'display-property-name' });
	public acceptUserInput = input(true, { alias: 'accept-user-input', transform: booleanAttribute });
	public maxNumList = input(undefined, {
		alias: 'max-num-list',
		transform: (value: string | number | undefined) => (value == null ? undefined : numberAttribute(value)),
	});
	public selectValueOf = input<string | undefined>(undefined, { alias: 'select-value-of' });
	public loadingTemplate = input<string | null>(null, { alias: 'loading-template' });
	public listFormatter = input<((arg: any) => string) | string | undefined>(undefined, { alias: 'list-formatter' });
	public loadingText = input('Loading', { alias: 'loading-text' });
	public blankOptionText = input<string | undefined>(undefined, { alias: 'blank-option-text' });
	public noMatchFoundText = input<string | undefined>(undefined, { alias: 'no-match-found-text' });
	public valueFormatter = input<any>(undefined, { alias: 'value-formatter' });
	public tabToSelect = input(true, { alias: 'tab-to-select', transform: booleanAttribute });
	public selectOnBlur = input(false, { alias: 'select-on-blur', transform: booleanAttribute });
	public matchFormatted = input(false, { alias: 'match-formatted', transform: booleanAttribute });
	public autoSelectFirstItem = input(false, { alias: 'auto-select-first-item', transform: booleanAttribute });
	public openOnFocus = input(true, { alias: 'open-on-focus', transform: booleanAttribute });
	public closeOnFocusOut = input(true, { alias: 'close-on-focusout', transform: booleanAttribute });
	public reFocusAfterSelect = input(true, { alias: 're-focus-after-select', transform: booleanAttribute });
	public headerItemTemplate = input<string | null>(null, { alias: 'header-item-template' });
	public ignoreAccents = input(true, { alias: 'ignore-accents', transform: booleanAttribute });
	// Angular template alternatives to the string `list-formatter` / `header-item-template`,
	// forwarded to the dropdown component (they take precedence when provided).
	public itemTemplate = input<TemplateRef<{ $implicit: any; index: number }> | null>(null);
	public headerTemplate = input<TemplateRef<void> | null>(null);

	// Value / forms bindings are still classic @Input()s: `ngModel` is reassigned internally
	// (read-only signal inputs forbid that) and the whole group is slated to be replaced by a
	// ControlValueAccessor in a later phase.
	@Input() public ngModel: string;
	@Input('formControlName') public formControlName: string;
	// if [formControl] is used on the anchor where our directive is sitting
	// a form is not necessary to use a formControl we should also support this
	@Input('formControl') public extFormControl: FormControl;

	public zIndex = input(1, { alias: 'z-index', transform: numberAttribute });
	public isRtl = input(false, { alias: 'is-rtl', transform: booleanAttribute });
	// 'down' / 'up' force the dropdown below / above the input; 'auto' (default) opens
	// below unless the input sits near the bottom of the viewport.
	public openDirection = input<'auto' | 'up' | 'down'>('auto', { alias: 'open-direction' });

	public ngModelChange = output<any>();
	public valueChanged = output<any>();
	public customSelected = output<any>();
	public noMatchFound = output<void>();

	private componentRef: ComponentRef<NguiAutoCompleteComponent>;
	private wrapperEl: HTMLElement;
	private el: HTMLElement;
	private acDropdownEl: HTMLElement;
	private inputEl: HTMLInputElement;
	private formControl: AbstractControl;
	private revertValue: any;
	private dropdownJustHidden: boolean;
	private scheduledBlurHandler: any;
	private documentClickListener: (e: MouseEvent) => any;
	private dropdownSubs = new Subscription();

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
		// wrap this element with <div class="ngui-auto-complete">
		this.wrapperEl = document.createElement('div');
		this.wrapperEl.className = 'ngui-auto-complete-wrapper';
		this.wrapperEl.style.position = 'relative';
		this.el.parentElement.insertBefore(this.wrapperEl, this.el.nextSibling);
		this.wrapperEl.appendChild(this.el);

		// Check if we were supplied with a [formControlName] and it is inside a [form]
		// else check if we are supplied with a [FormControl] regardless if it is inside a [form] tag
		if (this.parentForm && this.formControlName) {
			if (this.parentForm['form']) {
				this.formControl = (this.parentForm['form'] as FormGroup).get(this.formControlName);
			} else if (this.parentForm instanceof FormGroupName) {
				this.formControl = (this.parentForm as FormGroupName).control.controls[this.formControlName];
			}
		} else if (this.extFormControl) {
			this.formControl = this.extFormControl;
		}

		// apply toString() method for the object
		if (!!this.ngModel) {
			this.selectNewValue(this.ngModel);
		} else if (!!this.formControl && this.formControl.value) {
			this.selectNewValue(this.formControl.value);
		}
	}

	ngAfterViewInit() {
		// if this element is not an input tag, move dropdown after input tag
		// so that it displays correctly
		this.inputEl = this.el.tagName === 'INPUT' ? (this.el as HTMLInputElement) : this.el.querySelector('input');

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
		if (this.componentRef) {
			this.componentRef.destroy();
		}
		if (this.documentClickListener) {
			document.removeEventListener('click', this.documentClickListener);
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['ngModel']) {
			this.ngModel = this.setToStringFunction(changes['ngModel'].currentValue);
			this.renderValue(this.ngModel);
		}
	}

	// show auto-complete list below the current element
	public showAutoCompleteDropdown = (event?: any): void => {
		if (this.dropdownJustHidden) {
			return;
		}
		this.hideAutoCompleteDropdown();
		this.scheduledBlurHandler = null;

		this.componentRef = this.viewContainerRef.createComponent(NguiAutoCompleteComponent);

		const component = this.componentRef.instance;
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
		this.componentRef.setInput('loading-template', this.loadingTemplate());
		this.componentRef.setInput('list-formatter', this.listFormatter());
		this.componentRef.setInput('blank-option-text', this.blankOptionText());
		this.componentRef.setInput('no-match-found-text', this.noMatchFoundText());
		this.componentRef.setInput('tab-to-select', this.tabToSelect());
		this.componentRef.setInput('select-on-blur', this.selectOnBlur());
		this.componentRef.setInput('match-formatted', this.matchFormatted());
		this.componentRef.setInput('auto-select-first-item', this.autoSelectFirstItem());
		this.componentRef.setInput('header-item-template', this.headerItemTemplate());
		this.componentRef.setInput('itemTemplate', this.itemTemplate());
		this.componentRef.setInput('headerTemplate', this.headerTemplate());
		this.componentRef.setInput('ignore-accents', this.ignoreAccents());

		this.dropdownSubs.unsubscribe();
		this.dropdownSubs = new Subscription();
		this.dropdownSubs.add(component.valueSelected.subscribe(this.selectNewValue));
		this.dropdownSubs.add(component.textEntered.subscribe(this.enterNewText));
		this.dropdownSubs.add(component.customSelected.subscribe(this.selectCustomValue));
		this.dropdownSubs.add(component.noMatchFound.subscribe(() => this.noMatchFound.emit()));

		this.acDropdownEl = this.componentRef.location.nativeElement;
		this.acDropdownEl.style.display = 'none';

		// if this element is not an input tag, move dropdown after input tag
		// so that it displays correctly

		// TODO: confirm with owners
		// with some reason, viewContainerRef.createComponent is creating element
		// to parent div which is created by us on ngOnInit, please try this with demo

		// if (this.el.tagName !== 'INPUT' && this.acDropdownEl) {
		this.inputEl.parentElement.insertBefore(this.acDropdownEl, this.inputEl.nextSibling);
		// }
		this.revertValue = typeof this.revertValue !== 'undefined' ? this.revertValue : '';

		setTimeout(() => {
			component.reloadList(this.inputEl.value);
			this.styleAutoCompleteDropdown();
			component.dropdownVisible = true;
		});
	};

	public blurHandler(event: any) {
		if (this.componentRef) {
			const component = this.componentRef.instance;

			if (this.selectOnBlur()) {
				component.selectOne(component.filteredList[component.itemIndex]);
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
			this.componentRef.destroy();
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

	public styleAutoCompleteDropdown = () => {
		if (this.componentRef) {
			/* setting width/height auto complete */
			const thisInputElBCR = this.inputEl.getBoundingClientRect();
			const directionOfStyle = this.isRtl() ? 'right' : 'left';

			this.acDropdownEl.style.width = thisInputElBCR.width + 'px';
			this.acDropdownEl.style.position = 'absolute';
			this.acDropdownEl.style.zIndex = '' + this.zIndex();
			this.acDropdownEl.style[directionOfStyle] = '0';
			this.acDropdownEl.style.display = 'inline-block';

			// Reset any previous vertical anchor so re-styling is deterministic.
			this.acDropdownEl.style.top = '';
			this.acDropdownEl.style.bottom = '';

			if (this.shouldOpenUp(thisInputElBCR)) {
				this.acDropdownEl.style.bottom = `${thisInputElBCR.height}px`;
			} else {
				this.acDropdownEl.style.top = `${thisInputElBCR.height}px`;
			}
		}
	};

	// Resolve the vertical opening direction honouring the `open-direction` input.
	// 'auto' keeps the historic heuristic: open above only when the input is within
	// ~100px of the viewport bottom.
	private shouldOpenUp(inputBCR: DOMRect): boolean {
		if (this.openDirection() === 'up') {
			return true;
		}
		if (this.openDirection() === 'down') {
			return false;
		}
		return inputBCR.bottom + 100 > window.innerHeight;
	}

	public setToStringFunction(item: any): any {
		if (item && typeof item === 'object') {
			let displayVal;
			const valueFormatter = this.valueFormatter();
			const listFormatter = this.listFormatter();

			if (typeof valueFormatter === 'string') {
				const matches = valueFormatter.match(/[a-zA-Z0-9_\$]+/g);
				let formatted = valueFormatter;
				if (matches && typeof item !== 'string') {
					matches.forEach((key) => {
						formatted = formatted.replace(key, item[key]);
					});
				}
				displayVal = formatted;
			} else if (typeof valueFormatter === 'function') {
				displayVal = valueFormatter(item);
			} else if (this.displayPropertyName()) {
				displayVal = item[this.displayPropertyName()];
			} else if (typeof listFormatter === 'string' && listFormatter.match(/^\w+$/)) {
				displayVal = item[listFormatter];
			} else {
				displayVal = item.value;
			}
			item.toString = () => displayVal;
		}
		return item;
	}

	public selectNewValue = (item: any) => {
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
		if ((this.parentForm && this.formControlName) || this.extFormControl) {
			if (!!val) {
				this.formControl.patchValue(val);
			}
		}
		if (val !== this.ngModel) {
			this.ngModelChange.emit(val);
		}
		this.valueChanged.emit(val);
		this.hideAutoCompleteDropdown();
		setTimeout(() => {
			if (this.reFocusAfterSelect()) {
				this.inputEl.focus();
			}

			return this.inputEl;
		});
	};

	public selectCustomValue = (text: string) => {
		this.customSelected.emit(text);
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
		this.ngModelChange.emit(value);
		this.valueChanged.emit(value);
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
			component.dropdownVisible = true;
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
