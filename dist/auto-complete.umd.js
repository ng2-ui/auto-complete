(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/common"), require("@angular/common/http"), require("@angular/core"), require("@angular/forms"), require("rxjs/operators"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/common", "@angular/common/http", "@angular/core", "@angular/forms", "rxjs/operators"], factory);
	else if(typeof exports === 'object')
		exports["auto-complete"] = factory(require("@angular/common"), require("@angular/common/http"), require("@angular/core"), require("@angular/forms"), require("rxjs/operators"));
	else
		root["auto-complete"] = factory(root["@angular/common"], root["@angular/common/http"], root["@angular/core"], root["@angular/forms"], root["rxjs/operators"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__angular_common__, __WEBPACK_EXTERNAL_MODULE__angular_common_http__, __WEBPACK_EXTERNAL_MODULE__angular_core__, __WEBPACK_EXTERNAL_MODULE__angular_forms__, __WEBPACK_EXTERNAL_MODULE_rxjs_operators__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/auto-complete.component.ts":
/*!****************************************!*\
  !*** ./src/auto-complete.component.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var auto_complete_1 = __webpack_require__(/*! ./auto-complete */ "./src/auto-complete.ts");
/**
 * show a selected date in monthly calendar
 * Each filteredList item has the following property in addition to data itself
 *   1. displayValue as string e.g. Allen Kim
 *   2. dataValue as any e.g.
 */
var NguiAutoCompleteComponent = /** @class */ (function () {
    /**
     * constructor
     */
    function NguiAutoCompleteComponent(elementRef, autoComplete) {
        var _this = this;
        this.autoComplete = autoComplete;
        /**
         * public input properties
         */
        this.autocomplete = false;
        this.minChars = 0;
        this.acceptUserInput = true;
        this.loadingText = 'Loading';
        this.loadingTemplate = null;
        this.showInputTag = true;
        this.showDropdownOnInit = false;
        this.tabToSelect = true;
        this.matchFormatted = false;
        this.autoSelectFirstItem = false;
        this.selectOnBlur = false;
        this.reFocusAfterSelect = true;
        this.headerItemTemplate = null;
        this.ignoreAccents = true;
        this.valueSelected = new core_1.EventEmitter();
        this.customSelected = new core_1.EventEmitter();
        this.textEntered = new core_1.EventEmitter();
        this.dropdownVisible = false;
        this.isLoading = false;
        this.filteredList = [];
        this.minCharsEntered = false;
        this.itemIndex = null;
        this.timer = 0;
        this.delay = (function () {
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();
        this.selectOnEnter = false;
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
                    _this.selectOnEnter = false;
                    _this.selectOne(undefined);
                    break;
                case 38:// UP, select the previous li el
                    if (0 === totalNumItem) {
                        return;
                    }
                    _this.selectOnEnter = true;
                    _this.itemIndex = (totalNumItem + _this.itemIndex - 1) % totalNumItem;
                    _this.scrollToView(_this.itemIndex);
                    break;
                case 40:// DOWN, select the next li el or the first one
                    if (0 === totalNumItem) {
                        return;
                    }
                    _this.selectOnEnter = true;
                    _this.dropdownVisible = true;
                    var sum = _this.itemIndex;
                    sum = (_this.itemIndex === null) ? 0 : sum + 1;
                    _this.itemIndex = (totalNumItem + sum) % totalNumItem;
                    _this.scrollToView(_this.itemIndex);
                    break;
                case 13:// ENTER, choose it!!
                    if (_this.selectOnEnter) {
                        _this.selectOne(_this.filteredList[_this.itemIndex]);
                    }
                    evt.preventDefault();
                    break;
                case 9:// TAB, choose if tab-to-select is enabled
                    if (_this.tabToSelect) {
                        _this.selectOne(_this.filteredList[_this.itemIndex]);
                    }
                    break;
            }
        };
        this.el = elementRef.nativeElement;
    }
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
            if (_this.autoCompleteInput && _this.reFocusAfterSelect) {
                _this.autoCompleteInput.nativeElement.focus();
            }
            if (_this.showDropdownOnInit) {
                _this.showDropdownList({ target: { value: '' } });
            }
        });
    };
    NguiAutoCompleteComponent.prototype.isSrcArr = function () {
        return Array.isArray(this.source);
    };
    NguiAutoCompleteComponent.prototype.showDropdownList = function (event) {
        this.dropdownVisible = true;
        this.reloadList(event.target.value);
    };
    NguiAutoCompleteComponent.prototype.hideDropdownList = function () {
        this.selectOnEnter = false;
        this.dropdownVisible = false;
    };
    NguiAutoCompleteComponent.prototype.findItemFromSelectValue = function (selectText) {
        var matchingItems = this.filteredList.filter(function (item) { return ('' + item) === selectText; });
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
            this.filteredList = this.autoComplete.filter(this.source, keyword, this.matchFormatted, this.ignoreAccents);
            if (this.maxNumList) {
                this.filteredList = this.filteredList.slice(0, this.maxNumList);
            }
        }
        else {
            this.isLoading = true;
            if (typeof this.source === 'function') {
                // custom function that returns observable
                this.source(keyword).subscribe(function (resp) {
                    if (_this.pathToData) {
                        var paths = _this.pathToData.split('.');
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
    NguiAutoCompleteComponent.prototype.enterText = function (data) {
        this.textEntered.emit(data);
    };
    NguiAutoCompleteComponent.prototype.blurHandler = function (evt) {
        if (this.selectOnBlur) {
            this.selectOne(this.filteredList[this.itemIndex]);
        }
        this.hideDropdownList();
    };
    NguiAutoCompleteComponent.prototype.scrollToView = function (index) {
        var container = this.autoCompleteContainer.nativeElement;
        var ul = container.querySelector('ul');
        var li = ul.querySelector('li'); // just sample the first li to get height
        var liHeight = li.offsetHeight;
        var scrollTop = ul.scrollTop;
        var viewport = scrollTop + ul.offsetHeight;
        var scrollOffset = liHeight * index;
        if (scrollOffset < scrollTop || (scrollOffset + liHeight) > viewport) {
            ul.scrollTop = scrollOffset;
        }
    };
    NguiAutoCompleteComponent.prototype.trackByIndex = function (index, item) {
        return index;
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
    __decorate([
        core_1.Input('autocomplete'),
        __metadata("design:type", Object)
    ], NguiAutoCompleteComponent.prototype, "autocomplete", void 0);
    __decorate([
        core_1.Input('list-formatter'),
        __metadata("design:type", Function)
    ], NguiAutoCompleteComponent.prototype, "listFormatter", void 0);
    __decorate([
        core_1.Input('source'),
        __metadata("design:type", Object)
    ], NguiAutoCompleteComponent.prototype, "source", void 0);
    __decorate([
        core_1.Input('path-to-data'),
        __metadata("design:type", String)
    ], NguiAutoCompleteComponent.prototype, "pathToData", void 0);
    __decorate([
        core_1.Input('min-chars'),
        __metadata("design:type", Number)
    ], NguiAutoCompleteComponent.prototype, "minChars", void 0);
    __decorate([
        core_1.Input('placeholder'),
        __metadata("design:type", String)
    ], NguiAutoCompleteComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input('blank-option-text'),
        __metadata("design:type", String)
    ], NguiAutoCompleteComponent.prototype, "blankOptionText", void 0);
    __decorate([
        core_1.Input('no-match-found-text'),
        __metadata("design:type", String)
    ], NguiAutoCompleteComponent.prototype, "noMatchFoundText", void 0);
    __decorate([
        core_1.Input('accept-user-input'),
        __metadata("design:type", Boolean)
    ], NguiAutoCompleteComponent.prototype, "acceptUserInput", void 0);
    __decorate([
        core_1.Input('loading-text'),
        __metadata("design:type", String)
    ], NguiAutoCompleteComponent.prototype, "loadingText", void 0);
    __decorate([
        core_1.Input('loading-template'),
        __metadata("design:type", Object)
    ], NguiAutoCompleteComponent.prototype, "loadingTemplate", void 0);
    __decorate([
        core_1.Input('max-num-list'),
        __metadata("design:type", Number)
    ], NguiAutoCompleteComponent.prototype, "maxNumList", void 0);
    __decorate([
        core_1.Input('show-input-tag'),
        __metadata("design:type", Boolean)
    ], NguiAutoCompleteComponent.prototype, "showInputTag", void 0);
    __decorate([
        core_1.Input('show-dropdown-on-init'),
        __metadata("design:type", Boolean)
    ], NguiAutoCompleteComponent.prototype, "showDropdownOnInit", void 0);
    __decorate([
        core_1.Input('tab-to-select'),
        __metadata("design:type", Boolean)
    ], NguiAutoCompleteComponent.prototype, "tabToSelect", void 0);
    __decorate([
        core_1.Input('match-formatted'),
        __metadata("design:type", Boolean)
    ], NguiAutoCompleteComponent.prototype, "matchFormatted", void 0);
    __decorate([
        core_1.Input('auto-select-first-item'),
        __metadata("design:type", Boolean)
    ], NguiAutoCompleteComponent.prototype, "autoSelectFirstItem", void 0);
    __decorate([
        core_1.Input('select-on-blur'),
        __metadata("design:type", Boolean)
    ], NguiAutoCompleteComponent.prototype, "selectOnBlur", void 0);
    __decorate([
        core_1.Input('re-focus-after-select'),
        __metadata("design:type", Boolean)
    ], NguiAutoCompleteComponent.prototype, "reFocusAfterSelect", void 0);
    __decorate([
        core_1.Input('header-item-template'),
        __metadata("design:type", Object)
    ], NguiAutoCompleteComponent.prototype, "headerItemTemplate", void 0);
    __decorate([
        core_1.Input('ignore-accents'),
        __metadata("design:type", Boolean)
    ], NguiAutoCompleteComponent.prototype, "ignoreAccents", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NguiAutoCompleteComponent.prototype, "valueSelected", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NguiAutoCompleteComponent.prototype, "customSelected", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NguiAutoCompleteComponent.prototype, "textEntered", void 0);
    __decorate([
        core_1.ViewChild('autoCompleteInput'),
        __metadata("design:type", core_1.ElementRef)
    ], NguiAutoCompleteComponent.prototype, "autoCompleteInput", void 0);
    __decorate([
        core_1.ViewChild('autoCompleteContainer'),
        __metadata("design:type", core_1.ElementRef)
    ], NguiAutoCompleteComponent.prototype, "autoCompleteContainer", void 0);
    NguiAutoCompleteComponent = __decorate([
        core_1.Component({
            selector: 'ngui-auto-complete',
            template: "\n        <div #autoCompleteContainer class=\"ngui-auto-complete\">\n            <!-- keyword input -->\n            <input *ngIf=\"showInputTag\"\n                   #autoCompleteInput class=\"keyword\"\n                   [attr.autocomplete]=\"autocomplete ? 'null' : 'off'\"\n                   placeholder=\"{{placeholder}}\"\n                   (focus)=\"showDropdownList($event)\"\n                   (blur)=\"blurHandler($event)\"\n                   (keydown)=\"inputElKeyHandler($event)\"\n                   (input)=\"reloadListInDelay($event)\"\n                   [(ngModel)]=\"keyword\"/>\n\n            <!-- dropdown that user can select -->\n            <ul *ngIf=\"dropdownVisible\" [class.empty]=\"emptyList\">\n                <li *ngIf=\"isLoading && loadingTemplate\" class=\"loading\"\n                    [innerHTML]=\"loadingTemplate\"></li>\n                <li *ngIf=\"isLoading && !loadingTemplate\" class=\"loading\">{{loadingText}}</li>\n                <li *ngIf=\"minCharsEntered && !isLoading && !filteredList.length\"\n                    (mousedown)=\"selectOne('')\"\n                    class=\"no-match-found\">{{noMatchFoundText || 'No Result Found'}}\n                </li>\n                <li *ngIf=\"headerItemTemplate && filteredList.length\" class=\"header-item\"\n                    [innerHTML]=\"headerItemTemplate\"></li>\n                <li *ngIf=\"blankOptionText && filteredList.length\"\n                    (mousedown)=\"selectOne('')\"\n                    class=\"blank-item\">{{blankOptionText}}\n                </li>\n                <li class=\"item\"\n                    *ngFor=\"let item of filteredList; let i=index; trackBy: trackByIndex\"\n                    (mousedown)=\"selectOne(item)\"\n                    [ngClass]=\"{selected: i === itemIndex}\"\n                    [innerHtml]=\"autoComplete.getFormattedListItem(item)\">\n                </li>\n            </ul>\n\n        </div>",
            providers: [auto_complete_1.NguiAutoComplete],
            styles: ["\n        @keyframes slideDown {\n            0% {\n                transform: translateY(-10px);\n            }\n            100% {\n                transform: translateY(0px);\n            }\n        }\n\n        .ngui-auto-complete {\n            background-color: transparent;\n        }\n\n        .ngui-auto-complete > input {\n            outline: none;\n            border: 0;\n            padding: 2px;\n            box-sizing: border-box;\n            background-clip: content-box;\n        }\n\n        .ngui-auto-complete > ul {\n            background-color: #fff;\n            margin: 0;\n            width: 100%;\n            overflow-y: auto;\n            list-style-type: none;\n            padding: 0;\n            border: 1px solid #ccc;\n            box-sizing: border-box;\n            animation: slideDown 0.1s;\n        }\n\n        .ngui-auto-complete > ul.empty {\n            display: none;\n        }\n\n        .ngui-auto-complete > ul li {\n            padding: 2px 5px;\n            border-bottom: 1px solid #eee;\n        }\n\n        .ngui-auto-complete > ul li.selected {\n            background-color: #ccc;\n        }\n\n        .ngui-auto-complete > ul li:last-child {\n            border-bottom: none;\n        }\n\n        .ngui-auto-complete > ul li:not(.header-item):hover {\n            background-color: #ccc;\n        }"
            ],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, auto_complete_1.NguiAutoComplete])
    ], NguiAutoCompleteComponent);
    return NguiAutoCompleteComponent;
}());
exports.NguiAutoCompleteComponent = NguiAutoCompleteComponent;


/***/ }),

/***/ "./src/auto-complete.directive.ts":
/*!****************************************!*\
  !*** ./src/auto-complete.directive.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var auto_complete_component_1 = __webpack_require__(/*! ./auto-complete.component */ "./src/auto-complete.component.ts");
