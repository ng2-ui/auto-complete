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
        // executing after user stopped typing
        this.delay(function () { return _this.reloadList(); }, delayMs);
        this.inputChanged.emit(this.inputEl.value);
    };
    Ng2AutoCompleteComponent.prototype.showDropdownList = function () {
        this.keyword = this.userInputEl.value;
        this.inputEl.style.display = '';
        this.inputEl.focus();
        this.userInputElTabIndex = this.userInputEl['tabIndex'];
        this.userInputEl['tabIndex'] = -100; //disable tab focus for <shift-tab> pressed
        this.reloadList();
    };
    Ng2AutoCompleteComponent.prototype.hideDropdownList = function () {
        this.inputEl.style.display = 'none';
        this.dropdownVisible = false;
        this.userInputEl['tabIndex'] = this.userInputElTabIndex; // enable tab focus
    };
    Ng2AutoCompleteComponent.prototype.reloadList = function () {
        var _this = this;
        var keyword = this.inputEl.value;
        this.dropdownVisible = true;
        if (this.isSrcArr()) {
            // local source
            if (keyword.length >= (this.minChars || 0)) {
                this.filteredList = this.autoComplete.filter(this.source, this.keyword);
                if (this.maxNumList) {
                    this.filteredList = this.filteredList.slice(0, this.maxNumList);
                }
            }
        }
        else {
            this.isLoading = true;
            if (keyword.length >= (this.minChars || 0)) {
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
                    this.autoComplete.getRemoteData(keyword)
                        .subscribe(function (resp) {
                        _this.filteredList = resp;
                        if (_this.maxNumList) {
                            _this.filteredList = _this.filteredList.slice(0, _this.maxNumList);
                        }
                    }, function (error) { return null; }, function () { return _this.isLoading = false; } // complete
                    );
                }
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
    __decorate([
        core_1.Input("list-formatter"), 
        __metadata('design:type', Function)
    ], Ng2AutoCompleteComponent.prototype, "listFormatter", void 0);
    __decorate([
        core_1.Input("source"), 
        __metadata('design:type', Object)
    ], Ng2AutoCompleteComponent.prototype, "source", void 0);
    __decorate([
        core_1.Input("path-to-data"), 
        __metadata('design:type', String)
    ], Ng2AutoCompleteComponent.prototype, "pathToData", void 0);
    __decorate([
        core_1.Input("min-chars"), 
        __metadata('design:type', Number)
    ], Ng2AutoCompleteComponent.prototype, "minChars", void 0);
    __decorate([
        core_1.Input("value-property-name"), 
        __metadata('design:type', String)
    ], Ng2AutoCompleteComponent.prototype, "valuePropertyName", void 0);
    __decorate([
        core_1.Input("display-property-name"), 
        __metadata('design:type', String)
    ], Ng2AutoCompleteComponent.prototype, "displayPropertyName", void 0);
    __decorate([
        core_1.Input("placeholder"), 
        __metadata('design:type', String)
    ], Ng2AutoCompleteComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input("blank-option-text"), 
        __metadata('design:type', String)
    ], Ng2AutoCompleteComponent.prototype, "blankOptionText", void 0);
    __decorate([
        core_1.Input("accept-user-input"), 
        __metadata('design:type', Boolean)
    ], Ng2AutoCompleteComponent.prototype, "acceptUserInput", void 0);
    __decorate([
        core_1.Input("loading-text"), 
        __metadata('design:type', String)
    ], Ng2AutoCompleteComponent.prototype, "loadingText", void 0);
    __decorate([
        core_1.Input("max-num-list"), 
        __metadata('design:type', Number)
    ], Ng2AutoCompleteComponent.prototype, "maxNumList", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Ng2AutoCompleteComponent.prototype, "valueSelected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Ng2AutoCompleteComponent.prototype, "inputChanged", void 0);
    Ng2AutoCompleteComponent = __decorate([
        core_1.Component({
            selector: "ng2-auto-complete",
            template: "\n  <div class=\"ng2-auto-complete\">\n\n    <!-- keyword input -->\n    <input class=\"keyword\"\n           placeholder=\"{{placeholder}}\"\n           (focus)=\"showDropdownList()\"\n           (blur)=\"hideDropdownList()\"\n           (keydown)=\"inputElKeyHandler($event)\"\n           (input)=\"reloadListInDelay()\"\n           [(ngModel)]=\"keyword\" />\n\n    <!-- dropdown that user can select -->\n    <ul *ngIf=\"dropdownVisible\"\n        [style.bottom]=\"inputEl.style.height\"\n        [style.position]=\"closeToBottom ? 'absolute': ''\">\n      <li *ngIf=\"isLoading\" class=\"loading\">{{loadingText}}</li>\n      <li *ngIf=\"blankOptionText\"\n          (mousedown)=\"selectOne('')\"\n          class=\"blank-item\">{{blankOptionText}}</li>\n      <li class=\"item\"\n          *ngFor=\"let item of filteredList; let i=index\"\n          (mousedown)=\"selectOne(item)\"\n          [ngClass]=\"{selected: i === itemIndex}\"\n          [innerHtml]=\"getFormattedList(item)\">\n      </li>\n    </ul>\n\n  </div>",
            providers: [ng2_auto_complete_1.Ng2AutoComplete],
            styles: ["\n  @keyframes slideDown {\n    0% {\n      transform:  translateY(-10px);\n    }\n    100% {\n      transform: translateY(0px);\n    }\n  }\n  .ng2-auto-complete ng2-auto-complete {\n    background-color: transparent;\n  }\n  .ng2-auto-complete ng2-auto-complete input {\n    outline: none;\n    border: 0px;\n    padding: 2px; \n    box-sizing: border-box;\n    background-clip: content-box;\n  }\n\n  .ng2-auto-complete ng2-auto-complete ul {\n    background-color: #fff;\n    margin: 0;\n    width : 100%;\n    overflow-y: auto;\n    list-style-type: none;\n    padding: 0;\n    border: 1px solid #ccc;\n    box-sizing: border-box;\n    animation: slideDown 0.1s;\n  }\n\n  .ng2-auto-complete ng2-auto-complete ul li {\n    padding: 2px 5px;\n    border-bottom: 1px solid #eee;\n  }\n\n  .ng2-auto-complete ng2-auto-complete ul li.selected {\n    background-color: #ccc;\n  }\n\n  .ng2-auto-complete ng2-auto-complete ul li:last-child {\n    border-bottom: none;\n  }\n\n  .ng2-auto-complete ng2-auto-complete ul li:hover {\n    background-color: #ccc;\n  }"
            ],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, ng2_auto_complete_1.Ng2AutoComplete])
    ], Ng2AutoCompleteComponent);
    return Ng2AutoCompleteComponent;
}());
exports.Ng2AutoCompleteComponent = Ng2AutoCompleteComponent;
//# sourceMappingURL=ng2-auto-complete.component.js.map