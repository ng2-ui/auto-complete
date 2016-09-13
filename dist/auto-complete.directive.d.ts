import { ComponentRef, ViewContainerRef, EventEmitter, OnInit, ComponentFactoryResolver } from "@angular/core";
import "rxjs/Rx";
import { AutoCompleteComponent } from "./auto-complete.component";
/**
 * display auto-complete section with input and dropdown list when it is clicked
 */
export declare class AutoCompleteDirective implements OnInit {
    private resolver;
    viewContainerRef: ViewContainerRef;
    autoCompletePlaceholder: string;
    listFormatter: (arg: any) => string;
    source: any;
    pathToData: string;
    minChars: number;
    valuePropertyName: string;
    displayPropertyName: string;
    ngModel: String;
    ngModelChange: EventEmitter<{}>;
    valueChanged: EventEmitter<{}>;
    componentRef: ComponentRef<AutoCompleteComponent>;
    el: HTMLElement;
    acDropdownEl: HTMLElement;
    inputEl: HTMLInputElement;
    constructor(resolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    showAutoCompleteDropdown(): void;
    hideAutoCompleteDropdown: (event?: any) => void;
    styleAutoCompleteDropdown: () => void;
    selectNewValue: (val: any) => void;
    private moveAutocompleteDropDownAfterInputEl();
    private elementIn(el, containerEl);
}
