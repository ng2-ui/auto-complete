import { ElementRef, OnInit } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { AutoComplete } from './auto-complete';
/**
 * show a selected date in monthly calendar
 * Each filteredList item has the following property in addition to data itself
 *   1. displayValue as string e.g. Allen Kim
 *   2. dataValue as any e.g. 1234
 */
export declare class AutoCompleteComponent implements OnInit {
    autoComplete: AutoComplete;
    /**
     * public variables
     */
    listFormatter: (arg: any) => void;
    source: any;
    pathToData: string;
    minChars: number;
    valuePropertyName: string;
    displayPropertyName: string;
    placeholder: string;
    el: HTMLElement;
    inputEl: HTMLInputElement;
    dropdownVisible: boolean;
    isLoading: boolean;
    filteredList: any[];
    itemIndex: number;
    keyword: string;
    valueSelected: Subject<any>;
    /**
     * constructor
     */
    constructor(elementRef: ElementRef, autoComplete: AutoComplete);
    /**
     * user enters into input el, shows list to select, then select one
     */
    ngOnInit(): void;
    reloadListInDelay(): void;
    showDropdownList(): void;
    hideDropdownList(): void;
    reloadList(): void;
    selectOne(data: any): void;
    inputElKeyHandler(evt: any): void;
    getFormattedList(data: any): string;
    private defaultListFormatter(data);
    private delay;
}