var forms_1 = __webpack_require__(/*! @angular/forms */ "@angular/forms");
/**
 * display auto-complete section with input and dropdown list when it is clicked
 */
var NguiAutoCompleteDirective = /** @class */ (function () {
    function NguiAutoCompleteDirective(resolver, viewContainerRef, parentForm) {
        var _this = this;
        this.resolver = resolver;
        this.viewContainerRef = viewContainerRef;
        this.parentForm = parentForm;
        this.autocomplete = false;
        this.acceptUserInput = true;
        this.loadingTemplate = null;
        this.loadingText = 'Loading';
        this.tabToSelect = true;
        this.selectOnBlur = false;
        this.matchFormatted = false;
        this.autoSelectFirstItem = false;
        this.openOnFocus = true;
        this.closeOnFocusOut = true;
        this.reFocusAfterSelect = true;
        this.headerItemTemplate = null;
        this.ignoreAccents = true;
        this.zIndex = '1';
        this.isRtl = false;
        this.ngModelChange = new core_1.EventEmitter();
        this.valueChanged = new core_1.EventEmitter();
        this.customSelected = new core_1.EventEmitter();
        // show auto-complete list below the current element
        this.showAutoCompleteDropdown = function (event) {
            if (_this.dropdownJustHidden) {
                return;
            }
            _this.hideAutoCompleteDropdown();
            _this.scheduledBlurHandler = null;
            var factory = _this.resolver.resolveComponentFactory(auto_complete_component_1.NguiAutoCompleteComponent);
            _this.componentRef = _this.viewContainerRef.createComponent(factory);
            var component = _this.componentRef.instance;
            component.keyword = _this.inputEl.value;
            component.showInputTag = false; // Do NOT display autocomplete input tag separately
            component.pathToData = _this.pathToData;
            component.minChars = _this.minChars;
            component.source = _this.source;
            component.placeholder = _this.autoCompletePlaceholder;
            component.acceptUserInput = _this.acceptUserInput;
            component.maxNumList = parseInt(_this.maxNumList, 10);
            component.loadingText = _this.loadingText;
            component.loadingTemplate = _this.loadingTemplate;
            component.listFormatter = _this.listFormatter;
            component.blankOptionText = _this.blankOptionText;
            component.noMatchFoundText = _this.noMatchFoundText;
            component.tabToSelect = _this.tabToSelect;
            component.selectOnBlur = _this.selectOnBlur;
            component.matchFormatted = _this.matchFormatted;
            component.autoSelectFirstItem = _this.autoSelectFirstItem;
            component.headerItemTemplate = _this.headerItemTemplate;
            component.ignoreAccents = _this.ignoreAccents;
            component.valueSelected.subscribe(_this.selectNewValue);
            component.textEntered.subscribe(_this.enterNewText);
            component.customSelected.subscribe(_this.selectCustomValue);
            _this.acDropdownEl = _this.componentRef.location.nativeElement;
            _this.acDropdownEl.style.display = 'none';
            // if this element is not an input tag, move dropdown after input tag
            // so that it displays correctly
            if (_this.el.tagName !== 'INPUT' && _this.acDropdownEl) {
                _this.inputEl.parentElement.insertBefore(_this.acDropdownEl, _this.inputEl.nextSibling);
            }
            _this.revertValue = typeof _this.revertValue !== 'undefined' ? _this.revertValue : '';
            setTimeout(function () {
                component.reloadList(_this.inputEl.value);
                _this.styleAutoCompleteDropdown();
                component.dropdownVisible = true;
            });
        };
        this.hideAutoCompleteDropdown = function (event) {
            if (_this.componentRef) {
                var currentItem = void 0;
                var hasRevertValue = (typeof _this.revertValue !== 'undefined');
                if (_this.inputEl && hasRevertValue && _this.acceptUserInput === false) {
                    currentItem = _this.componentRef.instance.findItemFromSelectValue(_this.inputEl.value);
                }
                _this.componentRef.destroy();
                _this.componentRef = undefined;
                if (_this.inputEl && hasRevertValue && _this.acceptUserInput === false && currentItem === null && _this.inputEl.value !== '') {
                    _this.selectNewValue(_this.revertValue);
                    currentItem = _this.revertValue;
                }
                else if (_this.inputEl && _this.acceptUserInput === true && typeof currentItem === 'undefined' && event && event.target.value) {
                    _this.enterNewText(event.target.value);
                }
                _this.revertValue = currentItem;
            }
            _this.dropdownJustHidden = true;
            setTimeout(function () { return _this.dropdownJustHidden = false; }, 100);
        };
        this.styleAutoCompleteDropdown = function () {
            if (_this.componentRef) {
                var component = _this.componentRef.instance;
                /* setting width/height auto complete */
                var thisElBCR = _this.el.getBoundingClientRect();
                var thisInputElBCR = _this.inputEl.getBoundingClientRect();
                var closeToBottom = thisInputElBCR.bottom + 100 > window.innerHeight;
                var directionOfStyle = _this.isRtl ? 'right' : 'left';
                _this.acDropdownEl.style.width = thisInputElBCR.width + 'px';
                _this.acDropdownEl.style.position = 'absolute';
                _this.acDropdownEl.style.zIndex = _this.zIndex;
                _this.acDropdownEl.style[directionOfStyle] = '0';
                _this.acDropdownEl.style.display = 'inline-block';
                if (closeToBottom) {
                    _this.acDropdownEl.style.bottom = thisInputElBCR.height + "px";
                }
                else {
                    _this.acDropdownEl.style.top = thisInputElBCR.height + "px";
                }
            }
        };
        this.selectNewValue = function (item) {
            // make displayable value
            if (item && typeof item === 'object') {
                item = _this.setToStringFunction(item);
            }
            _this.renderValue(item);
            // make return value
            var val = item;
            if (_this.selectValueOf && item[_this.selectValueOf]) {
                val = item[_this.selectValueOf];
            }
            if ((_this.parentForm && _this.formControlName) || _this.extFormControl) {
                if (!!val) {
                    _this.formControl.patchValue(val);
                }
            }
            if (val !== _this.ngModel) {
                _this.ngModelChange.emit(val);
            }
            _this.valueChanged.emit(val);
            _this.hideAutoCompleteDropdown();
            setTimeout(function () {
                if (_this.reFocusAfterSelect) {
                    _this.inputEl.focus();
                }
                return _this.inputEl;
            });
        };
        this.selectCustomValue = function (text) {
            _this.customSelected.emit(text);
            _this.hideAutoCompleteDropdown();
            setTimeout(function () {
                if (_this.reFocusAfterSelect) {
                    _this.inputEl.focus();
                }
                return _this.inputEl;
            });
        };
        this.enterNewText = function (value) {
            _this.renderValue(value);
            _this.ngModelChange.emit(value);
            _this.valueChanged.emit(value);
            _this.hideAutoCompleteDropdown();
        };
        this.keydownEventHandler = function (evt) {
            if (_this.componentRef) {
                var component = _this.componentRef.instance;
                component.inputElKeyHandler(evt);
            }
        };
        this.inputEventHandler = function (evt) {
            if (_this.componentRef) {
                var component = _this.componentRef.instance;
                component.dropdownVisible = true;
                component.keyword = evt.target.value;
                component.reloadListInDelay(evt);
            }
            else {
                _this.showAutoCompleteDropdown();
            }
        };
        this.el = this.viewContainerRef.element.nativeElement;
    }
    NguiAutoCompleteDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Blur event is handled only after a click event. This is to prevent handling of blur events resulting from interacting with a scrollbar
        // introduced by content overflow (Internet explorer issue).
        // See issue description here: http://stackoverflow.com/questions/2023779/clicking-on-a-divs-scroll-bar-fires-the-blur-event-in-ie
        this.documentClickListener = function (e) {
            if (_this.scheduledBlurHandler) {
                _this.scheduledBlurHandler();
                _this.scheduledBlurHandler = null;
            }
        };
        document.addEventListener('click', this.documentClickListener);
        // wrap this element with <div class="ngui-auto-complete">
        this.wrapperEl = document.createElement('div');
        this.wrapperEl.className = 'ngui-auto-complete-wrapper';
        this.wrapperEl.style.position = 'relative';
        this.el.parentElement.insertBefore(this.wrapperEl, this.el.nextSibling);
        this.wrapperEl.appendChild(this.el);
        // Check if we were supplied with a [formControlName] and it is inside a [form]
        // else check if we are supplied with a [FormControl] regardless if it is inside a [form] tag
        if (this.parentForm && this.formControlName) {
            if (this.parentForm['form']) {
                this.formControl = this.parentForm['form'].get(this.formControlName);
            }
            else if (this.parentForm instanceof forms_1.FormGroupName) {
                this.formControl = this.parentForm.control.controls[this.formControlName];
            }
        }
        else if (this.extFormControl) {
            this.formControl = this.extFormControl;
        }
        // apply toString() method for the object
        if (!!this.ngModel) {
            this.selectNewValue(this.ngModel);
        }
        else if (!!this.formControl && this.formControl.value) {
            this.selectNewValue(this.formControl.value);
        }
    };
    NguiAutoCompleteDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        // if this element is not an input tag, move dropdown after input tag
        // so that it displays correctly
        this.inputEl = this.el.tagName === 'INPUT' ? this.el : this.el.querySelector('input');
        if (this.openOnFocus) {
            this.inputEl.addEventListener('focus', function (e) { return _this.showAutoCompleteDropdown(e); });
        }
        if (this.closeOnFocusOut) {
            this.inputEl.addEventListener('focusout', function (e) { return _this.hideAutoCompleteDropdown(e); });
        }
        if (!this.autocomplete) {
            this.inputEl.setAttribute('autocomplete', 'off');
        }
        this.inputEl.addEventListener('blur', function (e) {
            _this.scheduledBlurHandler = function () {
                return _this.blurHandler(e);
            };
        });
        this.inputEl.addEventListener('keydown', function (e) { return _this.keydownEventHandler(e); });
        this.inputEl.addEventListener('input', function (e) { return _this.inputEventHandler(e); });
    };
    NguiAutoCompleteDirective.prototype.ngOnDestroy = function () {
        if (this.componentRef) {
            this.componentRef.instance.valueSelected.unsubscribe();
            this.componentRef.instance.textEntered.unsubscribe();
        }
        if (this.documentClickListener) {
            document.removeEventListener('click', this.documentClickListener);
        }
    };
    NguiAutoCompleteDirective.prototype.ngOnChanges = function (changes) {
        if (changes['ngModel']) {
            this.ngModel = this.setToStringFunction(changes['ngModel'].currentValue);
            this.renderValue(this.ngModel);
        }
    };
    NguiAutoCompleteDirective.prototype.blurHandler = function (event) {
        if (this.componentRef) {
            var component = this.componentRef.instance;
            if (this.selectOnBlur) {
                component.selectOne(component.filteredList[component.itemIndex]);
            }
            if (this.closeOnFocusOut) {
                this.hideAutoCompleteDropdown(event);
            }
        }
    };
    NguiAutoCompleteDirective.prototype.setToStringFunction = function (item) {
        if (item && typeof item === 'object') {
            var displayVal_1;
            if (typeof this.valueFormatter === 'string') {
                var matches = this.valueFormatter.match(/[a-zA-Z0-9_\$]+/g);
                var formatted_1 = this.valueFormatter;
                if (matches && typeof item !== 'string') {
                    matches.forEach(function (key) {
                        formatted_1 = formatted_1.replace(key, item[key]);
                    });
                }
                displayVal_1 = formatted_1;
            }
            else if (typeof this.valueFormatter === 'function') {
                displayVal_1 = this.valueFormatter(item);
            }
            else if (this.displayPropertyName) {
                displayVal_1 = item[this.displayPropertyName];
            }
            else if (typeof this.listFormatter === 'string' && this.listFormatter.match(/^\w+$/)) {
                displayVal_1 = item[this.listFormatter];
            }
            else {
                displayVal_1 = item.value;
            }
            item.toString = function () { return displayVal_1; };
        }
        return item;
    };
    NguiAutoCompleteDirective.prototype.renderValue = function (item) {
        if (!!this.inputEl) {
            this.inputEl.value = '' + item;
        }
    };
    __decorate([
        core_1.Input('autocomplete'),
        __metadata("design:type", Object)
    ], NguiAutoCompleteDirective.prototype, "autocomplete", void 0);
    __decorate([
        core_1.Input('auto-complete-placeholder'),
        __metadata("design:type", String)
    ], NguiAutoCompleteDirective.prototype, "autoCompletePlaceholder", void 0);
    __decorate([
        core_1.Input('source'),
        __metadata("design:type", Object)
    ], NguiAutoCompleteDirective.prototype, "source", void 0);
    __decorate([
        core_1.Input('path-to-data'),
        __metadata("design:type", String)
    ], NguiAutoCompleteDirective.prototype, "pathToData", void 0);
    __decorate([
        core_1.Input('min-chars'),
        __metadata("design:type", Number)
    ], NguiAutoCompleteDirective.prototype, "minChars", void 0);
    __decorate([
        core_1.Input('display-property-name'),
        __metadata("design:type", String)
    ], NguiAutoCompleteDirective.prototype, "displayPropertyName", void 0);
    __decorate([
        core_1.Input('accept-user-input'),
        __metadata("design:type", Boolean)
    ], NguiAutoCompleteDirective.prototype, "acceptUserInput", void 0);
    __decorate([
        core_1.Input('max-num-list'),
        __metadata("design:type", String)
    ], NguiAutoCompleteDirective.prototype, "maxNumList", void 0);
    __decorate([
        core_1.Input('select-value-of'),
        __metadata("design:type", String)
    ], NguiAutoCompleteDirective.prototype, "selectValueOf", void 0);
    __decorate([
        core_1.Input('loading-template'),
        __metadata("design:type", Object)
    ], NguiAutoCompleteDirective.prototype, "loadingTemplate", void 0);
    __decorate([
        core_1.Input('list-formatter'),
        __metadata("design:type", Object)
    ], NguiAutoCompleteDirective.prototype, "listFormatter", void 0);
    __decorate([
        core_1.Input('loading-text'),
        __metadata("design:type", String)
    ], NguiAutoCompleteDirective.prototype, "loadingText", void 0);
    __decorate([
        core_1.Input('blank-option-text'),
        __metadata("design:type", String)
    ], NguiAutoCompleteDirective.prototype, "blankOptionText", void 0);
    __decorate([
        core_1.Input('no-match-found-text'),
        __metadata("design:type", String)
    ], NguiAutoCompleteDirective.prototype, "noMatchFoundText", void 0);
    __decorate([
        core_1.Input('value-formatter'),
        __metadata("design:type", Object)
    ], NguiAutoCompleteDirective.prototype, "valueFormatter", void 0);
    __decorate([
        core_1.Input('tab-to-select'),
        __metadata("design:type", Boolean)
    ], NguiAutoCompleteDirective.prototype, "tabToSelect", void 0);
    __decorate([
        core_1.Input('select-on-blur'),
        __metadata("design:type", Boolean)
    ], NguiAutoCompleteDirective.prototype, "selectOnBlur", void 0);
    __decorate([
        core_1.Input('match-formatted'),
        __metadata("design:type", Boolean)
    ], NguiAutoCompleteDirective.prototype, "matchFormatted", void 0);
    __decorate([
        core_1.Input('auto-select-first-item'),
        __metadata("design:type", Boolean)
    ], NguiAutoCompleteDirective.prototype, "autoSelectFirstItem", void 0);
    __decorate([
        core_1.Input('open-on-focus'),
        __metadata("design:type", Boolean)
    ], NguiAutoCompleteDirective.prototype, "openOnFocus", void 0);
    __decorate([
        core_1.Input('close-on-focusout'),
        __metadata("design:type", Boolean)
    ], NguiAutoCompleteDirective.prototype, "closeOnFocusOut", void 0);
    __decorate([
        core_1.Input('re-focus-after-select'),
        __metadata("design:type", Boolean)
    ], NguiAutoCompleteDirective.prototype, "reFocusAfterSelect", void 0);
    __decorate([
        core_1.Input('header-item-template'),
        __metadata("design:type", Object)
    ], NguiAutoCompleteDirective.prototype, "headerItemTemplate", void 0);
    __decorate([
        core_1.Input('ignore-accents'),
        __metadata("design:type", Boolean)
    ], NguiAutoCompleteDirective.prototype, "ignoreAccents", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NguiAutoCompleteDirective.prototype, "ngModel", void 0);
    __decorate([
        core_1.Input('formControlName'),
        __metadata("design:type", String)
    ], NguiAutoCompleteDirective.prototype, "formControlName", void 0);
    __decorate([
        core_1.Input('formControl'),
        __metadata("design:type", forms_1.FormControl)
    ], NguiAutoCompleteDirective.prototype, "extFormControl", void 0);
    __decorate([
        core_1.Input('z-index'),
        __metadata("design:type", String)
    ], NguiAutoCompleteDirective.prototype, "zIndex", void 0);
    __decorate([
        core_1.Input('is-rtl'),
        __metadata("design:type", Boolean)
    ], NguiAutoCompleteDirective.prototype, "isRtl", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NguiAutoCompleteDirective.prototype, "ngModelChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NguiAutoCompleteDirective.prototype, "valueChanged", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NguiAutoCompleteDirective.prototype, "customSelected", void 0);
    NguiAutoCompleteDirective = __decorate([
        core_1.Directive({
            selector: '[auto-complete], [ngui-auto-complete]'
        }),
        __param(2, core_1.Optional()), __param(2, core_1.Host()), __param(2, core_1.SkipSelf()),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver,
            core_1.ViewContainerRef,
            forms_1.ControlContainer])
    ], NguiAutoCompleteDirective);
    return NguiAutoCompleteDirective;
}());
exports.NguiAutoCompleteDirective = NguiAutoCompleteDirective;


