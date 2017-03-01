import { ComponentRef, ViewContainerRef, EventEmitter, OnInit, ComponentFactoryResolver, Renderer, SimpleChanges } from "@angular/core";
import { Ng2AutoCompleteComponent } from "./ng2-auto-complete.component";
import { ControlContainer, AbstractControl, FormControl } from "@angular/forms";
/**
 * display auto-complete section with input and dropdown list when it is clicked
 */
export declare class Ng2AutoCompleteDirective implements OnInit {
    private resolver;
    private renderer;
    viewContainerRef: ViewContainerRef;
    private parentForm;
    autoCompletePlaceholder: string;
    source: any;
    pathToData: string;
    minChars: number;
    displayPropertyName: string;
    acceptUserInput: boolean;
    maxNumList: string;
    selectValueOf: string;
    listFormatter: any;
    loadingText: string;
    blankOptionText: string;
    noMatchFoundText: string;
    ngModel: String;
    formControlName: string;
    extFormControl: FormControl;
    ngModelChange: EventEmitter<{}>;
    valueChanged: EventEmitter<{}>;
    componentRef: ComponentRef<Ng2AutoCompleteComponent>;
    wrapperEl: HTMLElement;
    el: HTMLElement;
    acDropdownEl: HTMLElement;
    inputEl: HTMLInputElement;
    formControl: AbstractControl;
    revertValue: any;
    constructor(resolver: ComponentFactoryResolver, renderer: Renderer, viewContainerRef: ViewContainerRef, parentForm: ControlContainer);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    showAutoCompleteDropdown: (event?: any) => void;
    hideAutoCompleteDropdown: (event?: any) => void;
    styleAutoCompleteDropdown: () => void;
    addToStringFunction(val: any): any;
    selectNewValue: (item: any) => void;
    private keydownEventHandler;
    private inputEventHandler;
}
