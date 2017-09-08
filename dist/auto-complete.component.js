"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var auto_complete_1 = require("./auto-complete");
/**
 * show a selected date in monthly calendar
 * Each filteredList item has the following property in addition to data itself
 *   1. displayValue as string e.g. Allen Kim
 *   2. dataValue as any e.g.
 */
var NguiAutoCompleteComponent = (function () {
    /**
     * constructor
     */
    function NguiAutoCompleteComponent(elementRef, autoComplete) {
        var _this = this;
        this.autoComplete = autoComplete;
        this.minChars = 0;
        this.acceptUserInput = true;
        this.loadingText = "Loading";
        this.loadingTemplate = null;
        this.showInputTag = true;
        this.showDropdownOnInit = false;
        this.tabToSelect = true;
        this.matchFormatted = false;
        this.autoSelectFirstItem = false;
        this.selectOnBlur = false;
        this.valueSelected = new core_1.EventEmitter();
        this.customSelected = new core_1.EventEmitter();
        this.textEntered = new core_1.EventEmitter();
        this.dropdownVisible = false;
        this.isLoading = false;
        this.filteredList = [];
        this.minCharsEntered = false;
        this.itemIndex = null;
        this.reloadListInDelay = function (evt) {
            var delayMs = _this.isSrcArr() ? 10 : 500;
            var keyword = evt.target.value;
            // executing after user stopped typing
            _this.delay(function () { return _this.reloadList(keyword); }, delayMs);
        };
        this.inputElKeyHandler = function (evt) {
            var totalNumItem = _this.filteredList.length;
            switch (evt.keyCode) {
                case 27:// ESC, hide auto complete
                    break;
                case 38:// UP, select the previous li el
                    _this.itemIndex = (totalNumItem + _this.itemIndex - 1) % totalNumItem;
                    _this.scrollToView(_this.itemIndex);
                    break;
                case 40:// DOWN, select the next li el or the first one
                    _this.dropdownVisible = true;
                    var sum = _this.itemIndex;
                    if (_this.itemIndex === null) {
                        sum = 0;
                    }
                    else {
                        sum = sum + 1;
                    }
                    _this.itemIndex = (totalNumItem + sum) % totalNumItem;
                    _this.scrollToView(_this.itemIndex);
                    break;
                case 13:// ENTER, choose it!!
                    _this.selectOne(_this.filteredList[_this.itemIndex]);
                    evt.preventDefault();
                    break;
                case 9:// TAB, choose if tab-to-select is enabled
                    if (_this.tabToSelect) {
                        _this.selectOne(_this.filteredList[_this.itemIndex]);
                    }
                    break;
            }
        };
        this.delay = (function () {
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();
        this.el = elementRef.nativeElement;
    }
    NguiAutoCompleteComponent.prototype.isSrcArr = function () {
        return (this.source.constructor.name === "Array");
    };
    /**
     * user enters into input el, shows list to select, then select one
     */
    NguiAutoCompleteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.autoComplete.source = this.source;
        this.autoComplete.pathToData = this.pathToData;
        this.autoComplete.listFormatter = this.listFormatter;
        if (this.autoSelectFirstItem) {
            this.itemIndex = 0;
        }
        setTimeout(function () {
            if (_this.autoCompleteInput) {
                _this.autoCompleteInput.nativeElement.focus();
            }
            if (_this.showDropdownOnInit) {
                _this.showDropdownList({ target: { value: '' } });
            }
        });
    };
    NguiAutoCompleteComponent.prototype.showDropdownList = function (event) {
        this.dropdownVisible = true;
        this.reloadList(event.target.value);
    };
    NguiAutoCompleteComponent.prototype.hideDropdownList = function () {
        this.dropdownVisible = false;
    };
    NguiAutoCompleteComponent.prototype.findItemFromSelectValue = function (selectText) {
        var matchingItems = this.filteredList
            .filter(function (item) { return ('' + item) === selectText; });
        return matchingItems.length ? matchingItems[0] : null;
    };
    NguiAutoCompleteComponent.prototype.reloadList = function (keyword) {
        var _this = this;
        this.filteredList = [];
        if (keyword.length < (this.minChars || 0)) {
            this.minCharsEntered = false;
            return;
        }
        else {
            this.minCharsEntered = true;
        }
        if (this.isSrcArr()) {
            this.isLoading = false;
            this.filteredList = this.autoComplete.filter(this.source, keyword, this.matchFormatted);
            if (this.maxNumList) {
                this.filteredList = this.filteredList.slice(0, this.maxNumList);
            }
        }
        else {
            this.isLoading = true;
            if (typeof this.source === "function") {
                // custom function that returns observable
                this.source(keyword).subscribe(function (resp) {
                    if (_this.pathToData) {
                        var paths = _this.pathToData.split(".");
                        paths.forEach(function (prop) { return resp = resp[prop]; });
                    }
                    _this.filteredList = resp;
                    if (_this.maxNumList) {
                        _this.filteredList = _this.filteredList.slice(0, _this.maxNumList);
                    }
                }, function (error) { return null; }, function () { return _this.isLoading = false; } // complete
                );
            }
            else {
                // remote source
                this.autoComplete.getRemoteData(keyword).subscribe(function (resp) {
                    _this.filteredList = resp ? resp : [];
                    if (_this.maxNumList) {
                        _this.filteredList = _this.filteredList.slice(0, _this.maxNumList);
                    }
                }, function (error) { return null; }, function () { return _this.isLoading = false; } // complete
                );
            }
        }
    };
    NguiAutoCompleteComponent.prototype.selectOne = function (data) {
        if (!!data || data === '') {
            this.valueSelected.emit(data);
        }
        else {
            this.customSelected.emit(this.keyword);
        }
    };
    ;
    NguiAutoCompleteComponent.prototype.enterText = function (data) {
        this.textEntered.emit(data);
    };
    NguiAutoCompleteComponent.prototype.blurHandler = function (evt) {
        if (this.selectOnBlur) {
            this.selectOne(this.filteredList[this.itemIndex]);
        }
        this.hideDropdownList();
    };
    ;
    NguiAutoCompleteComponent.prototype.scrollToView = function (index) {
        var container = this.autoCompleteContainer.nativeElement;
        var ul = container.querySelector('ul');
        var li = ul.querySelector('li'); //just sample the first li to get height
        var liHeight = li.offsetHeight;
        var scrollTop = ul.scrollTop;
        var viewport = scrollTop + ul.offsetHeight;
        var scrollOffset = liHeight * index;
        if (scrollOffset < scrollTop || (scrollOffset + liHeight) > viewport) {
            ul.scrollTop = scrollOffset;
        }
    };
    Object.defineProperty(NguiAutoCompleteComponent.prototype, "emptyList", {
        get: function () {
            return !(this.isLoading ||
                (this.minCharsEntered && !this.isLoading && !this.filteredList.length) ||
                (this.filteredList.length));
        },
        enumerable: true,
        configurable: true
    });
    NguiAutoCompleteComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: "ngui-auto-complete",
                    template: "\n  <div #autoCompleteContainer class=\"ngui-auto-complete\">\n    <!-- keyword input -->\n    <input *ngIf=\"showInputTag\"\n           #autoCompleteInput class=\"keyword\"\n           placeholder=\"{{placeholder}}\"\n           (focus)=\"showDropdownList($event)\"\n           (blur)=\"blurHandler($event)\"\n           (keydown)=\"inputElKeyHandler($event)\"\n           (input)=\"reloadListInDelay($event)\"\n           [(ngModel)]=\"keyword\" />\n\n    <!-- dropdown that user can select -->\n    <ul *ngIf=\"dropdownVisible\" [class.empty]=\"emptyList\">\n      <li *ngIf=\"isLoading && loadingTemplate\" class=\"loading\" [innerHTML]=\"loadingTemplate\"></li>\n      <li *ngIf=\"isLoading && !loadingTemplate\" class=\"loading\">{{loadingText}}</li>\n      <li *ngIf=\"minCharsEntered && !isLoading && !filteredList.length\"\n           (mousedown)=\"selectOne('')\"\n           class=\"no-match-found\">{{noMatchFoundText || 'No Result Found'}}</li>\n      <li *ngIf=\"blankOptionText && filteredList.length\"\n          (mousedown)=\"selectOne('')\"\n          class=\"blank-item\">{{blankOptionText}}</li>\n      <li class=\"item\"\n          *ngFor=\"let item of filteredList; let i=index\"\n          (mousedown)=\"selectOne(item)\"\n          [ngClass]=\"{selected: i === itemIndex}\"\n          [innerHtml]=\"autoComplete.getFormattedListItem(item)\">\n      </li>\n    </ul>\n\n  </div>",
                    providers: [auto_complete_1.NguiAutoComplete],
                    styles: ["\n  @keyframes slideDown {\n    0% {\n      transform:  translateY(-10px);\n    }\n    100% {\n      transform: translateY(0px);\n    }\n  }\n  .ngui-auto-complete {\n    background-color: transparent;\n  }\n  .ngui-auto-complete > input {\n    outline: none;\n    border: 0;\n    padding: 2px; \n    box-sizing: border-box;\n    background-clip: content-box;\n  }\n\n  .ngui-auto-complete > ul {\n    background-color: #fff;\n    margin: 0;\n    width : 100%;\n    overflow-y: auto;\n    list-style-type: none;\n    padding: 0;\n    border: 1px solid #ccc;\n    box-sizing: border-box;\n    animation: slideDown 0.1s;\n  }\n  .ngui-auto-complete > ul.empty {\n    display: none;\n  }\n\n  .ngui-auto-complete > ul li {\n    padding: 2px 5px;\n    border-bottom: 1px solid #eee;\n  }\n\n  .ngui-auto-complete > ul li.selected {\n    background-color: #ccc;\n  }\n\n  .ngui-auto-complete > ul li:last-child {\n    border-bottom: none;\n  }\n\n  .ngui-auto-complete > ul li:hover {\n    background-color: #ccc;\n  }"
                    ],
                    encapsulation: core_1.ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    NguiAutoCompleteComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: auto_complete_1.NguiAutoComplete, },
    ]; };
    NguiAutoCompleteComponent.propDecorators = {
        'listFormatter': [{ type: core_1.Input, args: ["list-formatter",] },],
        'source': [{ type: core_1.Input, args: ["source",] },],
        'pathToData': [{ type: core_1.Input, args: ["path-to-data",] },],
        'minChars': [{ type: core_1.Input, args: ["min-chars",] },],
        'placeholder': [{ type: core_1.Input, args: ["placeholder",] },],
        'blankOptionText': [{ type: core_1.Input, args: ["blank-option-text",] },],
        'noMatchFoundText': [{ type: core_1.Input, args: ["no-match-found-text",] },],
        'acceptUserInput': [{ type: core_1.Input, args: ["accept-user-input",] },],
        'loadingText': [{ type: core_1.Input, args: ["loading-text",] },],
        'loadingTemplate': [{ type: core_1.Input, args: ["loading-template",] },],
        'maxNumList': [{ type: core_1.Input, args: ["max-num-list",] },],
        'showInputTag': [{ type: core_1.Input, args: ["show-input-tag",] },],
        'showDropdownOnInit': [{ type: core_1.Input, args: ["show-dropdown-on-init",] },],
        'tabToSelect': [{ type: core_1.Input, args: ["tab-to-select",] },],
        'matchFormatted': [{ type: core_1.Input, args: ["match-formatted",] },],
        'autoSelectFirstItem': [{ type: core_1.Input, args: ["auto-select-first-item",] },],
        'selectOnBlur': [{ type: core_1.Input, args: ["select-on-blur",] },],
        'valueSelected': [{ type: core_1.Output },],
        'customSelected': [{ type: core_1.Output },],
        'textEntered': [{ type: core_1.Output },],
        'autoCompleteInput': [{ type: core_1.ViewChild, args: ['autoCompleteInput',] },],
        'autoCompleteContainer': [{ type: core_1.ViewChild, args: ['autoCompleteContainer',] },],
    };
    return NguiAutoCompleteComponent;
}());
exports.NguiAutoCompleteComponent = NguiAutoCompleteComponent;
//# sourceMappingURL=auto-complete.component.js.map