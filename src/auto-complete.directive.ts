import {
  Directive,
  Input,
  Output,
  ComponentRef,
  ViewContainerRef,
  EventEmitter,
  OnInit,
  ComponentFactoryResolver,
  Renderer,
  SimpleChanges,
  SkipSelf,
  Host,
  Optional,
  OnChanges
} from "@angular/core";
import { NguiAutoCompleteComponent } from "./auto-complete.component";
import { ControlContainer, AbstractControl, FormGroup, FormControl, FormGroupName } from "@angular/forms";

/**
 * display auto-complete section with input and dropdown list when it is clicked
 */
@Directive({
  selector: "[auto-complete], [ngui-auto-complete]"
})
export class NguiAutoCompleteDirective implements OnInit, OnChanges {

  @Input("auto-complete-placeholder") autoCompletePlaceholder: string;
  @Input("source") source: any;
  @Input("path-to-data") pathToData: string;
  @Input("min-chars") minChars: number;
  @Input("display-property-name") displayPropertyName: string;
  @Input("accept-user-input") acceptUserInput: boolean;
  @Input("max-num-list") maxNumList: string;
  @Input("select-value-of") selectValueOf: string;
  @Input("loading-template") loadingTemplate = null;
  @Input("list-formatter") listFormatter;
  @Input("loading-text") loadingText: string = "Loading";
  @Input("blank-option-text") blankOptionText: string;
  @Input("no-match-found-text") noMatchFoundText: string;
  @Input("value-formatter") valueFormatter: any;
  @Input("tab-to-select") tabToSelect: boolean = true;
  @Input("match-formatted") matchFormatted: boolean = false;
  @Input("auto-complete-first-item") autoCompleteFirstItem: boolean = false;

  @Input() ngModel: String;
  @Input('formControlName') formControlName: string;
  //if [formControl] is used on the anchor where our directive is sitting
  //a form is not necessary to use a formControl we should also support this
  @Input('formControl') extFormControl: FormControl;
  @Input("z-index") zIndex: string = "1";

  @Output() ngModelChange = new EventEmitter();
  @Output() valueChanged = new EventEmitter();


  componentRef: ComponentRef<NguiAutoCompleteComponent>;
  wrapperEl: HTMLElement;
  el: HTMLElement;   // this element element, can be any
  acDropdownEl: HTMLElement; // auto complete element
  inputEl: HTMLInputElement;  // input element of this element
  formControl: AbstractControl;
  revertValue: any;
  private scheduledBlurHandler: any;
  private documentClickListener: (e: MouseEvent) => any;


  constructor(private resolver: ComponentFactoryResolver,
              private renderer: Renderer,
              public  viewContainerRef: ViewContainerRef,
              @Optional() @Host() @SkipSelf() private parentForm: ControlContainer) {
    this.el = this.viewContainerRef.element.nativeElement;
  }

  ngOnInit(): void {
    // Blur event is handled only after a click event. This is to prevent handling of blur events resulting from interacting with a scrollbar
    // introduced by content overflow (Internet explorer issue).
    // See issue description here: http://stackoverflow.com/questions/2023779/clicking-on-a-divs-scroll-bar-fires-the-blur-event-in-ie
    this.documentClickListener = e => {
      if (this.scheduledBlurHandler) {
        this.scheduledBlurHandler();
        this.scheduledBlurHandler = null;
      }
    }
    document.addEventListener('click', this.documentClickListener);
    // wrap this element with <div class="ngui-auto-complete">
    this.wrapperEl = document.createElement("div");
    this.wrapperEl.className = "ngui-auto-complete-wrapper";
    this.wrapperEl.style.position = "relative";
    this.el.parentElement.insertBefore(this.wrapperEl, this.el.nextSibling);
    this.wrapperEl.appendChild(this.el);


    //Check if we were supplied with a [formControlName] and it is inside a [form]
    //else check if we are supplied with a [FormControl] regardless if it is inside a [form] tag
    if (this.parentForm && this.formControlName) {
      if (this.parentForm['form']) {
        this.formControl = (<FormGroup>this.parentForm['form']).get(this.formControlName);
      } else if (this.parentForm instanceof FormGroupName) {
        this.formControl = (<FormGroupName>this.parentForm).control.controls[this.formControlName];
      }
    } else if (this.extFormControl) {
      this.formControl = this.extFormControl;
    }

    // apply toString() method for the object
    if (!!this.ngModel) {
      this.selectNewValue(this.ngModel);
    } else if (!!this.formControl && this.formControl.value) {
      this.selectNewValue(this.formControl.value[this.displayPropertyName]);
    }

  }

