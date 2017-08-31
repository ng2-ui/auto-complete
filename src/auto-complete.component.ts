import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from "@angular/core";
import {NguiAutoComplete} from "./auto-complete";

/**
 * show a selected date in monthly calendar
 * Each filteredList item has the following property in addition to data itself
 *   1. displayValue as string e.g. Allen Kim
 *   2. dataValue as any e.g.
 */
@Component({
  selector: "ngui-auto-complete",
  template: `
  <div #autoCompleteContainer class="ngui-auto-complete">
    <!-- keyword input -->
    <input *ngIf="showInputTag"
           #autoCompleteInput class="keyword"
           placeholder="{{placeholder}}"
           (focus)="showDropdownList($event)"
           (blur)="blurHandler($event)"
           (keydown)="inputElKeyHandler($event)"
           (input)="reloadListInDelay($event)"
           [(ngModel)]="keyword" />

    <!-- dropdown that user can select -->
    <ul *ngIf="dropdownVisible" [class.empty]="emptyList">
      <li *ngIf="isLoading && loadingTemplate" class="loading" [innerHTML]="loadingTemplate"></li>
      <li *ngIf="isLoading && !loadingTemplate" class="loading">{{loadingText}}</li>
      <li *ngIf="minCharsEntered && !isLoading && !filteredList.length"
           (mousedown)="selectOne('')"
           class="no-match-found">{{noMatchFoundText || 'No Result Found'}}</li>
      <li *ngIf="blankOptionText && filteredList.length"
          (mousedown)="selectOne('')"
          class="blank-item">{{blankOptionText}}</li>
      <li class="item"
          *ngFor="let item of filteredList; let i=index"
          (mousedown)="selectOne(item)"
          [ngClass]="{selected: i === itemIndex}"
          [innerHtml]="autoComplete.getFormattedListItem(item)">
      </li>
    </ul>

  </div>`,
  providers: [NguiAutoComplete],
  styles: [`
  @keyframes slideDown {
    0% {
      transform:  translateY(-10px);
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
    width : 100%;
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

  .ngui-auto-complete > ul li:hover {
    background-color: #ccc;
  }`
  ],
  encapsulation: ViewEncapsulation.None
})
export class NguiAutoCompleteComponent implements OnInit {

  /**
   * public input properties
   */
  @Input("list-formatter") listFormatter: (arg: any) => string;
  @Input("source") source: any;
  @Input("path-to-data") pathToData: string;
  @Input("min-chars") minChars: number = 0;
  @Input("placeholder") placeholder: string;
  @Input("blank-option-text") blankOptionText: string;
  @Input("no-match-found-text") noMatchFoundText: string;
  @Input("accept-user-input") acceptUserInput: boolean = true;
  @Input("loading-text") loadingText: string = "Loading";
  @Input("loading-template") loadingTemplate = null;
  @Input("max-num-list") maxNumList: number;
  @Input("show-input-tag") showInputTag: boolean = true;
  @Input("show-dropdown-on-init") showDropdownOnInit: boolean = false;
  @Input("tab-to-select") tabToSelect: boolean = true;
  @Input("match-formatted") matchFormatted: boolean = false;
  @Input("auto-select-first-item") autoSelectFirstItem: boolean = false;
  @Input("select-on-blur") selectOnBlur: boolean = false;

  @Output() valueSelected = new EventEmitter();
  @Output() customSelected = new EventEmitter();
  @Output() textEntered = new EventEmitter();
  @ViewChild('autoCompleteInput') autoCompleteInput: ElementRef;
  @ViewChild('autoCompleteContainer') autoCompleteContainer: ElementRef;

  el: HTMLElement;           // this component  element `<ngui-auto-complete>`

  dropdownVisible: boolean = false;
  isLoading: boolean = false;

  filteredList: any[] = [];
  minCharsEntered: boolean = false;
  itemIndex: number = null;
  keyword: string;

  isSrcArr(): boolean {
    return (this.source.constructor.name === "Array");
  }

