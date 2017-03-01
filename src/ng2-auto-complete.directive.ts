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
  Optional
} from "@angular/core";
import { Ng2AutoCompleteComponent } from "./ng2-auto-complete.component";
import { ControlContainer, AbstractControl, FormGroup, FormControl, FormGroupName } from "@angular/forms";

/**
 * display auto-complete section with input and dropdown list when it is clicked
 */
@Directive({
  selector: "[auto-complete], [ng2-auto-complete]"
})
export class Ng2AutoCompleteDirective implements OnInit {

  @Input("auto-complete-placeholder") autoCompletePlaceholder: string;
  @Input("source") source: any;
  @Input("path-to-data") pathToData: string;
  @Input("min-chars") minChars: number;
  @Input("display-property-name") displayPropertyName: string;
  @Input("accept-user-input") acceptUserInput: boolean;
  @Input("max-num-list") maxNumList: string;
  @Input("select-value-of") selectValueOf: string;

  @Input("list-formatter") listFormatter;
  @Input("loading-text") loadingText: string = "Loading";
  @Input("blank-option-text") blankOptionText: string;
  @Input("no-match-found-text") noMatchFoundText: string;

  @Input() ngModel: String;
  @Input('formControlName') formControlName: string;
  //if [formControl] is used on the anchor where our directive is sitting
  //a form is not necessary to use a formControl we should also support this
  @Input('formControl') extFormControl: FormControl;

  @Output() ngModelChange = new EventEmitter();
  @Output() valueChanged = new EventEmitter();


  componentRef: ComponentRef<Ng2AutoCompleteComponent>;
  wrapperEl: HTMLElement;
  el: HTMLElement;   // this element element, can be any
  acDropdownEl: HTMLElement; // auto complete element
  inputEl: HTMLInputElement;  // input element of this element
  formControl: AbstractControl;
  revertValue: any;
  
  constructor(private resolver: ComponentFactoryResolver,
              private renderer: Renderer,
              public  viewContainerRef: ViewContainerRef,
              @Optional() @Host() @SkipSelf() private parentForm: ControlContainer) {
    this.el = this.viewContainerRef.element.nativeElement;
  }

  ngOnInit(): void {
    // wrap this element with <div class="ng2-auto-complete">
    this.wrapperEl = document.createElement("div");
    this.wrapperEl.className = "ng2-auto-complete-wrapper";
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
    this.inputEl.addEventListener('blur', e => this.hideAutoCompleteDropdown(e));
    this.inputEl.addEventListener('keydown', e => this.keydownEventHandler(e));
    this.inputEl.addEventListener('input', e => this.inputEventHandler(e));
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.instance.valueSelected.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ngModel']) {
      this.ngModel = this.addToStringFunction(changes['ngModel'].currentValue);
    }
  }

  //show auto-complete list below the current element
  showAutoCompleteDropdown = (event?: any): void => {

    let factory = this.resolver.resolveComponentFactory(Ng2AutoCompleteComponent);

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
    component.listFormatter = this.listFormatter;
    component.blankOptionText = this.blankOptionText;
    component.noMatchFoundText = this.noMatchFoundText;

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
      this.acDropdownEl.style.zIndex = "1";
      this.acDropdownEl.style.left = "0";
      this.acDropdownEl.style.display = "inline-block";

      if (closeToBottom) {
        this.acDropdownEl.style.bottom = `${thisInputElBCR.height}px`;
      } else {
        this.acDropdownEl.style.top = `${thisInputElBCR.height}px`;
      }
    }
  };

  addToStringFunction(val: any): any {
    if (val && typeof val === "object") {
      let displayVal;
      if (this.displayPropertyName) {
        displayVal = val[this.displayPropertyName];
      } else if (this.listFormatter) {
        displayVal = val[this.listFormatter];
      } else {
        displayVal = val.value;
      }
      val.toString = function () {
        return displayVal;
      }
    }
    return val;
  }

  selectNewValue = (item: any) => {
    // make displayable value
    if (item && typeof item === "object") {
      item = this.addToStringFunction(item);
    }
    this.inputEl && (this.inputEl.value = '' + item);

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
      let component = <Ng2AutoCompleteComponent>this.componentRef.instance;
      component.inputElKeyHandler(evt);
    }
  };

  private inputEventHandler = (evt: any) => {
    if (this.componentRef) {
      let component = <Ng2AutoCompleteComponent>this.componentRef.instance;
      component.dropdownVisible = true;
      component.reloadListInDelay(evt);
    } else {
      this.showAutoCompleteDropdown()
    }
  };

}
