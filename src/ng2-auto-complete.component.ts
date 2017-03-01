import {
  Component,
  ElementRef,
  Input,
  Output,
  OnInit,
  ViewEncapsulation,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { Ng2AutoComplete } from "./ng2-auto-complete";

/**
 * show a selected date in monthly calendar
 * Each filteredList item has the following property in addition to data itself
 *   1. displayValue as string e.g. Allen Kim
 *   2. dataValue as any e.g.
 */
@Component({
  selector: "ng2-auto-complete",
  template: `
  <div class="ng2-auto-complete">

    <!-- keyword input -->
    <input *ngIf="showInputTag"
           #autoCompleteInput class="keyword"
           placeholder="{{placeholder}}"
           (focus)="showDropdownList($event)"
           (blur)="hideDropdownList()"
           (keydown)="inputElKeyHandler($event)"
           (input)="reloadListInDelay($event)"
           [(ngModel)]="keyword" />

    <!-- dropdown that user can select -->
    <ul *ngIf="dropdownVisible" [class.empty]="emptyList">
      <li *ngIf="isLoading" class="loading">{{loadingText}}</li>
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
          [innerHtml]="getFormattedList(item)">
      </li>
    </ul>

  </div>`,
  providers: [Ng2AutoComplete],
  styles: [`
  @keyframes slideDown {
    0% {
      transform:  translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  .ng2-auto-complete {
    background-color: transparent;
  }
  .ng2-auto-complete > input {
    outline: none;
    border: 0;
    padding: 2px; 
    box-sizing: border-box;
    background-clip: content-box;
  }

  .ng2-auto-complete > ul {
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
  .ng2-auto-complete > ul.empty {
    display: none;
  }

  .ng2-auto-complete > ul li {
    padding: 2px 5px;
    border-bottom: 1px solid #eee;
  }

  .ng2-auto-complete > ul li.selected {
    background-color: #ccc;
  }

  .ng2-auto-complete > ul li:last-child {
    border-bottom: none;
  }

  .ng2-auto-complete > ul li:hover {
    background-color: #ccc;
  }`
  ],
  encapsulation: ViewEncapsulation.None
})
export class Ng2AutoCompleteComponent implements OnInit {

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
  @Input("accept-user-input") acceptUserInput: boolean;
  @Input("loading-text") loadingText: string = "Loading";
  @Input("max-num-list") maxNumList: number;
  @Input("show-input-tag") showInputTag: boolean = true;
  @Input("show-dropdown-on-init") showDropdownOnInit: boolean = false;

  @Output() valueSelected = new EventEmitter();
  @ViewChild('autoCompleteInput') autoCompleteInput: ElementRef;

  el: HTMLElement;           // this component  element `<ng2-auto-complete>`

  dropdownVisible: boolean = false;
  isLoading: boolean = false;

  filteredList: any[] = [];
  minCharsEntered: boolean = false;
  itemIndex: number = 0;
  keyword: string;

  isSrcArr(): boolean {
    return (this.source.constructor.name === "Array");
  }

  /**
   * constructor
   */
  constructor(
    elementRef: ElementRef,
    public autoComplete: Ng2AutoComplete
  ) {
    this.el = elementRef.nativeElement;
  }

  /**
   * user enters into input el, shows list to select, then select one
   */
  ngOnInit(): void {
    this.autoComplete.source = this.source;
    this.autoComplete.pathToData = this.pathToData;
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
      this.filteredList = this.autoComplete.filter(this.source, keyword);
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
            this.filteredList = (<any>resp);
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
    this.valueSelected.emit(data);
  };

  inputElKeyHandler = (evt: any) => {
    let totalNumItem = this.filteredList.length;

    switch (evt.keyCode) {
      case 27: // ESC, hide auto complete
        break;

      case 38: // UP, select the previous li el
        this.itemIndex = (totalNumItem + this.itemIndex - 1) % totalNumItem;
        break;

      case 40: // DOWN, select the next li el or the first one
        this.dropdownVisible = true;
        this.itemIndex = (totalNumItem + this.itemIndex + 1) % totalNumItem;
        break;

      case 13: // ENTER, choose it!!
        if (this.filteredList.length > 0) {
          this.selectOne(this.filteredList[this.itemIndex]);
        }
        evt.preventDefault();
        break;
    }
  };

  getFormattedList(data: any): string {
    let formatted;
    let formatter = this.listFormatter || '(id) value';
    if (typeof formatter === 'function') {
      formatted = formatter.apply(this, [data]);
    } else if (typeof data !== 'object') {
      formatted = data;
    } else if (typeof formatter === 'string') {
      formatted = formatter;
      let matches = formatter.match(/[a-zA-Z0-9_\$]+/g);
      if (matches && typeof data !== 'string') {
        matches.forEach(key => {
          formatted = formatted.replace(key, data[key]);
        });
      }
    }
    return formatted;
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
