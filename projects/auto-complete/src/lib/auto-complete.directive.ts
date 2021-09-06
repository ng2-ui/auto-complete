import {
  AfterViewInit, ComponentFactoryResolver,
  ComponentRef,
  Directive,
  EventEmitter, Host,
  Input,
  OnChanges,
  OnDestroy,
  OnInit, Optional,
  Output, SimpleChanges, SkipSelf, ViewContainerRef
} from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroup, FormGroupName } from '@angular/forms';
import { NguiAutoCompleteComponent } from './auto-complete.component';
import { AutoCompleteFilter } from './model/auto-complete.filter';
import { NguiAutoCompleteNoMatchFoundMessage } from './model/no-match-found-message.model';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[auto-complete], [ngui-auto-complete]'
})
export class NguiAutoCompleteDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input('outer-input-element') public outerInputElement: HTMLInputElement;
  @Input('autocomplete') public autocomplete = false;
  @Input('auto-complete-placeholder') public autoCompletePlaceholder: string;
  @Input('source') public source: any;
  @Input('path-to-data') public pathToData: string;
  @Input('min-chars') public minChars: number;
  @Input('display-property-name') public displayPropertyName: string;
  @Input('accept-user-input') public acceptUserInput = true;
  @Input('max-num-list') public maxNumList: string;
  @Input('select-value-of') public selectValueOf: string;
  @Input('loading-template') public loadingTemplate = null;
  @Input('list-formatter') public listFormatter;
  @Input('loading-text') public loadingText = 'Loading';
  @Input('blank-option-text') public blankOptionText: string;
  @Input('value-formatter') public valueFormatter: any;
  @Input('tab-to-select') public tabToSelect = true;
  @Input('select-on-blur') public selectOnBlur = false;
  @Input('match-formatted') public matchFormatted = false;
  @Input('auto-select-first-item') public autoSelectFirstItem = false;
  @Input('open-on-focus') public openOnFocus = true;
  @Input('close-on-focusout') public closeOnFocusOut = true;
  @Input('re-focus-after-select') public reFocusAfterSelect = true;
  @Input('header-item-template') public headerItemTemplate = null;
  @Input('ignore-accents') public ignoreAccents = true;
  @Input('filters') public filters: AutoCompleteFilter[];
  @Input('item-height') public itemHeight = 37;
  @Input('max-height-top-gap') public maxHeightTopGap = 0;

  @Input() public ngModel: string;
  @Input('form') public form: FormGroup;
  @Input('formControlName') public formControlName: string;
  // if [formControl] is used on the anchor where our directive is sitting
  // a form is not necessary to use a formControl we should also support this
  @Input('formControl') public formControl: AbstractControl;
  @Input('extFormControl') public extFormControl: AbstractControl;
  @Input('z-index') public zIndex = '1';
  @Input('is-rtl') public isRtl = false;
  @Input('hide-on-no-match-found') public hideOnNoMatchFound: boolean = false;

  @Input('no-match-found-text')
  public set noMatchFoundText(noMatchFoundMessage: string | NguiAutoCompleteNoMatchFoundMessage) {
    if (typeof noMatchFoundMessage === 'string') {
      this.noMatchFoundMessage = {text: noMatchFoundMessage};
    } else {
      this.noMatchFoundMessage = noMatchFoundMessage;
    }
  }

  @Output() public ngModelChange = new EventEmitter();
  @Output() public valueChanged = new EventEmitter();
  @Output() public customSelected = new EventEmitter();
  @Output() public noMatchFoundAction = new EventEmitter();

  public noMatchFoundMessage: NguiAutoCompleteNoMatchFoundMessage;

  private componentRef: ComponentRef<NguiAutoCompleteComponent>;
  private wrapperEl: HTMLElement;
  private el: HTMLElement;   // this element element, can be any
  private acDropdownEl: HTMLElement; // auto complete element
  private inputEl: HTMLInputElement;  // input element of this element
  private revertValue: any;
  private dropdownJustHidden: boolean;
  private scheduledBlurHandler: any;
  private documentClickListener: (e: MouseEvent) => any;
  private filterClicked: boolean;

  constructor(private resolver: ComponentFactoryResolver,
              public  viewContainerRef: ViewContainerRef,
              @Optional() @Host() @SkipSelf() private parentForm: ControlContainer) {
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

    if (this.outerInputElement) {
      this.inputEl = this.outerInputElement;
    } else {
      this.inputEl = this.el.tagName === 'INPUT' ? this.el as HTMLInputElement : this.el.querySelector('input');
    }

    if (this.openOnFocus) {
      this.inputEl.addEventListener('focus', this.showAutoCompleteDropdown);
    }

    if (this.closeOnFocusOut && !(this.filters && this.filters.length)) {
      this.inputEl.addEventListener('focusout', this.hideAutoCompleteDropdown);
    }

    if (!this.autocomplete) {
      this.inputEl.setAttribute('autocomplete', 'off');
    }
    this.inputEl.addEventListener('blur', this.blurEventHandler);
    this.inputEl.addEventListener('keydown', this.keydownEventHandler);
    this.inputEl.addEventListener('input', this.inputEventHandler);
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.instance.valueSelected.unsubscribe();
      this.componentRef.instance.textEntered.unsubscribe();
    }
    if (this.documentClickListener) {
      document.removeEventListener('click', this.documentClickListener);
    }

    if (this.outerInputElement) {
      this.inputEl.removeEventListener('focus', this.showAutoCompleteDropdown);
      this.inputEl.removeEventListener('focusout', this.hideAutoCompleteDropdown);
      this.inputEl.removeEventListener('blur', this.blurEventHandler);
      this.inputEl.removeEventListener('keydown', this.keydownEventHandler);
      this.inputEl.removeEventListener('input', this.inputEventHandler);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ngModel']) {
      this.ngModel = this.setToStringFunction(changes['ngModel'].currentValue);
      this.renderValue(this.ngModel);
    }
  }

  blurEventHandler = (e) => {
    this.scheduledBlurHandler = () => {
      return this.blurHandler(e);
    };
  }

  // show auto-complete list below the current element
  public showAutoCompleteDropdown = (event?: any): void => {
    if (this.dropdownJustHidden) {
      return;
    }
    this.hideAutoCompleteDropdown();
    this.scheduledBlurHandler = null;

    const factory = this.resolver.resolveComponentFactory(NguiAutoCompleteComponent);

    this.componentRef = this.viewContainerRef.createComponent(factory);

    const component = this.componentRef.instance;
    component.keyword = this.inputEl.value;
    component.showInputTag = false; // Do NOT display autocomplete input tag separately

    component.pathToData = this.pathToData;
    component.minChars = this.minChars;
    component.source = this.source;
    component.placeholder = this.autoCompletePlaceholder;
    component.acceptUserInput = this.acceptUserInput;
    component.maxNumList = parseInt(this.maxNumList, 10);

    component.loadingText = this.loadingText;
    component.loadingTemplate = this.loadingTemplate;
    component.listFormatter = this.listFormatter;
    component.blankOptionText = this.blankOptionText;
    component.hideOnNoMatchFound = this.hideOnNoMatchFound;
    component.noMatchFoundMessage = this.noMatchFoundMessage;
    component.tabToSelect = this.tabToSelect;
    component.selectOnBlur = this.selectOnBlur;
    component.matchFormatted = this.matchFormatted;
    component.autoSelectFirstItem = this.autoSelectFirstItem;
    component.headerItemTemplate = this.headerItemTemplate;
    component.ignoreAccents = this.ignoreAccents;
    component.filters = this.filters || [];
    component.itemHeight = this.itemHeight;
    component.triggerInputHeight = this.inputEl.getBoundingClientRect().height;
    component.maxHeightTopGap = this.maxHeightTopGap;

    component.valueSelected.subscribe(this.selectNewValue);
    component.textEntered.subscribe(this.enterNewText);
    component.customSelected.subscribe(this.selectCustomValue);
    component.filterSelected.subscribe(this.filterSelected);
    component.noMatchFoundAction.subscribe(this.emitNoMatchFoundAction);

    this.acDropdownEl = this.componentRef.location.nativeElement;
    this.acDropdownEl.style.display = 'none';

    // if this element is not an input tag and outer input was not set, move dropdown after inner input tag
    // so that it displays correctly

    // TODO: confirm with owners
    // with some reason, viewContainerRef.createComponent is creating element
    // to parent div which is created by us on ngOnInit, please try this with demo

    if (!this.outerInputElement) {
      // if (this.el.tagName !== 'INPUT' && this.acDropdownEl) {
      this.inputEl.parentElement.insertBefore(this.acDropdownEl, this.inputEl.nextSibling);
      // }
    }
    this.revertValue = typeof this.ngModel !== 'undefined' ? this.ngModel : this.inputEl.value;

    setTimeout(() => {
      this.styleAutoCompleteDropdown();
      component.reloadList(this.inputEl.value);
      component.dropdownVisible = true;
    });
  }

  public blurHandler(event: any) {
    if (this.componentRef) {
      const component = this.componentRef.instance;

      if (this.selectOnBlur) {
        component.selectOne(component.filteredList[component.itemIndex]);
      }

      if (this.closeOnFocusOut && !this.filterClicked) {
        this.hideAutoCompleteDropdown(event);
      }
      this.filterClicked = false;
    }
  }

  public hideAutoCompleteDropdown = (event?: any): void => {
    if (this.componentRef) {
      let currentItem: any;
      const hasRevertValue = (typeof this.revertValue !== 'undefined');
      if (this.inputEl && hasRevertValue && this.acceptUserInput === false) {
        currentItem = this.componentRef.instance.findItemFromSelectValue(this.inputEl.value);
      }
      this.componentRef.destroy();
      this.componentRef = undefined;

      if (this.inputEl && hasRevertValue && this.acceptUserInput === false && currentItem === null) {
        this.selectNewValue(this.revertValue);
      } else if (this.inputEl && this.acceptUserInput === true && typeof currentItem === 'undefined' && event && event.target.value) {
        this.enterNewText(event.target.value);
      }
    }
    this.dropdownJustHidden = true;
    setTimeout(() => this.dropdownJustHidden = false, 100);
  }

  public styleAutoCompleteDropdown = () => {
    if (this.componentRef) {
      /* setting width/height auto complete */
      const thisInputElBCR = this.inputEl.getBoundingClientRect();
      const closeToBottom = thisInputElBCR.bottom + 100 > window.innerHeight;
      const directionOfStyle = this.isRtl ? 'right' : 'left';

      this.acDropdownEl.style.width = thisInputElBCR.width + 'px';
      this.acDropdownEl.style.position = 'absolute';
      this.acDropdownEl.style.zIndex = this.zIndex;
      this.acDropdownEl.style[directionOfStyle] = '0';

      if (!this.outerInputElement) {
        if (closeToBottom) {
          this.acDropdownEl.style.bottom = `${thisInputElBCR.height}px`;
        } else {
          this.acDropdownEl.style.top = `${thisInputElBCR.height}px`;
        }
      }
    }
  }

  public setToStringFunction(item: any): any {
    if (item && typeof item === 'object') {
      let displayVal;

      if (typeof this.valueFormatter === 'string') {
        const matches = this.valueFormatter.match(/[a-zA-Z0-9_\$]+/g);
        let formatted = this.valueFormatter;
        if (matches && typeof item !== 'string') {
          matches.forEach((key) => {
            formatted = formatted.replace(key, item[key]);
          });
        }
        displayVal = formatted;
      } else if (typeof this.valueFormatter === 'function') {
        displayVal = this.valueFormatter(item);
      } else if (this.displayPropertyName) {
        displayVal = item[this.displayPropertyName];
      } else if (typeof this.listFormatter === 'string' && this.listFormatter.match(/^\w+$/)) {
        displayVal = item[this.listFormatter];
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
    if (this.selectValueOf && item[this.selectValueOf]) {
      val = item[this.selectValueOf];
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
    this.focusInput();
  }

  public filterSelected = (text: string) => {
    this.filterClicked = true;
    this.focusInput();
  }

  public selectCustomValue = (text: string) => {
    this.customSelected.emit(text);
    this.hideAutoCompleteDropdown();
    this.focusInput();
  }

  public enterNewText = (value: any) => {
    this.renderValue(value);
    this.ngModelChange.emit(value);
    this.valueChanged.emit(value);
    this.hideAutoCompleteDropdown();
  }

  public emitNoMatchFoundAction = (value: any) => {
    this.noMatchFoundAction.emit(value);

    return false;
  }

  private keydownEventHandler = (evt: any) => {
    if (this.componentRef) {
      const component = this.componentRef.instance;
      component.inputElKeyHandler(evt);
    }
  }

  private inputEventHandler = (evt: any) => {
    if (this.componentRef) {
      const component = this.componentRef.instance;
      component.dropdownVisible = true;
      component.keyword = evt.target.value;
      component.reloadListInDelay(evt);
    } else {
      this.showAutoCompleteDropdown();
    }
  }

  private renderValue(item: any) {
    if (!!this.inputEl) {
      this.inputEl.value = '' + item;
    }
  }

  private focusInput() {
    setTimeout(() => {
      if (this.reFocusAfterSelect) {
        this.inputEl.focus();
      }

      return this.inputEl;
    });
  }
}
