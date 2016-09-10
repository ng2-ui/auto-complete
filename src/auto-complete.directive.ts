import {
  Directive,
  Input,
  Output,
  ComponentRef,
  ViewContainerRef,
  EventEmitter,
  OnInit,
  ComponentFactoryResolver
} from '@angular/core';
import {AutoCompleteComponent} from "./auto-complete.component";
import "rxjs/Rx"

/**
 * display auto-complete section with input and dropdown list when it is clicked
 */
@Directive({
  selector: '[auto-complete], [ng2-auto-complete]',
  host: {
    '(click)': 'showAutoCompleteDropdown()'
  }
})
export class AutoCompleteDirective implements OnInit {

  @Input() placeholder: string;
  @Input('list-formatter') listFormatter: (arg: any) => void;
  @Input('source') source: any;
  @Input('path-to-data') pathToData: string;
  @Input('min-chars') minChars: number;
  @Input('value-property-name') valuePropertyName: string;
  @Input('display-property-name') displayPropertyName: string;

  @Input() ngModel: String;
  @Output() ngModelChange = new EventEmitter();

  @Output('value-changed') valueChanged = new EventEmitter();

  public componentRef: ComponentRef<AutoCompleteComponent>;
  public el: HTMLElement;   // input element
  public acDropdownEl: HTMLElement; // auto complete element

  constructor(
    private resolver: ComponentFactoryResolver,
    public  viewContainerRef: ViewContainerRef
  ) {
    this.el = this.viewContainerRef.element.nativeElement;
  }

  ngOnInit(): void {
    // wrap this element with <div class="ng2-auto-complete">
    let divEl = document.createElement("div");
    divEl.className = 'ng2-auto-complete';
    divEl.style.display = 'inline-block';
    divEl.style.position = 'relative';
    this.el.parentElement.insertBefore(divEl, this.el.nextSibling);
    divEl.appendChild(this.el);

    // apply toString() method for the object
    this.selectNewValue(this.ngModel);

    // when somewhere else clicked, hide this autocomplete
    document.addEventListener('click', this.hideAutoCompleteDropdown);
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.instance.valueSelected.unsubscribe();
    }
    document.removeEventListener('click', this.hideAutoCompleteDropdown);
  }

  //show auto-complete list below the current element
  showAutoCompleteDropdown() {
    this.hideAutoCompleteDropdown();

    let factory = this.resolver.resolveComponentFactory(AutoCompleteComponent);

    this.componentRef = this.viewContainerRef.createComponent(factory);
    this.acDropdownEl = this.componentRef.location.nativeElement;
    let component = this.componentRef.instance;

    component.listFormatter = this.listFormatter;
    //component.prefillFunc = this.prefillFunc;
    component.pathToData = this.pathToData;
    component.minChars = this.minChars;
    component.valuePropertyName = this.valuePropertyName || 'id';
    component.displayPropertyName = this.displayPropertyName || 'value';
    component.source = this.source;
    component.placeholder = this.placeholder;
    component.valueSelected.subscribe(this.selectNewValue);

    this.acDropdownEl.style.display = 'none';

    //if this element is not an input tag, move dropdown after input tag
    //so that it displays correctly
    this.moveAutocompleteDropDownAfterInputEl();

    setTimeout(this.styleAutoCompleteDropdown);
  }

  hideAutoCompleteDropdown = (event?: any): void =>  {
    if (this.componentRef) {
      if (
        event && event.type === 'click' &&
        event.target.tagName !== 'INPUT' &&
        !this.elementIn(event.target, this.acDropdownEl)
      ) {
        this.componentRef.destroy();
        this.componentRef = undefined;
      } else if (!event) {
        this.componentRef.destroy();
        this.componentRef = undefined;
      }
    }
  };

  styleAutoCompleteDropdown= () => {
    let component = this.componentRef.instance;

    /* setting width/height auto complete */
    let thisElBCR = this.el.getBoundingClientRect();
    this.acDropdownEl.style.width = thisElBCR.width + 'px';
    this.acDropdownEl.style.position = 'absolute';
    this.acDropdownEl.style.zIndex = '1';
    this.acDropdownEl.style.top = '0';
    this.acDropdownEl.style.left = '0';
    this.acDropdownEl.style.display = 'inline-block';

    component.inputEl.style.width = (thisElBCR.width - 30) + 'px';
    component.inputEl.style.height = thisElBCR.height + 'px';
    component.inputEl.focus();
  };

  selectNewValue = (val: any) => {

    /* modify toString function of value if value is an object */
    if (val && typeof val !== "string") {
      let displayVal = val[this.displayPropertyName || 'value'];
      val.toString = function() {return displayVal;}
    }

    /* emit ngModelChange and valueChanged */
    if (this.ngModel && val !== this.ngModel) {
      this.ngModelChange.emit(val);
    }
    if (val) {
      this.valueChanged.emit(val);
    }

    /* hide dropdown */
    this.hideAutoCompleteDropdown();
  };

  private moveAutocompleteDropDownAfterInputEl(): void {
    if (this.el.tagName !== "INPUT" && this.acDropdownEl) {
      let inputEl =  this.el.querySelector('input');
      inputEl.parentElement.insertBefore(this.acDropdownEl, inputEl.nextSibling);
    }
  }

  private elementIn(el: Node, containerEl: Node): boolean {
    while ( el = el.parentNode ) {
      if ( el === containerEl ) return true;
    }
    return false;
  }
}
