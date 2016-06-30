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
    function AutoCompleteDirective(dcl, viewContainerRef) {
        this.dcl = dcl;
        this.viewContainerRef = viewContainerRef;
        this.ngModelChange = new core_1.EventEmitter();
        this.el = this.viewContainerRef.element.nativeElement;
    }
    AutoCompleteDirective.prototype.ngOnInit = function () {
        // ...
        var divEl = document.createElement("div");
        divEl.className = 'ng2-auto-complete';
        divEl.style.display = 'inline-block';
        divEl.style.position = 'relative';
        this.el.parentElement.insertBefore(divEl, this.el.nextSibling);
        divEl.appendChild(this.el);
    };
    //show auto-complete list below the current element
    AutoCompleteDirective.prototype.showAutoComplete = function () {
        var _this = this;
        this.hideAutoComplete().then(function () {
            _this.componentRef = _this.dcl.loadNextToLocation(auto_complete_component_1.AutoCompleteComponent, _this.viewContainerRef);
            _this.componentRef.then(function (componentRef) {
                _this.acEl = componentRef.location.nativeElement;
                var component = componentRef.instance;
                component.listFormatter = _this.listFormatter;
                //component.prefillFunc = this.prefillFunc;
                component.pathToData = _this.pathToData;
                component.minChars = _this.minChars;
                component.valuePropertyName = _this.valuePropertyName || 'id';
                component.displayPropertyName = _this.displayPropertyName || 'value';
                component.source = _this.source;
                component.placeholder = _this.placeholder;
                component.valueSelected.subscribe(function (val) {
                    if (typeof val !== "string") {
                        var displayVal_1 = val[component.displayPropertyName];
                        val.toString = function () { return displayVal_1; };
                    }
                    _this.ngModelChange.emit(val);
                    if (_this.valueChanged) {
                        _this.valueChanged(val);
                    }
                    _this.hideAutoComplete();
                });
                _this.acEl.style.display = 'none';
                setTimeout(function () {
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
                });
            });
        });
        document.addEventListener('click', function (event) {
            if (event.target !== _this.el && event.target !== _this.acEl) {
                _this.hideAutoComplete();
            }
        });
    };
    AutoCompleteDirective.prototype.hideAutoComplete = function () {
        if (this.componentRef) {
            return this.componentRef.then(function (componentRef) { return componentRef.destroy(); });
        }
        else {
            return Promise.resolve(true);
        }
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
        core_1.Input('value-changed'), 
        __metadata('design:type', Function)
    ], AutoCompleteDirective.prototype, "valueChanged", void 0);
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
    AutoCompleteDirective = __decorate([
        core_1.Directive({
            selector: '[auto-complete], [ng2-auto-complete]',
            host: {
                '(click)': 'showAutoComplete()'
            }
        }), 
        __metadata('design:paramtypes', [core_1.DynamicComponentLoader, core_1.ViewContainerRef])
    ], AutoCompleteDirective);
    return AutoCompleteDirective;
}());
exports.AutoCompleteDirective = AutoCompleteDirective;
//# sourceMappingURL=auto-complete.directive.js.map