import { DynamicComponentLoader, ComponentRef, ViewContainerRef, EventEmitter, OnInit } from '@angular/core';
import "rxjs/Rx";
/**
 * display auto-complete section with input and dropdown list when it is clicked
 */
export declare class AutoCompleteDirective implements OnInit {
    dcl: DynamicComponentLoader;
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
    componentRef: Promise<ComponentRef<any>>;
    el: HTMLElement;
    acEl: HTMLElement;
    constructor(dcl: DynamicComponentLoader, viewContainerRef: ViewContainerRef);
    ngOnInit(): void;
    showAutoComplete(): void;
    hideAutoComplete(): Promise<any>;
}
