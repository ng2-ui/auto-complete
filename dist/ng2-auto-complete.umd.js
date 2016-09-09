(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/forms"), require("@angular/platform-browser"), require("@angular/http"), require("rxjs/Rx"), require("rxjs/Subject"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/forms", "@angular/platform-browser", "@angular/http", "rxjs/Rx", "rxjs/Subject"], factory);
	else if(typeof exports === 'object')
		exports["ng2-auto-complete"] = factory(require("@angular/core"), require("@angular/forms"), require("@angular/platform-browser"), require("@angular/http"), require("rxjs/Rx"), require("rxjs/Subject"));
	else
		root["ng2-auto-complete"] = factory(root["@angular/core"], root["@angular/forms"], root["@angular/platform-browser"], root["@angular/http"], root["rxjs/Rx"], root["rxjs/Subject"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var forms_1 = __webpack_require__(2);
	var platform_browser_1 = __webpack_require__(3);
	var auto_complete_1 = __webpack_require__(4);
	exports.AutoComplete = auto_complete_1.AutoComplete;
	var auto_complete_component_1 = __webpack_require__(7);
	exports.AutoCompleteComponent = auto_complete_component_1.AutoCompleteComponent;
	var auto_complete_directive_1 = __webpack_require__(9);
	exports.AutoCompleteDirective = auto_complete_directive_1.AutoCompleteDirective;
	var Ng2AutoCompleteModule = (function () {
	    function Ng2AutoCompleteModule() {
	    }
	    Ng2AutoCompleteModule = __decorate([
	        core_1.NgModule({
	            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule],
	            declarations: [auto_complete_component_1.AutoCompleteComponent, auto_complete_directive_1.AutoCompleteDirective],
	            exports: [auto_complete_component_1.AutoCompleteComponent, auto_complete_directive_1.AutoCompleteDirective],
	            entryComponents: [auto_complete_component_1.AutoCompleteComponent],
	            providers: [auto_complete_1.AutoComplete]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Ng2AutoCompleteModule);
	    return Ng2AutoCompleteModule;
	}());
	exports.Ng2AutoCompleteModule = Ng2AutoCompleteModule;


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(5);
	__webpack_require__(6);
	/**
	 * provides auto-complete related utility functions
	 */
	var AutoComplete = (function () {
	    function AutoComplete(http) {
	        this.http = http;
	        // ...
	    }
	    AutoComplete.prototype.filter = function (list, keyword) {
	        return list.filter(function (el) {
	            return !!JSON.stringify(el).match(new RegExp(keyword, 'i'));
	        });
	    };
	    /**
	     * return remote data from the given source and options, and data path
	     */
	    AutoComplete.prototype.getRemoteData = function (options) {
	        var _this = this;
	        var keyValues = [];
	        var url = "";
	        for (var key in options) {
	            var regexp = new RegExp(':' + key, 'g');
	            url = this.source;
	            if (url.match(regexp)) {
	                url = url.replace(regexp, options[key]);
	            }
	            else {
	                keyValues.push(key + "=" + options[key]);
	            }
	        }
	        if (keyValues.length) {
	            var qs = keyValues.join("&");
	            url += url.match(/\?[a-z]/i) ? qs : ('?' + qs);
	        }
	        return this.http.get(url)
	            .map(function (resp) { return resp.json(); })
	            .map(function (resp) {
	            var list = resp.data || resp;
	            if (_this.pathToData) {
	                var paths = _this.pathToData.split('.');
	                paths.forEach(function (el) {
	                    list = list[el];
	                });
	            }
	            return list;
	        });
	    };
	    ;
	    AutoComplete = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [http_1.Http])
	    ], AutoComplete);
	    return AutoComplete;
	}());
	exports.AutoComplete = AutoComplete;


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var Subject_1 = __webpack_require__(8);
	var auto_complete_1 = __webpack_require__(4);
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
	                if (this.filteredList.length > 0) {
	                    this.selectOne(this.filteredList[this.itemIndex]);
	                }
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


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var auto_complete_component_1 = __webpack_require__(7);
	__webpack_require__(6);
	/**
	 * display auto-complete section with input and dropdown list when it is clicked
	 */
	var AutoCompleteDirective = (function () {
	    function AutoCompleteDirective(resolver, viewContainerRef) {
	        var _this = this;
	        this.resolver = resolver;
	        this.viewContainerRef = viewContainerRef;
	        this.ngModelChange = new core_1.EventEmitter();
	        this.valueChanged = new core_1.EventEmitter();
	        this.hideAutoCompleteDropdown = function (event) {
	            if (_this.componentRef) {
	                if (event && event.type === 'click' &&
	                    event.target !== _this.el &&
	                    event.target !== _this.acEl) {
	                    _this.componentRef.destroy();
	                    _this.componentRef = undefined;
	                }
	                else if (!event) {
	                    _this.componentRef.destroy();
	                    _this.componentRef = undefined;
	                }
	            }
	        };
	        this.styleAutoCompleteDropdown = function () {
	            var component = _this.componentRef.instance;
	            /* setting width/height auto complete */
	            var thisElBCR = _this.el.getBoundingClientRect();
	            _this.acEl.style.width = thisElBCR.width + 'px';
	            _this.acEl.style.position = 'absolute';
	            _this.acEl.style.zIndex = '1';
	            _this.acEl.style.top = '0';
	            _this.acEl.style.left = '0';
	            _this.acEl.style.display = 'inline-block';
	            component.inputEl.style.width = (thisElBCR.width - 30) + 'px';
	            component.inputEl.style.height = thisElBCR.height + 'px';
	            component.inputEl.focus();
	        };
	        this.selectNewValue = function (val) {
	            /* modify toString function of value if value is an object */
	            if (val && typeof val !== "string") {
	                var displayVal_1 = val[_this.displayPropertyName || 'value'];
	                val.toString = function () { return displayVal_1; };
	            }
	            /* emit ngModelChange and valueChanged */
	            if (val !== _this.ngModel) {
	                _this.ngModelChange.emit(val);
	                _this.valueChanged.emit(val);
	            }
	            /* hide dropdown */
	            _this.hideAutoCompleteDropdown();
	        };
	        this.el = this.viewContainerRef.element.nativeElement;
	    }
	    AutoCompleteDirective.prototype.ngOnInit = function () {
	        var divEl = document.createElement("div");
	        divEl.className = 'ng2-auto-complete';
	        divEl.style.display = 'inline-block';
	        divEl.style.position = 'relative';
	        this.el.parentElement.insertBefore(divEl, this.el.nextSibling);
	        divEl.appendChild(this.el);
	        this.selectNewValue(this.ngModel);
	    };
	    AutoCompleteDirective.prototype.ngOnDestroy = function () {
	        if (this.componentRef) {
	            this.componentRef.instance.valueSelected.unsubscribe();
	        }
	        document.removeEventListener('click', this.hideAutoCompleteDropdown);
	    };
	    //show auto-complete list below the current element
	    AutoCompleteDirective.prototype.showAutoCompleteDropdown = function () {
	        document.addEventListener('click', this.hideAutoCompleteDropdown);
	        this.hideAutoCompleteDropdown();
	        var factory = this.resolver.resolveComponentFactory(auto_complete_component_1.AutoCompleteComponent);
	        this.componentRef = this.viewContainerRef.createComponent(factory);
	        this.acEl = this.componentRef.location.nativeElement;
	        var component = this.componentRef.instance;
	        component.listFormatter = this.listFormatter;
	        //component.prefillFunc = this.prefillFunc;
	        component.pathToData = this.pathToData;
	        component.minChars = this.minChars;
	        component.valuePropertyName = this.valuePropertyName || 'id';
	        component.displayPropertyName = this.displayPropertyName || 'value';
	        component.source = this.source;
	        component.placeholder = this.placeholder;
	        component.valueSelected.subscribe(this.selectNewValue);
	        this.acEl.style.display = 'none';
	        setTimeout(this.styleAutoCompleteDropdown);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], AutoCompleteDirective.prototype, "placeholder", void 0);
	    __decorate([
	        core_1.Input('list-formatter'), 
	        __metadata('design:type', Function)
	    ], AutoCompleteDirective.prototype, "listFormatter", void 0);
	    __decorate([
	        core_1.Input('source'), 
	        __metadata('design:type', Object)
	    ], AutoCompleteDirective.prototype, "source", void 0);
	    __decorate([
	        core_1.Input('path-to-data'), 
	        __metadata('design:type', String)
	    ], AutoCompleteDirective.prototype, "pathToData", void 0);
	    __decorate([
	        core_1.Input('min-chars'), 
	        __metadata('design:type', Number)
	    ], AutoCompleteDirective.prototype, "minChars", void 0);
	    __decorate([
	        core_1.Input('value-property-name'), 
	        __metadata('design:type', String)
	    ], AutoCompleteDirective.prototype, "valuePropertyName", void 0);
	    __decorate([
	        core_1.Input('display-property-name'), 
	        __metadata('design:type', String)
	    ], AutoCompleteDirective.prototype, "displayPropertyName", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], AutoCompleteDirective.prototype, "ngModel", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], AutoCompleteDirective.prototype, "ngModelChange", void 0);
	    __decorate([
	        core_1.Output('value-changed'), 
	        __metadata('design:type', Object)
	    ], AutoCompleteDirective.prototype, "valueChanged", void 0);
	    AutoCompleteDirective = __decorate([
	        core_1.Directive({
	            selector: '[auto-complete], [ng2-auto-complete]',
	            host: {
	                '(click)': 'showAutoCompleteDropdown()'
	            }
	        }), 
	        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ViewContainerRef])
	    ], AutoCompleteDirective);
	    return AutoCompleteDirective;
	}());
	exports.AutoCompleteDirective = AutoCompleteDirective;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=ng2-auto-complete.umd.js.map