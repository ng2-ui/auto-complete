import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NguiAutoComplete } from './auto-complete';
import { AutoCompleteFilter } from './auto-complete.filter';

/**
 * show a selected date in monthly calendar
 * Each filteredList item has the following property in addition to data itself
 *   1. displayValue as string e.g. Allen Kim
 *   2. dataValue as any e.g.
 */
@Component({
    selector: 'ngui-auto-complete',
    template: `
        <div #autoCompleteContainer class="ngui-auto-complete">
            <!-- keyword input -->
            <input *ngIf="showInputTag"
                   #autoCompleteInput class="keyword"
                   [attr.autocomplete]="autocomplete ? 'null' : 'off'"
                   placeholder="{{placeholder}}"
                   (focus)="showDropdownList($event)"
                   (blur)="blurHandler($event)"
                   (keydown)="inputElKeyHandler($event)"
                   (input)="reloadListInDelay($event)"
                   [(ngModel)]="keyword"/>

            <!-- dropdown that user can select -->
            <ul *ngIf="dropdownVisible" [class.empty]="emptyList">
                <li *ngIf="headerItemTemplate && filteredList.length" class="header-item"
                    [innerHTML]="headerItemTemplate"></li>
                <li *ngFor="let filter of filters; let i=index; trackBy: trackByIndex"
                    class="ngui-auto-complete-filter-item"
                    [ngClass]="{selected: i === itemIndex}"
                    (mousedown)="onFilterClicked(filter)">
                    <input type="checkbox"
                           class="ngui-auto-complete-filter-checkbox"
                           (click)="onFilterChange()"
                           [checked]="filter.enabled"/>
                    <span class="ngui-auto-complete-filter-label">{{filter.label}}</span>
                </li>
                <li *ngIf="isLoading && loadingTemplate" class="loading"
                    [innerHTML]="loadingTemplate"></li>
                <li *ngIf="isLoading && !loadingTemplate" class="loading">{{loadingText}}</li>
                <li *ngIf="minCharsEntered && !isLoading && !filteredList.length"
                    (mousedown)="selectOne('')"
                    class="no-match-found">{{noMatchFoundText || 'No Result Found'}}
                </li>
                <li *ngIf="blankOptionText && filteredList.length"
                    (mousedown)="selectOne('')"
                    class="blank-item">{{blankOptionText}}
                </li>
                <li class="item"
                    *ngFor="let item of filteredList; let i=index; trackBy: trackByIndex"
                    (mousedown)="selectOne(item)"
                    [ngClass]="{selected: i + filters.length === itemIndex}"
                    [innerHtml]="autoComplete.getFormattedListItem(item)">
                </li>
            </ul>

        </div>`,
    providers: [NguiAutoComplete],
    styles: [`
        @keyframes slideDown {
            0% {
                transform: translateY(-10px);
            }
            100% {
                transform: translateY(0px);
            }
        }

        .ngui-auto-complete {
            background-color: transparent;
        }

        .ngui-auto-complete > input {
            outline: none;
            border: 0;
            padding: 2px;
            box-sizing: border-box;
            background-clip: content-box;
        }

        .ngui-auto-complete > ul {
            background-color: #fff;
            margin: 0;
            width: 100%;
            overflow-y: auto;
            list-style-type: none;
            padding: 0;
            border: 1px solid #ccc;
            box-sizing: border-box;
            animation: slideDown 0.1s;
        }

        .ngui-auto-complete > ul.empty {
            display: none;
        }

        .ngui-auto-complete > ul li {
            padding: 2px 5px;
            border-bottom: 1px solid #eee;
        }

        .ngui-auto-complete > ul li.selected {
            background-color: #ccc;
        }

        .ngui-auto-complete > ul li:last-child {
            border-bottom: none;
        }

        .ngui-auto-complete > ul li:not(.header-item):hover {
            background-color: #ccc;
        }

        .ngui-auto-complete-filter-item {
            display: flex;
            flex-direction: row;
            cursor: pointer;
        }

        .ngui-auto-complete-filter-item input {
            width: auto;
        }
    `
    ],
    encapsulation: ViewEncapsulation.None
})
export class NguiAutoCompleteComponent implements OnInit {