/***/ }),

/***/ "./src/auto-complete.module.ts":
/*!*************************************!*\
  !*** ./src/auto-complete.module.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var common_1 = __webpack_require__(/*! @angular/common */ "@angular/common");
var forms_1 = __webpack_require__(/*! @angular/forms */ "@angular/forms");
var auto_complete_component_1 = __webpack_require__(/*! ./auto-complete.component */ "./src/auto-complete.component.ts");
var auto_complete_directive_1 = __webpack_require__(/*! ./auto-complete.directive */ "./src/auto-complete.directive.ts");
var auto_complete_1 = __webpack_require__(/*! ./auto-complete */ "./src/auto-complete.ts");
var NguiAutoCompleteModule = /** @class */ (function () {
    function NguiAutoCompleteModule() {
    }
    NguiAutoCompleteModule_1 = NguiAutoCompleteModule;
    NguiAutoCompleteModule.forRoot = function () {
        return {
            ngModule: NguiAutoCompleteModule_1,
            providers: [auto_complete_1.NguiAutoComplete]
        };
    };
    NguiAutoCompleteModule = NguiAutoCompleteModule_1 = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule],
            declarations: [auto_complete_component_1.NguiAutoCompleteComponent, auto_complete_directive_1.NguiAutoCompleteDirective],
            exports: [auto_complete_component_1.NguiAutoCompleteComponent, auto_complete_directive_1.NguiAutoCompleteDirective],
            entryComponents: [auto_complete_component_1.NguiAutoCompleteComponent]
        })
    ], NguiAutoCompleteModule);
    return NguiAutoCompleteModule;
    var NguiAutoCompleteModule_1;
}());
exports.NguiAutoCompleteModule = NguiAutoCompleteModule;


