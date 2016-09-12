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
var auto_complete_component_1 = require("./auto-complete.component");
require("rxjs/Rx");
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
                    event.target.tagName !== 'INPUT' &&
                    !_this.elementIn(event.target, _this.acDropdownEl)) {
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
            _this.acDropdownEl.style.width = thisElBCR.width + 'px';
            _this.acDropdownEl.style.position = 'absolute';
            _this.acDropdownEl.style.zIndex = '1';
            _this.acDropdownEl.style.top = '0';
            _this.acDropdownEl.style.left = '0';
            _this.acDropdownEl.style.display = 'inline-block';
            var thisInputElBCR = _this.inputEl.getBoundingClientRect();
            component.inputEl.style.width = (thisInputElBCR.width - 30) + 'px';
            component.inputEl.style.height = thisInputElBCR.height + 'px';
            component.inputEl.focus();
        };
        this.selectNewValue = function (val) {
            /* modify toString function of value if value is an object */
            if (val && typeof val === "object") {
                var displayVal_1 = val[_this.displayPropertyName || 'value'];
                val.toString = function () { return displayVal_1; };
            }
            /* emit ngModelChange and valueChanged */
            if (_this.ngModel && val !== _this.ngModel) {
                _this.ngModelChange.emit(val);
            }
            if (val) {
                _this.valueChanged.emit(val);
            }
            /* hide dropdown */
            _this.hideAutoCompleteDropdown();
        };
        this.el = this.viewContainerRef.element.nativeElement;
    }
    AutoCompleteDirective.prototype.ngOnInit = function () {
        // wrap this element with <div class="ng2-auto-complete">
        var divEl = document.createElement("div");
        divEl.className = 'ng2-auto-complete';
        divEl.style.display = 'inline-block';
        divEl.style.position = 'relative';
        this.el.parentElement.insertBefore(divEl, this.el.nextSibling);
        divEl.appendChild(this.el);
        // apply toString() method for the object
        this.selectNewValue(this.ngModel);
        // when somewhere else clicked, hide this autocomplete
        document.addEventListener('click', this.hideAutoCompleteDropdown);
    };
    AutoCompleteDirective.prototype.ngOnDestroy = function () {
        if (this.componentRef) {
            this.componentRef.instance.valueSelected.unsubscribe();
        }
        document.removeEventListener('click', this.hideAutoCompleteDropdown);
    };
    //show auto-complete list below the current element
    AutoCompleteDirective.prototype.showAutoCompleteDropdown = function () {
        this.hideAutoCompleteDropdown();
        var factory = this.resolver.resolveComponentFactory(auto_complete_component_1.AutoCompleteComponent);
        this.componentRef = this.viewContainerRef.createComponent(factory);
        this.acDropdownEl = this.componentRef.location.nativeElement;
        var component = this.componentRef.instance;
        component.listFormatter = this.listFormatter;
        //component.prefillFunc = this.prefillFunc;
        component.pathToData = this.pathToData;
        component.minChars = this.minChars;
        component.valuePropertyName = this.valuePropertyName || 'id';
        component.displayPropertyName = this.displayPropertyName || 'value';
        component.source = this.source;
        component.placeholder = this.autoCompletePlaceholder;
        component.valueSelected.subscribe(this.selectNewValue);
        this.acDropdownEl.style.display = 'none';
        //if this element is not an input tag, move dropdown after input tag
        //so that it displays correctly
        this.moveAutocompleteDropDownAfterInputEl();
        setTimeout(this.styleAutoCompleteDropdown);
    };
    AutoCompleteDirective.prototype.moveAutocompleteDropDownAfterInputEl = function () {
        this.inputEl = this.el;
        if (this.el.tagName !== "INPUT" && this.acDropdownEl) {
            this.inputEl = this.el.querySelector('input');
            this.inputEl.parentElement.insertBefore(this.acDropdownEl, this.inputEl.nextSibling);
        }
    };
    AutoCompleteDirective.prototype.elementIn = function (el, containerEl) {
        while (el = el.parentNode) {
            if (el === containerEl)
                return true;
        }
        return false;
    };
    __decorate([
        core_1.Input('auto-complete-placeholder'), 
        __metadata('design:type', String)
    ], AutoCompleteDirective.prototype, "autoCompletePlaceholder", void 0);
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
//# sourceMappingURL=auto-complete.directive.js.map