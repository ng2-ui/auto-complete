"use strict";
var core_1 = require("@angular/core");
var ng2_auto_complete_1 = require("./ng2-auto-complete");
/**
 * show a selected date in monthly calendar
 * Each filteredList item has the following property in addition to data itself
 *   1. displayValue as string e.g. Allen Kim
 *   2. dataValue as any e.g.
 */
var Ng2AutoCompleteComponent = (function () {
    /**
     * constructor
     */
    function Ng2AutoCompleteComponent(elementRef, autoComplete) {
        this.autoComplete = autoComplete;
        this.minChars = 0;
        this.valuePropertyName = "id";
        this.displayPropertyName = "value";
        this.loadingText = "Loading";
        this.valueSelected = new core_1.EventEmitter();
        this.inputChanged = new core_1.EventEmitter();
        this.closeToBottom = false;
        this.dropdownVisible = false;
        this.isLoading = false;
        this.filteredList = [];
        this.itemIndex = 0;
        this.delay = (function () {
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();
        this.el = elementRef.nativeElement;
    }
    Ng2AutoCompleteComponent.prototype.isSrcArr = function () {
        return (this.source.constructor.name === "Array");
    };
    /**
     * user enters into input el, shows list to select, then select one
     */
    Ng2AutoCompleteComponent.prototype.ngOnInit = function () {
        this.inputEl = (this.el.querySelector("input"));
        this.userInputEl = this.el.parentElement.querySelector("input");
        this.autoComplete.source = this.source;
        this.autoComplete.pathToData = this.pathToData;
    };
    Ng2AutoCompleteComponent.prototype.reloadListInDelay = function () {
        var _this = this;
        var delayMs = this.isSrcArr() ? 10 : 500;
        var keyword = this.inputEl.value;
        // executing after user stopped typing
        this.delay(function () { return _this.reloadList(keyword); }, delayMs);
        this.inputChanged.emit(keyword);
    };
    Ng2AutoCompleteComponent.prototype.showDropdownList = function () {
        this.keyword = this.userInputEl.value;
        this.inputEl.style.display = '';
        this.inputEl.focus();
        this.userInputElTabIndex = this.userInputEl['tabIndex'];
        this.userInputEl['tabIndex'] = -100; //disable tab focus for <shift-tab> pressed
        this.reloadList(this.keyword);
    };
    Ng2AutoCompleteComponent.prototype.hideDropdownList = function () {
        this.inputEl.style.display = 'none';
        this.dropdownVisible = false;
        this.userInputEl['tabIndex'] = this.userInputElTabIndex; // enable tab focus
    };
    Ng2AutoCompleteComponent.prototype.reloadList = function (keyword) {
        var _this = this;
        if (keyword.length < (this.minChars || 0)) {
            return;
        }
        this.dropdownVisible = true;
        if (this.isSrcArr()) {
            this.isLoading = false;
            this.filteredList = this.autoComplete.filter(this.source, this.keyword);
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
                    _this.filteredList = resp;
                    if (_this.maxNumList) {
                        _this.filteredList = _this.filteredList.slice(0, _this.maxNumList);
                    }
                }, function (error) { return null; }, function () { return _this.isLoading = false; } // complete
                );
            }
        }
    };
    Ng2AutoCompleteComponent.prototype.selectOne = function (data) {
        this.hideDropdownList();
        this.valueSelected.emit(data);
    };
    ;
    Ng2AutoCompleteComponent.prototype.inputElKeyHandler = function (evt) {
        var totalNumItem = this.filteredList.length;
        switch (evt.keyCode) {
            case 27:
                this.hideDropdownList();
                break;
            case 38:
                this.itemIndex = (totalNumItem + this.itemIndex - 1) % totalNumItem;
                break;
            case 40:
                this.dropdownVisible = true;
                this.itemIndex = (totalNumItem + this.itemIndex + 1) % totalNumItem;
                break;
            case 13:
                if (this.filteredList.length > 0) {
                    this.selectOne(this.filteredList[this.itemIndex]);
                }
                evt.preventDefault();
                break;
        }
    };
    ;
    Ng2AutoCompleteComponent.prototype.getFormattedList = function (data) {
        var formatter = this.listFormatter || this.defaultListFormatter;
        return formatter.apply(this, [data]);
    };
    Ng2AutoCompleteComponent.prototype.defaultListFormatter = function (data) {
        var html = "";
        html += data[this.valuePropertyName] ? "<b>(" + data[this.valuePropertyName] + ")</b>" : "";
        html += data[this.displayPropertyName] ? "<span>" + data[this.displayPropertyName] + "</span>" : data;
        return html;
    };
    Ng2AutoCompleteComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: "ng2-auto-complete",
                    template: "\n  <div class=\"ng2-auto-complete\">\n\n    <!-- keyword input -->\n    <input #autoCompleteInput class=\"keyword\"\n           placeholder=\"{{placeholder}}\"\n           (focus)=\"showDropdownList()\"\n           (blur)=\"hideDropdownList()\"\n           (keydown)=\"inputElKeyHandler($event)\"\n           (input)=\"reloadListInDelay()\"\n           [(ngModel)]=\"keyword\" />\n\n    <!-- dropdown that user can select -->\n    <ul *ngIf=\"dropdownVisible\"\n        [style.bottom]=\"inputEl.style.height\"\n        [style.position]=\"closeToBottom ? 'absolute': ''\">\n      <li *ngIf=\"isLoading\" class=\"loading\">{{loadingText}}</li>\n      <li *ngIf=\"!isLoading && !filteredList.length\">No Match Found</li>\n      <li *ngIf=\"blankOptionText && filteredList.length\"\n          (mousedown)=\"selectOne('')\"\n          class=\"blank-item\">{{blankOptionText}}</li>\n      <li class=\"item\"\n          *ngFor=\"let item of filteredList; let i=index\"\n          (mousedown)=\"selectOne(item)\"\n          [ngClass]=\"{selected: i === itemIndex}\"\n          [innerHtml]=\"getFormattedList(item)\">\n      </li>\n    </ul>\n\n  </div>",
                    providers: [ng2_auto_complete_1.Ng2AutoComplete],
                    styles: ["\n  @keyframes slideDown {\n    0% {\n      transform:  translateY(-10px);\n    }\n    100% {\n      transform: translateY(0px);\n    }\n  }\n  .ng2-auto-complete ng2-auto-complete {\n    background-color: transparent;\n  }\n  .ng2-auto-complete ng2-auto-complete input {\n    outline: none;\n    border: 0;\n    padding: 2px; \n    box-sizing: border-box;\n    background-clip: content-box;\n  }\n\n  .ng2-auto-complete ng2-auto-complete ul {\n    background-color: #fff;\n    margin: 0;\n    width : 100%;\n    overflow-y: auto;\n    list-style-type: none;\n    padding: 0;\n    border: 1px solid #ccc;\n    box-sizing: border-box;\n    animation: slideDown 0.1s;\n  }\n\n  .ng2-auto-complete ng2-auto-complete ul li {\n    padding: 2px 5px;\n    border-bottom: 1px solid #eee;\n  }\n\n  .ng2-auto-complete ng2-auto-complete ul li.selected {\n    background-color: #ccc;\n  }\n\n  .ng2-auto-complete ng2-auto-complete ul li:last-child {\n    border-bottom: none;\n  }\n\n  .ng2-auto-complete ng2-auto-complete ul li:hover {\n    background-color: #ccc;\n  }"
                    ],
                    encapsulation: core_1.ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    Ng2AutoCompleteComponent.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: ng2_auto_complete_1.Ng2AutoComplete, },
    ];
    Ng2AutoCompleteComponent.propDecorators = {
        'listFormatter': [{ type: core_1.Input, args: ["list-formatter",] },],
        'source': [{ type: core_1.Input, args: ["source",] },],
        'pathToData': [{ type: core_1.Input, args: ["path-to-data",] },],
        'minChars': [{ type: core_1.Input, args: ["min-chars",] },],
        'valuePropertyName': [{ type: core_1.Input, args: ["value-property-name",] },],
        'displayPropertyName': [{ type: core_1.Input, args: ["display-property-name",] },],
        'placeholder': [{ type: core_1.Input, args: ["placeholder",] },],
        'blankOptionText': [{ type: core_1.Input, args: ["blank-option-text",] },],
        'acceptUserInput': [{ type: core_1.Input, args: ["accept-user-input",] },],
        'loadingText': [{ type: core_1.Input, args: ["loading-text",] },],
        'maxNumList': [{ type: core_1.Input, args: ["max-num-list",] },],
        'valueSelected': [{ type: core_1.Output },],
        'inputChanged': [{ type: core_1.Output },],
        'autoCompleteInput': [{ type: core_1.ViewChild, args: ['autoCompleteInput',] },],
    };
    return Ng2AutoCompleteComponent;
}());
exports.Ng2AutoCompleteComponent = Ng2AutoCompleteComponent;
//# sourceMappingURL=ng2-auto-complete.component.js.map