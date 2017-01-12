import { ComponentRef, ViewContainerRef, EventEmitter, OnInit, ComponentFactoryResolver, Renderer, SimpleChanges } from "@angular/core";
import { Ng2AutoCompleteComponent } from "./ng2-auto-complete.component";
/**
 * display auto-complete section with input and dropdown list when it is clicked
 */
export declare class Ng2AutoCompleteDirective implements OnInit {
    private resolver;
    private renderer;
    viewContainerRef: ViewContainerRef;
    autoCompletePlaceholder: string;
    listFormatter: (arg: any) => string;
    source: any;
    pathToData: string;
    minChars: number;
    valuePropertyName: string;
    displayPropertyName: string;
    blankOptionText: string;
    acceptUserInput: boolean;
    loadingText: string;
    maxNumList: string;
    ngModel: String;
    ngModelChange: EventEmitter<{}>;
    valueChanged: EventEmitter<{}>;
    componentRef: ComponentRef<Ng2AutoCompleteComponent>;
    el: HTMLElement;
    acDropdownEl: HTMLElement;
    inputEl: HTMLInputElement;
    constructor(resolver: ComponentFactoryResolver, renderer: Renderer, viewContainerRef: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    showAutoCompleteDropdown(): void;
    hideAutoCompleteDropdown: (event?: any) => void;
    styleAutoCompleteDropdown: () => void;
    addToStringFunction(val: any): any;
    componentInputChanged: (val: string) => void;
    selectNewValue: (val: any) => void;
    private moveAutocompleteDropDownAfterInputEl();
    private elementIn(el, containerEl);
}
