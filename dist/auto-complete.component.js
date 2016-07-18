"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Subject_1 = require("rxjs/Subject");
var auto_complete_1 = require('./auto-complete');
var module; // just to pass type check
/**
 * show a selected date in monthly calendar
 * Each filteredList item has the following property in addition to data itself
 *   1. displayValue as string e.g. Allen Kim
 *   2. dataValue as any e.g. 1234
 */
var AutoCompleteComponent = (function () {
    /**
     * constructor
     */
    function AutoCompleteComponent(elementRef, autoComplete) {
        this.autoComplete = autoComplete;
        this.minChars = 0;
        this.valuePropertyName = 'id';
        this.displayPropertyName = 'value';
        this.dropdownVisible = false;
        this.isLoading = false;
        this.filteredList = [];
        this.itemIndex = 0;
        this.valueSelected = new Subject_1.Subject();
        this.delay = (function () {
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();
        this.el = elementRef.nativeElement;
    }
    /**
     * user enters into input el, shows list to select, then select one
     */
    AutoCompleteComponent.prototype.ngOnInit = function () {
        this.inputEl = (this.el.querySelector('input'));
        this.autoComplete.source = this.source;
        this.autoComplete.pathToData = this.pathToData;
    };
    AutoCompleteComponent.prototype.reloadListInDelay = function () {
        var _this = this;
        var delayMs = this.source.constructor.name == 'Array' ? 10 : 500;
        //executing after user stopped typing
        this.delay(function () { return _this.reloadList(); }, delayMs);
    };
    AutoCompleteComponent.prototype.showDropdownList = function () {
        this.keyword = '';
        this.inputEl.focus();
        this.reloadList();
    };
    AutoCompleteComponent.prototype.hideDropdownList = function () {
        this.dropdownVisible = false;
    };
    AutoCompleteComponent.prototype.reloadList = function () {
        var _this = this;
        var keyword = this.inputEl.value;
        this.hideDropdownList();
        if (this.source.constructor.name == 'Array') {
            this.filteredList =
                this.autoComplete.filter(this.source, this.keyword);
            this.dropdownVisible = true;
        }
        else {
            if (keyword.length >= this.minChars) {
                this.dropdownVisible = true;
                this.isLoading = true;
                var query = { keyword: keyword };
                this.autoComplete.getRemoteData(query)
                    .subscribe(function (resp) {
                    _this.filteredList = resp;
                }, function (error) { return null; }, function () { return _this.isLoading = false; } //complete
                 //complete
                );
            }
        }
    };
    AutoCompleteComponent.prototype.selectOne = function (data) {
        this.hideDropdownList();
        this.valueSelected.next(data);
    };
    ;
    AutoCompleteComponent.prototype.inputElKeyHandler = function (evt) {
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
                this.selectOne(this.filteredList[this.itemIndex]);
                evt.preventDefault();
                break;
        }
    };
    ;
    AutoCompleteComponent.prototype.getFormattedList = function (data) {
        var formatter = this.listFormatter || this.defaultListFormatter;
        return formatter.apply(this, [data]);
    };
    AutoCompleteComponent.prototype.defaultListFormatter = function (data) {
        var html = "";
        html += data[this.valuePropertyName] ? "<b>(" + data[this.valuePropertyName] + ")</b>" : "";
        html += data[this.displayPropertyName] ? "<span>" + data[this.displayPropertyName] + "</span>" : data;
        return html;
    };
    __decorate([
        core_1.Input('list-formatter'), 
        __metadata('design:type', Function)
    ], AutoCompleteComponent.prototype, "listFormatter", void 0);
    __decorate([
        core_1.Input('source'), 
        __metadata('design:type', Object)
    ], AutoCompleteComponent.prototype, "source", void 0);
    __decorate([
        core_1.Input('path-to-data'), 
        __metadata('design:type', String)
    ], AutoCompleteComponent.prototype, "pathToData", void 0);
    __decorate([
        core_1.Input('min-chars'), 
        __metadata('design:type', Number)
    ], AutoCompleteComponent.prototype, "minChars", void 0);
    __decorate([
        core_1.Input('value-property-name'), 
        __metadata('design:type', String)
    ], AutoCompleteComponent.prototype, "valuePropertyName", void 0);
    __decorate([
        core_1.Input('display-property-name'), 
        __metadata('design:type', String)
    ], AutoCompleteComponent.prototype, "displayPropertyName", void 0);
    __decorate([
        core_1.Input('placeholder'), 
        __metadata('design:type', String)
    ], AutoCompleteComponent.prototype, "placeholder", void 0);
    AutoCompleteComponent = __decorate([
        // just to pass type check
        core_1.Component({
            selector: 'auto-complete',
            template: "\n  <div class=\"auto-complete\">\n\n    <!-- keyword input -->\n    <input class=\"keyword\"\n           placeholder=\"{{placeholder}}\"\n           (focus)=\"showDropdownList()\"\n           (blur)=\"dropdownVisible=false\"\n           (keydown)=\"inputElKeyHandler($event)\"\n           (input)=\"reloadListInDelay()\"\n           [(ngModel)]=\"keyword\" />\n\n    <!-- dropdown that user can select -->\n    <ul *ngIf=\"dropdownVisible\">\n      <li *ngIf=\"isLoading\" class=\"loading\">Loading</li>\n      <li class=\"item\"\n          *ngFor=\"let item of filteredList; let i=index\"\n          (mousedown)=\"selectOne(item)\"\n          [ngClass]=\"{selected: i === itemIndex}\"\n          [innerHTML]=\"getFormattedList(item)\"\n          ></li>\n    </ul>\n\n  </div>",
            providers: [auto_complete_1.AutoComplete],
            styles: ["\n  @keyframes slideDown {\n    0% {\n      transform:  translateY(-10px);\n    }\n    100% {\n      transform: translateY(0px);\n    }\n  }\n  .auto-complete input {\n    outline: none;\n    border: 2px solid transparent;\n    border-width: 3px 2px;\n    margin: 0;\n    box-sizing: border-box;\n    background-clip: content-box;\n  }\n\n  .auto-complete ul {\n    background-color: #fff;\n    margin: 0;\n    width : 100%;\n    overflow-y: auto;\n    list-style-type: none;\n    padding: 0;\n    border: 1px solid #ccc;\n    box-sizing: border-box;\n    animation: slideDown 0.1s;\n  }\n\n  .auto-complete ul li {\n    padding: 2px 5px;\n    border-bottom: 1px solid #eee;\n  }\n\n  .auto-complete ul li.selected {\n    background-color: #ccc;\n  }\n\n  .auto-complete ul li:last-child {\n    border-bottom: none;\n  }\n\n  .auto-complete ul li:hover {\n    background-color: #ccc;\n  }\n\n"],
            //encapsulation: ViewEncapsulation.Native
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, auto_complete_1.AutoComplete])
    ], AutoCompleteComponent);
    return AutoCompleteComponent;
}());
exports.AutoCompleteComponent = AutoCompleteComponent;
//# sourceMappingURL=auto-complete.component.js.map