    /**
     * public input properties
     */
    @Input('autocomplete') public autocomplete = false;
    @Input('list-formatter') public listFormatter: (arg: any) => string;
    @Input('source') public source: any;
    @Input('path-to-data') public pathToData: string;
    @Input('min-chars') public minChars: number = 0;
    @Input('placeholder') public placeholder: string;
    @Input('blank-option-text') public blankOptionText: string;
    @Input('no-match-found-text') public noMatchFoundText: string;
    @Input('accept-user-input') public acceptUserInput: boolean = true;
    @Input('loading-text') public loadingText: string = 'Loading';
    @Input('loading-template') public loadingTemplate = null;
    @Input('max-num-list') public maxNumList: number;
    @Input('show-input-tag') public showInputTag: boolean = true;
    @Input('show-dropdown-on-init') public showDropdownOnInit: boolean = false;
    @Input('tab-to-select') public tabToSelect: boolean = true;
    @Input('match-formatted') public matchFormatted: boolean = false;
    @Input('auto-select-first-item') public autoSelectFirstItem: boolean = false;
    @Input('select-on-blur') public selectOnBlur: boolean = false;
    @Input('re-focus-after-select') public reFocusAfterSelect: boolean = true;
    @Input('header-item-template') public headerItemTemplate = null;
    @Input('ignore-accents') public ignoreAccents: boolean = true;
    @Input('filters') public filters: AutoCompleteFilter[] = [];

    @Output() public valueSelected = new EventEmitter();
    @Output() public customSelected = new EventEmitter();
    @Output() public textEntered = new EventEmitter();
    @Output() public filterSelected = new EventEmitter();

    @ViewChild('autoCompleteInput') public autoCompleteInput: ElementRef;
    @ViewChild('autoCompleteContainer') public autoCompleteContainer: ElementRef;

    public dropdownVisible: boolean = false;
    public isLoading: boolean = false;

    public filteredList: any[] = [];
    public minCharsEntered: boolean = false;
    public itemIndex: number = null;
    public keyword: string;

    private el: HTMLElement;           // this component  element `<ngui-auto-complete>`
    private timer = 0;

