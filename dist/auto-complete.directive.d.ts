import { ComponentRef, ViewContainerRef, EventEmitter, OnInit, ComponentFactoryResolver, Renderer, SimpleChanges } from "@angular/core";
import { NguiAutoCompleteComponent } from "./auto-complete.component";
import { ControlContainer, AbstractControl, FormControl } from "@angular/forms";
/**
 * display auto-complete section with input and dropdown list when it is clicked
 */
export declare class NguiAutoCompleteDirective implements OnInit {
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
    loadingTemplate: any;
    listFormatter: any;
    loadingText: string;
    blankOptionText: string;
    noMatchFoundText: string;
    valueFormatter: any;
    tabToSelect: boolean;
    matchFormatted: boolean;
    ngModel: String;
    formControlName: string;
    extFormControl: FormControl;
    zIndex: string;
    ngModelChange: EventEmitter<{}>;
    valueChanged: EventEmitter<{}>;
    componentRef: ComponentRef<NguiAutoCompleteComponent>;
    wrapperEl: HTMLElement;
    el: HTMLElement;
    acDropdownEl: HTMLElement;
    inputEl: HTMLInputElement;
    formControl: AbstractControl;
    revertValue: any;
    private scheduledBlurHandler;
    constructor(resolver: ComponentFactoryResolver, renderer: Renderer, viewContainerRef: ViewContainerRef, parentForm: ControlContainer);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    showAutoCompleteDropdown: (event?: any) => void;
    hideAutoCompleteDropdown: (event?: any) => void;
    styleAutoCompleteDropdown: () => void;
    setToStringFunction(item: any): any;
    selectNewValue: (item: any) => void;
    private keydownEventHandler;
    private inputEventHandler;
}
