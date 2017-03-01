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
    placeholder: string;
    blankOptionText: string;
    noMatchFoundText: string;
    acceptUserInput: boolean;
    loadingText: string;
    maxNumList: number;
    showInputTag: boolean;
    showDropdownOnInit: boolean;
    valueSelected: EventEmitter<{}>;
    autoCompleteInput: ElementRef;
    el: HTMLElement;
    dropdownVisible: boolean;
    isLoading: boolean;
    filteredList: any[];
    minCharsEntered: boolean;
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
    reloadListInDelay: (evt: any) => void;
    showDropdownList(event: any): void;
    hideDropdownList(): void;
    findItemFromSelectValue(selectText: string): any;
    reloadList(keyword: string): void;
    selectOne(data: any): void;
    inputElKeyHandler: (evt: any) => void;
    getFormattedList(data: any): string;
    readonly emptyList: boolean;
    private delay;
}
