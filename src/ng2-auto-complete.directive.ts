import {
  Directive,
  Input,
  Output,
  ComponentRef,
  ViewContainerRef,
  EventEmitter,
  OnInit,
  ComponentFactoryResolver,
  SimpleChanges
} from "@angular/core";

import {Ng2AutoCompleteComponent} from "./ng2-auto-complete.component";

/**
 * display auto-complete section with input and dropdown list when it is clicked
 */
@Directive({
  selector: "[auto-complete], [ng2-auto-complete]",
  host: {
    "(click)": "showAutoCompleteDropdown()",
    "(focus)": "showAutoCompleteDropdown()"
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
  @Input("accept-user-input") acceptUserInput: boolean;
  @Input("loading-text") loadingText: string = "Loading";
  @Input("max-num-list") maxNumList: string;

  @Input() ngModel: String;
  @Output() ngModelChange = new EventEmitter();
  @Output() valueChanged = new EventEmitter();

  componentRef: ComponentRef<Ng2AutoCompleteComponent>;
  el: HTMLElement;   // input element
  acDropdownEl: HTMLElement; // auto complete element
  inputEl: HTMLInputElement;  // input tag

  constructor(private resolver: ComponentFactoryResolver,
              public  viewContainerRef: ViewContainerRef) {
    this.el = this.viewContainerRef.element.nativeElement;
  }

  ngOnInit(): void {
    // wrap this element with <div class="ng2-auto-complete">
    let divEl = document.createElement("div");
    divEl.className = "ng2-auto-complete";
    divEl.style.display = "inline-block";
    divEl.style.position = "relative";
    this.el.parentElement.insertBefore(divEl, this.el.nextSibling);
    divEl.appendChild(this.el);

    // apply toString() method for the object
    this.selectNewValue(this.ngModel);


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
    this.hideAutoCompleteDropdown();

    let factory = this.resolver.resolveComponentFactory(Ng2AutoCompleteComponent);

    this.componentRef = this.viewContainerRef.createComponent(factory);

    let component = this.componentRef.instance;
    component.listFormatter = this.listFormatter;
    //component.prefillFunc = this.prefillFunc;
    component.pathToData = this.pathToData;
    component.minChars = this.minChars;
    component.valuePropertyName = this.valuePropertyName || "id";
    component.displayPropertyName = this.displayPropertyName || "value";
    component.source = this.source;
    component.placeholder = this.autoCompletePlaceholder;
    component.blankOptionText = this.blankOptionText;
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

    setTimeout(this.styleAutoCompleteDropdown);
  }

  hideAutoCompleteDropdown = (event?: any): void => {
    if (this.componentRef) {
      if (
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
      this.acDropdownEl.style.width = thisElBCR.width + "px";
      this.acDropdownEl.style.position = "absolute";
      this.acDropdownEl.style.zIndex = "1";
      this.acDropdownEl.style.top = "0";
      this.acDropdownEl.style.left = "0";
      this.acDropdownEl.style.display = "inline-block";

      let thisInputElBCR = this.inputEl.getBoundingClientRect();
      //Fix for Ng1/Ng2 both. on Ng1/Ng2 env. component.ngOnInit kicks in later than we think
      //Not sure this is a good fix to add another setTimeout
      setTimeout(() => {
        component.inputEl.style.width = thisInputElBCR.width + "px";
        component.inputEl.style.height = thisInputElBCR.height + "px";
        component.inputEl.focus();

        component.closeToBottom = !!(thisInputElBCR.bottom + 100 > window.innerHeight);
      });
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
      (val !== this.ngModel) && this.ngModelChange.emit(val);
      this.valueChanged.emit(val);
    }
  };

  selectNewValue = (val: any) => {
    if (val !== '') {
      val = this.addToStringFunction(val);
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
}