  /**
   * constructor
   */
  constructor(
    elementRef: ElementRef,
    public autoComplete: NguiAutoComplete
  ) {
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
      if (this.autoCompleteInput) {
        this.autoCompleteInput.nativeElement.focus()
      }
      if (this.showDropdownOnInit) {
        this.showDropdownList({target: {value: ''}});
      }
    });
  }

  reloadListInDelay = (evt: any): void  => {
    let delayMs = this.isSrcArr() ? 10 : 500;
    let keyword = evt.target.value;

    // executing after user stopped typing
    this.delay(() => this.reloadList(keyword), delayMs);
  };

  showDropdownList(event: any): void {
    this.dropdownVisible = true;
    this.reloadList(event.target.value);
  }

  hideDropdownList(): void {
    this.dropdownVisible = false;
  }
  
  findItemFromSelectValue(selectText: string): any {
    let matchingItems = this.filteredList
                            .filter(item => ('' + item) === selectText);
    return matchingItems.length ? matchingItems[0] : null;
  }

  reloadList(keyword: string): void {

    this.filteredList = [];
    if (keyword.length < (this.minChars || 0)) {
      this.minCharsEntered = false;
      return;
    } else {
      this.minCharsEntered = true;
    }

    if (this.isSrcArr()) {    // local source
      this.isLoading = false;
      this.filteredList = this.autoComplete.filter(this.source, keyword, this.matchFormatted);
      if (this.maxNumList) {
        this.filteredList = this.filteredList.slice(0, this.maxNumList);
      }

    } else {                 // remote source
      this.isLoading = true;

      if (typeof this.source === "function") {
        // custom function that returns observable
        this.source(keyword).subscribe(
          resp => {

            if (this.pathToData) {
              let paths = this.pathToData.split(".");
              paths.forEach(prop => resp = resp[prop]);
            }

            this.filteredList = resp;
            if (this.maxNumList) {
              this.filteredList = this.filteredList.slice(0, this.maxNumList);
            }
          },
          error => null,
          () => this.isLoading = false // complete
        );
      } else {
        // remote source

        this.autoComplete.getRemoteData(keyword).subscribe(resp => {
            this.filteredList = resp ? (<any>resp) : [];
            if (this.maxNumList) {
              this.filteredList = this.filteredList.slice(0, this.maxNumList);
            }
          },
          error => null,
          () => this.isLoading = false // complete
        );
      }
    }
  }

  selectOne(data: any) {
    if (data) {
      this.valueSelected.emit(data);
    } else {
      this.customSelected.emit(this.keyword);
    }
  };

  enterText(data: any) {
    this.textEntered.emit(data);
  }

  blurHandler(evt: any) {
    if (this.selectOnBlur) {
      this.selectOne(this.filteredList[this.itemIndex]);
    }

    this.hideDropdownList();
  };

  inputElKeyHandler = (evt: any) => {
    let totalNumItem = this.filteredList.length;

    switch (evt.keyCode) {
      case 27: // ESC, hide auto complete
        break;

      case 38: // UP, select the previous li el
        this.itemIndex = (totalNumItem + this.itemIndex - 1) % totalNumItem;
        this.scrollToView(this.itemIndex);
        break;

      case 40: // DOWN, select the next li el or the first one
        this.dropdownVisible = true;
        let sum = this.itemIndex;
        if (this.itemIndex === null) {
          sum = 0;
        } else {
          sum = sum + 1;
        }
        this.itemIndex = (totalNumItem + sum) % totalNumItem;
        this.scrollToView(this.itemIndex);
        break;

      case 13: // ENTER, choose it!!
        this.selectOne(this.filteredList[this.itemIndex]);
        evt.preventDefault();
        break;

      case 9: // TAB, choose if tab-to-select is enabled
        if (this.tabToSelect) {
          this.selectOne(this.filteredList[this.itemIndex]);
        }
        break;
    }
  };


  scrollToView(index) {
    const container = this.autoCompleteContainer.nativeElement;
    const ul = container.querySelector('ul');
    const li = ul.querySelector('li');  //just sample the first li to get height
    const liHeight = li.offsetHeight;
    const scrollTop = ul.scrollTop;
    const viewport = scrollTop + ul.offsetHeight;
    const scrollOffset = liHeight * index;
    if (scrollOffset < scrollTop || (scrollOffset + liHeight) > viewport) {
      ul.scrollTop = scrollOffset;
    }
  }

  get emptyList(): boolean {
    return !(
      this.isLoading ||
      (this.minCharsEntered && !this.isLoading && !this.filteredList.length) ||
      (this.filteredList.length)
    );
  }

  private delay = (function () {
    let timer = 0;
    return function (callback: any, ms: number) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

}
