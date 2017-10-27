import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    EventEmitter,
    Host,
    Input,
    OnChanges,
    OnInit,
    Optional,
    Output,
    SimpleChanges,
    SkipSelf,
    ViewContainerRef
} from "@angular/core";
import {NguiAutoCompleteComponent} from "./auto-complete.component";
import {AbstractControl, ControlContainer, FormControl, FormGroup, FormGroupName} from "@angular/forms";

/**
 * display auto-complete section with input and dropdown list when it is clicked
 */
@Directive({
  selector: "[auto-complete], [ngui-auto-complete]"
})
export class NguiAutoCompleteDirective implements OnInit, OnChanges {

  @Input("autocomplete") autocomplete = 'off';
  @Input("auto-complete-placeholder") autoCompletePlaceholder: string;
  @Input("source") source: any;
  @Input("path-to-data") pathToData: string;
  @Input("min-chars") minChars: number;
  @Input("display-property-name") displayPropertyName: string;
  @Input("accept-user-input") acceptUserInput: boolean = true;
  @Input("max-num-list") maxNumList: string;
  @Input("select-value-of") selectValueOf: string;
  @Input("loading-template") loadingTemplate = null;
  @Input("list-formatter") listFormatter;
  @Input("loading-text") loadingText: string = "Loading";
  @Input("blank-option-text") blankOptionText: string;
  @Input("no-match-found-text") noMatchFoundText: string;
  @Input("value-formatter") valueFormatter: any;
  @Input("tab-to-select") tabToSelect: boolean = true;
  @Input("select-on-blur") selectOnBlur: boolean = false;
  @Input("match-formatted") matchFormatted: boolean = false;
  @Input("auto-select-first-item") autoSelectFirstItem: boolean = false;
  @Input("open-on-focus") openOnFocus: boolean = true;
  @Input("re-focus-after-select") reFocusAfterSelect: boolean = true;

  @Input() ngModel: String;
  @Input('formControlName') formControlName: string;
  //if [formControl] is used on the anchor where our directive is sitting
  //a form is not necessary to use a formControl we should also support this
  @Input('formControl') extFormControl: FormControl;
  @Input("z-index") zIndex: string = "1";
  @Input("is-rtl") isRtl: boolean = false;

  @Output() ngModelChange = new EventEmitter();
  @Output() valueChanged = new EventEmitter();
  @Output() customSelected = new EventEmitter();


  componentRef: ComponentRef<NguiAutoCompleteComponent>;
  wrapperEl: HTMLElement;
  el: HTMLElement;   // this element element, can be any
  acDropdownEl: HTMLElement; // auto complete element
  inputEl: HTMLInputElement;  // input element of this element
  formControl: AbstractControl;
  revertValue: any;
  private dropdownJustHidden: boolean;
  private scheduledBlurHandler: any;
  private documentClickListener: (e: MouseEvent) => any;


  constructor(private resolver: ComponentFactoryResolver,
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
    };

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

    if (this.openOnFocus) {
        this.inputEl.addEventListener('focus', e => this.showAutoCompleteDropdown(e));
    }

    console.log(this.autocomplete);
    this.inputEl.addEventListener('blur', (e) => {
        this.scheduledBlurHandler = () => {
          return this.blurHandler(e);
        };
    });
    this.inputEl.addEventListener('keydown', e => this.keydownEventHandler(e));
    this.inputEl.addEventListener('input', e => this.inputEventHandler(e));
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.instance.valueSelected.unsubscribe();
      this.componentRef.instance.textEntered.unsubscribe();
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
    if (this.dropdownJustHidden) {
      return;
    }
    this.hideAutoCompleteDropdown();
    this.scheduledBlurHandler = null;

    let factory = this.resolver.resolveComponentFactory(NguiAutoCompleteComponent);

    this.componentRef = this.viewContainerRef.createComponent(factory);

    let component = this.componentRef.instance;
    component.keyword = this.inputEl.value;
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
    component.selectOnBlur = this.selectOnBlur;
    component.matchFormatted = this.matchFormatted;
    component.autoSelectFirstItem = this.autoSelectFirstItem;

    component.valueSelected.subscribe(this.selectNewValue);
    component.textEntered.subscribe(this.enterNewText);
    component.customSelected.subscribe(this.selectCustomValue);

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

  blurHandler(event: any) {
    if (this.componentRef) {
      const component = this.componentRef.instance;

      if (this.selectOnBlur) {
        component.selectOne(component.filteredList[component.itemIndex]);
      }

      this.hideAutoCompleteDropdown(event);
    }
  }

  hideAutoCompleteDropdown = (event?: any): void => {
    if (this.componentRef) {
      let currentItem: any;
      let hasRevertValue = (typeof this.revertValue !== "undefined");
      if (this.inputEl && hasRevertValue && this.acceptUserInput === false) {
          currentItem = this.componentRef.instance.findItemFromSelectValue(this.inputEl.value);
      }
      this.componentRef.destroy();
      this.componentRef = undefined;

      if (this.inputEl && hasRevertValue && this.acceptUserInput === false && currentItem === null) {
          this.selectNewValue(this.revertValue);
      } else if (this.inputEl && this.acceptUserInput === true && typeof currentItem === "undefined" && event && event.target.value) {
          this.enterNewText(event.target.value);
      }
    }
    this.dropdownJustHidden = true;
    setTimeout(() => this.dropdownJustHidden = false, 100);
  };

  styleAutoCompleteDropdown = () => {
    if (this.componentRef) {
      let component = this.componentRef.instance;

      /* setting width/height auto complete */
      let thisElBCR = this.el.getBoundingClientRect();
      let thisInputElBCR = this.inputEl.getBoundingClientRect();
      let closeToBottom = thisInputElBCR.bottom + 100 > window.innerHeight;
      let directionOfStyle = this.isRtl ? 'right' : 'left';

      this.acDropdownEl.style.width = thisInputElBCR.width + "px";
      this.acDropdownEl.style.position = "absolute";
      this.acDropdownEl.style.zIndex = this.zIndex;
      this.acDropdownEl.style[directionOfStyle] = "0";
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
    setTimeout(() => {
        if(this.reFocusAfterSelect){
          this.inputEl.focus();
        }

        return this.inputEl;
    });
  };

  selectCustomValue = (text: string) => {
    this.customSelected.emit(text);
    this.hideAutoCompleteDropdown();
      setTimeout(() => {
          if(this.reFocusAfterSelect){
              this.inputEl.focus();
          }

          return this.inputEl;
      });
  };

  enterNewText = (value: any) => {
    this.renderValue(value);
    this.ngModelChange.emit(value);
    this.valueChanged.emit(value);
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
      component.keyword = evt.target.value;
      component.reloadListInDelay(evt);
    } else {
      this.showAutoCompleteDropdown()
    }
  };

  private renderValue(item: any) {
    this.inputEl && (this.inputEl.value = '' + item);
  }
}
