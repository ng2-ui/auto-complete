import {
    Directive,
    Input,
    Output,
    DynamicComponentLoader,
    ComponentRef,
    ViewContainerRef,
    EventEmitter,
    OnInit
} from '@angular/core';
import {AutoCompleteComponent} from "./auto-complete.component";
import "rxjs/Rx"

/**
 * display auto-complete section with input and dropdown list when it is clicked
 */
@Directive({
  selector: '[auto-complete], [ng2-auto-complete]',
  host: {
    '(click)': 'showAutoComplete()'
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

  public componentRef: Promise<ComponentRef<any>>;
  public el: HTMLElement;   // input or select element
  public acEl: HTMLElement; // auto complete element

  constructor(
      public dcl: DynamicComponentLoader,
      public viewContainerRef: ViewContainerRef
  ) {
    this.el = this.viewContainerRef.element.nativeElement;
  }

  ngOnInit(): void {
    // ...
    let divEl = document.createElement("div");
    divEl.className = 'ng2-auto-complete';
    divEl.style.display = 'inline-block';
    divEl.style.position = 'relative';
    this.el.parentElement.insertBefore(divEl, this.el.nextSibling);
    divEl.appendChild(this.el);
  }

  //show auto-complete list below the current element
  showAutoComplete() {
    this.hideAutoComplete().then(() => {
      this.componentRef = this.dcl.loadNextToLocation(AutoCompleteComponent, this.viewContainerRef);
      this.componentRef.then( componentRef => {
        this.acEl = componentRef.location.nativeElement;
       
        let component = componentRef.instance;

        component.listFormatter = this.listFormatter;
        //component.prefillFunc = this.prefillFunc;
        component.pathToData = this.pathToData;
        component.minChars = this.minChars;
        component.valuePropertyName = this.valuePropertyName || 'id';
        component.displayPropertyName = this.displayPropertyName || 'value';
        component.source = this.source;
        component.placeholder = this.placeholder;
        component.valueSelected.subscribe((val: any) => {
          if (typeof val !== "string") {
            let displayVal = val[component.displayPropertyName];
            val.toString = function() {return displayVal;}
          }
          this.ngModelChange.emit(val);
          if (this.valueChanged) {
            this.valueChanged(val);
          }
          this.hideAutoComplete();
        });

        this.acEl.style.display = 'none';
        setTimeout(() => { // it needs time to run ngOnInit within component
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
        });
        
      })
    });

    document.addEventListener('click', event => {
      if (event.target !== this.el && event.target !== this.acEl) {
        this.hideAutoComplete();
      }
    });
  }

  hideAutoComplete(): Promise<any> {
    if (this.componentRef) {
      return this.componentRef.then( componentRef=> componentRef.destroy() );
    } else {
      return Promise.resolve(true);
    }
  }

}