/***/ }),

/***/ "./src/auto-complete.ts":
/*!******************************!*\
  !*** ./src/auto-complete.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "@angular/core");
var http_1 = __webpack_require__(/*! @angular/common/http */ "@angular/common/http");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
/**
 * provides auto-complete related utility functions
 */
var NguiAutoComplete = /** @class */ (function () {
    function NguiAutoComplete(http) {
        this.http = http;
        // ...
    }
    NguiAutoComplete.prototype.filter = function (list, keyword, matchFormatted, accentInsensitive) {
        var _this = this;
        return accentInsensitive
            ? list.filter(function (el) {
                var objStr = matchFormatted ? _this.getFormattedListItem(el).toLowerCase() : JSON.stringify(el).toLowerCase();
                keyword = keyword.toLowerCase();
                return objStr.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                    .indexOf(keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '')) !== -1;
            })
            : list.filter(function (el) {
                var objStr = matchFormatted ? _this.getFormattedListItem(el).toLowerCase() : JSON.stringify(el).toLowerCase();
                keyword = keyword.toLowerCase();
                return objStr.indexOf(keyword) !== -1;
            });
    };
    NguiAutoComplete.prototype.getFormattedListItem = function (data) {
        var formatted;
        var formatter = this.listFormatter || '(id) value';
        if (typeof formatter === 'function') {
            formatted = formatter.apply(this, [data]);
        }
        else if (typeof data !== 'object') {
            formatted = data;
        }
        else if (typeof formatter === 'string') {
            formatted = formatter;
            var matches = formatter.match(/[a-zA-Z0-9_\$]+/g);
            if (matches && typeof data !== 'string') {
                matches.forEach(function (key) {
                    formatted = formatted.replace(key, data[key]);
                });
            }
        }
        return formatted;
    };
    /**
     * return remote data from the given source and options, and data path
     */
    NguiAutoComplete.prototype.getRemoteData = function (keyword) {
        var _this = this;
        if (typeof this.source !== 'string') {
            throw new TypeError('Invalid type of source, must be a string. e.g. http://www.google.com?q=:my_keyword');
        }
        else if (!this.http) {
            throw new Error('Http is required.');
        }
        var matches = this.source.match(/:[a-zA-Z_]+/);
        if (matches === null) {
            throw new Error('Replacement word is missing.');
        }
        var replacementWord = matches[0];
        var url = this.source.replace(replacementWord, keyword);
        return this.http.get(url)
            .pipe(operators_1.map(function (list) {
            if (_this.pathToData) {
                var paths = _this.pathToData.split('.');
                paths.forEach(function (prop) { return list = list[prop]; });
            }
            return list;
        }));
    };
    NguiAutoComplete = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Optional()),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], NguiAutoComplete);
    return NguiAutoComplete;
}());
exports.NguiAutoComplete = NguiAutoComplete;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var auto_complete_1 = __webpack_require__(/*! ./auto-complete */ "./src/auto-complete.ts");
exports.NguiAutoComplete = auto_complete_1.NguiAutoComplete;
var auto_complete_module_1 = __webpack_require__(/*! ./auto-complete.module */ "./src/auto-complete.module.ts");
exports.NguiAutoCompleteModule = auto_complete_module_1.NguiAutoCompleteModule;
var auto_complete_component_1 = __webpack_require__(/*! ./auto-complete.component */ "./src/auto-complete.component.ts");
exports.NguiAutoCompleteComponent = auto_complete_component_1.NguiAutoCompleteComponent;
var auto_complete_directive_1 = __webpack_require__(/*! ./auto-complete.directive */ "./src/auto-complete.directive.ts");
exports.NguiAutoCompleteDirective = auto_complete_directive_1.NguiAutoCompleteDirective;


/***/ }),

/***/ "@angular/common":
/*!**********************************!*\
  !*** external "@angular/common" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__angular_common__;

/***/ }),

/***/ "@angular/common/http":
/*!***************************************!*\
  !*** external "@angular/common/http" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__angular_common_http__;

/***/ }),

/***/ "@angular/core":
/*!********************************!*\
  !*** external "@angular/core" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__angular_core__;

/***/ }),

/***/ "@angular/forms":
/*!*********************************!*\
  !*** external "@angular/forms" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__angular_forms__;

/***/ }),

/***/ "rxjs/operators":
/*!*********************************!*\
  !*** external "rxjs/operators" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_rxjs_operators__;

/***/ })

/******/ });
});
//# sourceMappingURL=auto-complete.umd.js.map