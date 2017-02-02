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
  selector: "[auto-complete], [ng2-auto-complete]",
  host: {
    "(focus)": "showAutoCompleteDropdown()",
    "(blur)": "hideAutoCompleteDropdown()",
    "(keydown)": "keydownEventHandler($event)",
    "(input)": "inputEventHandler($event)"
  }
})
export class Ng2AutoCompleteDirective implements OnInit {

  @Input("auto-complete-placeholder") autoCompletePlaceholder: string;
  @Input("list-formatter") listFormatter: (arg: any) => string;
  @Input("source") source: any;
  @Input("path-to-data") pathToData: string;
  @Input("min-chars") minChars: number;
  @Input("value-property-name") valuePropertyName: string;
  @Input("display-property-name") displayPropertyName: string;
  @Input("blank-option-text") blankOptionText: string;
  @Input("no-match-found-text") noMatchFoundText: string;
  @Input("accept-user-input") acceptUserInput: boolean;
  @Input("loading-text") loadingText: string = "Loading";
  @Input("max-num-list") maxNumList: string;

  @Input() ngModel: String;
  @Input('formControlName') formControlName: string;
  //if [formControl] is used on the anchor where our directive is sitting
  //a form is not necessary to use a formControl we should also support this
  @Input('formControl') extFormControl: FormControl;

  @Output() ngModelChange = new EventEmitter();
  @Output() valueChanged = new EventEmitter();


  componentRef: ComponentRef<Ng2AutoCompleteComponent>;
  el: HTMLElement;   // this element element, can be any
  acDropdownEl: HTMLElement; // auto complete element
  inputEl: HTMLInputElement;  // input element of this element
  formControl: AbstractControl;

  constructor(private resolver: ComponentFactoryResolver,
              private renderer: Renderer,
              public  viewContainerRef: ViewContainerRef,
              @Optional() @Host() @SkipSelf() private parentForm: ControlContainer) {
    this.el = this.viewContainerRef.element.nativeElement;
  }

  ngOnInit(): void {
    // wrap this element with <div class="ng2-auto-complete">
    let divEl = document.createElement("div");
    divEl.className = "ng2-auto-complete-wrapper";
    divEl.style.position = "relative";
    this.el.parentElement.insertBefore(divEl, this.el.nextSibling);
    divEl.appendChild(this.el);

    // apply toString() method for the object
    this.selectNewValue(this.ngModel);

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

    // when somewhere else clicked, hide this autocomplete
    document.addEventListener("click", this.hideAutoCompleteDropdown);
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.instance.valueSelected.unsubscribe();
      this.componentRef.instance.inputChanged.unsubscribe();
    }
    document.removeEventListener("click", this.hideAutoCompleteDropdown);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ngModel']) {
      this.ngModel = this.addToStringFunction(changes['ngModel'].currentValue);
    }
  }

  //show auto-complete list below the current element
  showAutoCompleteDropdown() {

    let factory = this.resolver.resolveComponentFactory(Ng2AutoCompleteComponent);

    this.componentRef = this.viewContainerRef.createComponent(factory);

    let component = this.componentRef.instance;
    component.showInputTag = false; //Do NOT display autocomplete input tag separately

    component.listFormatter = this.listFormatter;
    component.pathToData = this.pathToData;
    component.minChars = this.minChars;
    component.valuePropertyName = this.valuePropertyName || "id";
    component.displayPropertyName = this.displayPropertyName || "value";
    component.source = this.source;
    component.placeholder = this.autoCompletePlaceholder;
    component.blankOptionText = this.blankOptionText;
    component.noMatchFoundText = this.noMatchFoundText;
    component.acceptUserInput = this.acceptUserInput;
    component.loadingText = this.loadingText;
    component.maxNumList = parseInt(this.maxNumList, 10);

    component.valueSelected.subscribe(this.selectNewValue);
    component.inputChanged.subscribe(this.componentInputChanged);

    this.acDropdownEl = this.componentRef.location.nativeElement;
    this.acDropdownEl.style.display = "none";

    // if this element is not an input tag, move dropdown after input tag
    // so that it displays correctly
    this.moveAutocompleteDropDownAfterInputEl();

    setTimeout(() => {
      component.reloadList(this.inputEl.value);
      this.styleAutoCompleteDropdown();
      component.dropdownVisible = true;
    });
  }

  hideAutoCompleteDropdown = (event?: any): void => {
    if (this.componentRef) {
      if ( //document level click to hide dropdown
        event && event.type === "click" &&
        event.target.tagName !== "INPUT" && !this.elementIn(event.target, this.acDropdownEl)
      ) {
        this.componentRef.destroy();
        this.componentRef = undefined;
      } else if (!event) {
        this.componentRef.destroy();
        this.componentRef = undefined;
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

      this.acDropdownEl.style.width = thisElBCR.width + "px";
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
      let displayVal = val[this.displayPropertyName || "value"];
      val.toString = function () {
        return displayVal;
      }
    }
    return val;
  }

  componentInputChanged = (val: string) => {
    if (this.acceptUserInput !== false) {
      this.inputEl.value = val;
      if ((this.parentForm && this.formControlName) || this.extFormControl) {
        this.formControl.patchValue(val);
      }
      (val !== this.ngModel) && this.ngModelChange.emit(val);
      this.valueChanged.emit(val);
    }
  };

  selectNewValue = (val: any) => {
    if (val !== '') {
      val = this.addToStringFunction(val);
    }
    if ((this.parentForm && this.formControlName) || this.extFormControl) {
      if (!!val) {
        this.formControl.patchValue(val);
      }
    }
    (val !== this.ngModel) && this.ngModelChange.emit(val);
    this.valueChanged.emit(val);
    this.inputEl && (this.inputEl.value = '' + val);
    this.hideAutoCompleteDropdown();
  };

  private moveAutocompleteDropDownAfterInputEl(): void {
    this.inputEl = <HTMLInputElement>this.el;
    if (this.el.tagName !== "INPUT" && this.acDropdownEl) {
      this.inputEl = <HTMLInputElement>this.el.querySelector("input");
      this.inputEl.parentElement.insertBefore(this.acDropdownEl, this.inputEl.nextSibling);
    }
  }

  private elementIn(el: Node, containerEl: Node): boolean {
    while (el = el.parentNode) {
      if (el === containerEl) {
        return true;
      }
    }
    return false;
  }

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