  ngAfterViewInit() {
    // if this element is not an input tag, move dropdown after input tag
    // so that it displays correctly
    this.inputEl = this.el.tagName === "INPUT" ?
        <HTMLInputElement>this.el : <HTMLInputElement>this.el.querySelector("input");

    this.inputEl.addEventListener('focus', e => this.showAutoCompleteDropdown(e));
    this.inputEl.addEventListener('blur', e => {
        this.scheduledBlurHandler = this.hideAutoCompleteDropdown;
    });
    this.inputEl.addEventListener('keydown', e => this.keydownEventHandler(e));
    this.inputEl.addEventListener('input', e => this.inputEventHandler(e));
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.instance.valueSelected.unsubscribe();
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

  //show auto-complete list below the current element
  showAutoCompleteDropdown = (event?: any): void => {
    this.hideAutoCompleteDropdown();
    this.scheduledBlurHandler = null;

    let factory = this.resolver.resolveComponentFactory(NguiAutoCompleteComponent);

    this.componentRef = this.viewContainerRef.createComponent(factory);

    let component = this.componentRef.instance;
    component.showInputTag = false; //Do NOT display autocomplete input tag separately

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
    component.noMatchFoundText = this.noMatchFoundText;
    component.tabToSelect = this.tabToSelect;
    component.matchFormatted = this.matchFormatted;
    component.autoCompleteFirstItem = this.autoCompleteFirstItem;

    component.valueSelected.subscribe(this.selectNewValue);

    this.acDropdownEl = this.componentRef.location.nativeElement;
    this.acDropdownEl.style.display = "none";

    // if this element is not an input tag, move dropdown after input tag
    // so that it displays correctly
    if (this.el.tagName !== "INPUT" && this.acDropdownEl) {
      this.inputEl.parentElement.insertBefore(this.acDropdownEl, this.inputEl.nextSibling);
    }

    this.revertValue = typeof this.ngModel !== "undefined" ? this.ngModel : this.inputEl.value;

    setTimeout(() => {
      component.reloadList(this.inputEl.value);
      this.styleAutoCompleteDropdown();
      component.dropdownVisible = true;
    });
  };

  hideAutoCompleteDropdown = (event?: any): void => {
    if (this.componentRef) {
      let currentItem: any;
      let hasRevertValue = (typeof this.revertValue !== "undefined");
      if(this.inputEl && hasRevertValue && this.acceptUserInput === false) {
        currentItem = this.componentRef.instance.findItemFromSelectValue(this.inputEl.value);
      }

      this.componentRef.destroy();
      this.componentRef = undefined;

      if(
        this.inputEl &&
        hasRevertValue &&
        this.acceptUserInput === false &&
        currentItem === null
      ) {
        this.selectNewValue(this.revertValue);
      }

    }
  };

  styleAutoCompleteDropdown = () => {
    if (this.componentRef) {
      let component = this.componentRef.instance;

      /* setting width/height auto complete */
      let thisElBCR = this.el.getBoundingClientRect();
      let thisInputElBCR = this.inputEl.getBoundingClientRect();
      let closeToBottom = thisInputElBCR.bottom + 100 > window.innerHeight;

      this.acDropdownEl.style.width = thisInputElBCR.width + "px";
      this.acDropdownEl.style.position = "absolute";
      this.acDropdownEl.style.zIndex = this.zIndex;
      this.acDropdownEl.style.left = "0";
      this.acDropdownEl.style.display = "inline-block";

      if (closeToBottom) {
        this.acDropdownEl.style.bottom = `${thisInputElBCR.height}px`;
      } else {
        this.acDropdownEl.style.top = `${thisInputElBCR.height}px`;
      }
    }
  };

  setToStringFunction(item: any): any {
    if (item && typeof item === "object") {
      let displayVal;

      if (typeof this.valueFormatter === 'string') {
        let matches = this.valueFormatter.match(/[a-zA-Z0-9_\$]+/g);
        let formatted = this.valueFormatter;
        if (matches && typeof item !== 'string') {
          matches.forEach(key => {
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

  selectNewValue = (item: any) => {
    // make displayable value
    if (item && typeof item === "object") {
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
    (val !== this.ngModel) && this.ngModelChange.emit(val);
    this.valueChanged.emit(val);
    this.hideAutoCompleteDropdown();
  };

  private keydownEventHandler = (evt: any) => {
    if (this.componentRef) {
      let component = <NguiAutoCompleteComponent>this.componentRef.instance;
      component.inputElKeyHandler(evt);
    }
  };

  private inputEventHandler = (evt: any) => {
    if (this.componentRef) {
      let component = <NguiAutoCompleteComponent>this.componentRef.instance;
      component.dropdownVisible = true;
      component.reloadListInDelay(evt);
    } else {
      this.showAutoCompleteDropdown()
    }
  };

  private renderValue(item: any) {
    this.inputEl && (this.inputEl.value = '' + item);
  }
}