    private delay = (function() {
        let timer = 0;
        return function(callback: any, ms: number) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();
    private selectOnEnter: boolean = false;

    /**
     * constructor
     */
    constructor(elementRef: ElementRef,
                public autoComplete: NguiAutoComplete,
                private zone: NgZone) {
        this.el = elementRef.nativeElement;
    }

    /**
     * user enters into input el, shows list to select, then select one
     */
    ngOnInit(): void {
        this.autoComplete.source = this.source;
        this.autoComplete.pathToData = this.pathToData;
        this.autoComplete.listFormatter = this.listFormatter;
        if (this.autoSelectFirstItem) {
            this.itemIndex = 0;
        }
        setTimeout(() => {
            if (this.autoCompleteInput && this.reFocusAfterSelect) {
                this.autoCompleteInput.nativeElement.focus();
            }
            if (this.showDropdownOnInit) {
                this.showDropdownList({target: {value: ''}});
            }
        });
    }

    public isSrcArr(): boolean {
        return Array.isArray(this.source);
    }

    public reloadListInDelay = (evt: any): void => {
        const delayMs = this.isSrcArr() ? 10 : 500;
        const keyword = evt.target.value;

        // executing after user stopped typing
        this.delay(() => this.reloadList(keyword), delayMs);
    }

    public showDropdownList(event: any): void {
        this.dropdownVisible = true;
        this.reloadList(event.target.value);
    }

    public hideDropdownList(): void {
        this.selectOnEnter = false;
        this.dropdownVisible = false;
    }

    public findItemFromSelectValue(selectText: string): any {
        const matchingItems = this.filteredList.filter((item) => ('' + item) === selectText);
        return matchingItems.length ? matchingItems[0] : null;
    }

    public reloadList(keyword: string): void {
        this.filteredList = [];
        if (keyword.length < (this.minChars || 0)) {
            this.minCharsEntered = false;
            return;
        } else {
            this.minCharsEntered = true;
        }

        if (this.isSrcArr()) {    // local source
            this.isLoading = false;
            this.filteredList = this.autoComplete.filter(
                this.source,
                keyword,
                this.matchFormatted,
                this.ignoreAccents,
                this.filters);
            if (this.maxNumList) {
                this.filteredList = this.filteredList.slice(0, this.maxNumList);
            }

        } else {                 // remote source
            this.isLoading = true;

            if (typeof this.source === 'function') {
                // custom function that returns observable
                this.source(keyword).subscribe(
                    (resp) => {

                        if (this.pathToData) {
                            const paths = this.pathToData.split('.');
                            paths.forEach((prop) => resp = resp[prop]);
                        }

                        this.filteredList = resp;
                        if (this.maxNumList) {
                            this.filteredList = this.filteredList.slice(0, this.maxNumList);
                        }
                    },
                    (error) => null,
                    () =>  this.zone.run(() => this.isLoading = false) // complete
                );
            } else {
                // remote source

                this.autoComplete.getRemoteData(keyword).subscribe((resp) => {
                        this.filteredList = resp ? resp : [];
                        if (this.maxNumList) {
                            this.filteredList = this.filteredList.slice(0, this.maxNumList);
                        }
                    },
                    (error) => null,
                    () => this.zone.run(() => this.isLoading = false) // complete
                );
            }
        }
    }

    public selectOne(data: any) {
        if (!!data || data === '') {
            this.valueSelected.emit(data);
        } else {
            this.customSelected.emit(this.keyword);
        }
    }

    public enterText(data: any) {
        this.textEntered.emit(data);
    }

    public blurHandler(evt: any) {
        if (this.selectOnBlur) {
            this.selectOne(this.filteredList[this.itemIndex]);
        }

        this.hideDropdownList();
    }

    public inputElKeyHandler = (evt: any) => {
        const totalNumItem = this.filteredList.length + this.filters.length;

        switch (evt.keyCode) {
            case 27: // ESC, hide auto complete
                this.selectOnEnter = false;
                this.selectOne(undefined);
                break;

            case 38: // UP, select the previous li el
                if (0 === totalNumItem) {
                    return;
                }
                this.selectOnEnter = true;
                this.itemIndex = (totalNumItem + this.itemIndex - 1) % totalNumItem;
                this.scrollToView(this.itemIndex);
                break;

            case 40: // DOWN, select the next li el or the first one
                if (0 === totalNumItem) {
                    return;
                }
                this.selectOnEnter = true;
                this.dropdownVisible = true;
                let sum = this.itemIndex;
                sum = (this.itemIndex === null) ? 0 : sum + 1;
                this.itemIndex = (totalNumItem + sum) % totalNumItem;
                this.scrollToView(this.itemIndex);
                break;

            case 13: // ENTER, choose it!!
                if (this.selectOnEnter) {
                    this.onEnterPressed();
                }
                evt.preventDefault();
                break;

            case 9: // TAB, choose if tab-to-select is enabled
                if (this.tabToSelect) {
                    this.onEnterPressed();
                }
                break;
        }
    }

    public onEnterPressed() {
        if (this.itemIndex < this.filters.length) {
            this.filters[this.itemIndex].enabled = !this.filters[this.itemIndex].enabled;
            this.reloadList(this.keyword);
        } else {
            this.selectOne(this.filteredList[this.itemIndex - this.filters.length]);
        }
    }

    public scrollToView(index) {
        const container = this.autoCompleteContainer.nativeElement;
        const ul = container.querySelector('ul');
        const li = ul.querySelector('li');  // just sample the first li to get height
        const liHeight = li.offsetHeight;
        const scrollTop = ul.scrollTop;
        const viewport = scrollTop + ul.offsetHeight;
        const scrollOffset = liHeight * index;
        if (scrollOffset < scrollTop || (scrollOffset + liHeight) > viewport) {
            ul.scrollTop = scrollOffset;
        }
    }

    public trackByIndex(index, item) {
        return index;
    }

    public onFilterChange() {
        return false;
    }

    public onFilterClicked(filter: AutoCompleteFilter) {
        this.zone.run(() => filter.enabled = !filter.enabled);
        this.filterSelected.emit();
        this.reloadList(this.keyword);
    }

    get emptyList(): boolean {
        return !(
            this.isLoading ||
            (this.minCharsEntered && !this.isLoading && !this.filteredList.length) ||
            (this.filteredList.length)
        );
    }

}
