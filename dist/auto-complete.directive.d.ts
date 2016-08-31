import { ComponentRef, ViewContainerRef, EventEmitter, OnInit, ComponentFactoryResolver } from '@angular/core';
import { AutoCompleteComponent } from "./auto-complete.component";
import "rxjs/Rx";
/**
 * display auto-complete section with input and dropdown list when it is clicked
 */
export declare class AutoCompleteDirective implements OnInit {
    private resolver;
    viewContainerRef: ViewContainerRef;
    placeholder: string;
    listFormatter: (arg: any) => void;
    valueChanged: (value: any) => void;
    source: any;
    pathToData: string;
    minChars: number;
    valuePropertyName: string;
    displayPropertyName: string;
    ngModel: String;
    ngModelChange: EventEmitter<{}>;
    componentRef: ComponentRef<AutoCompleteComponent>;
    el: HTMLElement;
    acEl: HTMLElement;
    constructor(resolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    showAutoCompleteDropdown(): void;
    hideAutoCompleteDropdown: (event?: any) => void;
    styleAutoCompleteDropdown: () => void;
    selectNewValue: (val: any) => void;
}
