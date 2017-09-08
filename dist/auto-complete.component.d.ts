import { ElementRef, EventEmitter, OnInit } from "@angular/core";
import { NguiAutoComplete } from "./auto-complete";
/**
 * show a selected date in monthly calendar
 * Each filteredList item has the following property in addition to data itself
 *   1. displayValue as string e.g. Allen Kim
 *   2. dataValue as any e.g.
 */
export declare class NguiAutoCompleteComponent implements OnInit {
    autoComplete: NguiAutoComplete;
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
    loadingTemplate: any;
    maxNumList: number;
    showInputTag: boolean;
    showDropdownOnInit: boolean;
    tabToSelect: boolean;
    matchFormatted: boolean;
    autoSelectFirstItem: boolean;
    selectOnBlur: boolean;
    valueSelected: EventEmitter<{}>;
    customSelected: EventEmitter<{}>;
    textEntered: EventEmitter<{}>;
    autoCompleteInput: ElementRef;
    autoCompleteContainer: ElementRef;
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
    constructor(elementRef: ElementRef, autoComplete: NguiAutoComplete);
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
    enterText(data: any): void;
    blurHandler(evt: any): void;
    inputElKeyHandler: (evt: any) => void;
    scrollToView(index: any): void;
    readonly emptyList: boolean;
    private delay;
}
