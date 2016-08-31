import {
  Directive,
  Input,
  Output,
  ComponentRef,
  ViewContainerRef,
  EventEmitter,
  OnInit,
  ComponentResolver,
  Type, ComponentFactoryResolver
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
  //@Input('prefill-func') prefillFunc: function;
  @Input('value-changed') valueChanged: (value: any) => void;
  @Input('source') source: any;
  @Input('path-to-data') pathToData: string;
  @Input('min-chars') minChars: number;
  @Input('value-property-name') valuePropertyName: string;
  @Input('display-property-name') displayPropertyName: string;

  @Input() ngModel: String;
  @Output() ngModelChange = new EventEmitter();

  public componentRef: ComponentRef<AutoCompleteComponent>;
  public el: HTMLElement;   // input or select element
  public acEl: HTMLElement; // auto complete element

  constructor(
    private resolver: ComponentFactoryResolver,
    public  viewContainerRef: ViewContainerRef
  ) {
    this.el = this.viewContainerRef.element.nativeElement;
  }

  ngOnInit(): void {
    let divEl = document.createElement("div");
    divEl.className = 'ng2-auto-complete';
    divEl.style.display = 'inline-block';
    divEl.style.position = 'relative';
    this.el.parentElement.insertBefore(divEl, this.el.nextSibling);
    divEl.appendChild(this.el);
    this.selectNewValue(this.ngModel);
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.instance.valueSelected.unsubscribe();
    }
    document.removeEventListener('click', this.hideAutoCompleteDropdown);
  }

  //show auto-complete list below the current element
  showAutoCompleteDropdown() {
    document.addEventListener('click', this.hideAutoCompleteDropdown);
    this.hideAutoCompleteDropdown();

    let factory = this.resolver.resolveComponentFactory(AutoCompleteComponent);

      this.componentRef = this.viewContainerRef.createComponent(factory);
      this.acEl = this.componentRef.location.nativeElement;
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

      this.acEl.style.display = 'none';
      setTimeout(this.styleAutoCompleteDropdown);
  }

  hideAutoCompleteDropdown = (event?): void =>  {
    if (this.componentRef) {
      if (
        event && event.type === 'click' &&
        event.target !== this.el &&
        event.target !== this.acEl
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
    this.acEl.style.width = thisElBCR.width + 'px';
    this.acEl.style.position = 'absolute';
    this.acEl.style.zIndex = '1';
    this.acEl.style.top = '0';
    this.acEl.style.left = '0';
    this.acEl.style.display = 'inline-block';

    component.inputEl.style.width = (thisElBCR.width - 30) + 'px';
    component.inputEl.style.height = thisElBCR.height + 'px';
    component.inputEl.focus();
  };

  selectNewValue = (val: any) => {
    if (val && typeof val !== "string") {
      let displayVal = val[this.displayPropertyName || 'value'];
      val.toString = function() {return displayVal;}
    }
    this.ngModelChange.emit(val);
    if (this.valueChanged) {
      this.valueChanged(val);
    }
    this.hideAutoCompleteDropdown();
  }



}