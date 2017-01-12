import { ElementRef, OnInit, EventEmitter } from "@angular/core";
import { Ng2AutoComplete } from "./ng2-auto-complete";
/**
 * show a selected date in monthly calendar
 * Each filteredList item has the following property in addition to data itself
 *   1. displayValue as string e.g. Allen Kim
 *   2. dataValue as any e.g.
 */
export declare class Ng2AutoCompleteComponent implements OnInit {
    autoComplete: Ng2AutoComplete;
    /**
     * public input properties
     */
    listFormatter: (arg: any) => string;
    source: any;
    pathToData: string;
    minChars: number;
    valuePropertyName: string;
    displayPropertyName: string;
    placeholder: string;
    blankOptionText: string;
    acceptUserInput: boolean;
    loadingText: string;
    maxNumList: number;
    valueSelected: EventEmitter<{}>;
    inputChanged: EventEmitter<{}>;
    autoCompleteInput: ElementRef;
    el: HTMLElement;
    inputEl: HTMLInputElement;
    userInputEl: any;
    userInputElTabIndex: any;
    closeToBottom: boolean;
    dropdownVisible: boolean;
    isLoading: boolean;
    filteredList: any[];
    itemIndex: number;
    keyword: string;
    isSrcArr(): boolean;
    /**
     * constructor
     */
    constructor(elementRef: ElementRef, autoComplete: Ng2AutoComplete);
    /**
     * user enters into input el, shows list to select, then select one
     */
    ngOnInit(): void;
    reloadListInDelay(): void;
    showDropdownList(): void;
    hideDropdownList(): void;
    reloadList(keyword: string): void;
    selectOne(data: any): void;
    inputElKeyHandler(evt: any): void;
    getFormattedList(data: any): string;
    private defaultListFormatter(data);
    private delay;
}
