"use strict";
var core_1 = require("@angular/core");
var ng2_auto_complete_component_1 = require("./ng2-auto-complete.component");
/**
 * display auto-complete section with input and dropdown list when it is clicked
 */
var Ng2AutoCompleteDirective = (function () {
    function Ng2AutoCompleteDirective(resolver, renderer, viewContainerRef) {
        var _this = this;
        this.resolver = resolver;
        this.renderer = renderer;
        this.viewContainerRef = viewContainerRef;
        this.loadingText = "Loading";
        this.ngModelChange = new core_1.EventEmitter();
        this.valueChanged = new core_1.EventEmitter();
        this.hideAutoCompleteDropdown = function (event) {
            if (_this.componentRef) {
                if (event && event.type === "click" &&
                    event.target.tagName !== "INPUT" && !_this.elementIn(event.target, _this.acDropdownEl)) {
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
            if (_this.componentRef) {
                var component = _this.componentRef.instance;
                /* setting width/height auto complete */
                var thisElBCR = _this.el.getBoundingClientRect();
                _this.acDropdownEl.style.width = thisElBCR.width + "px";
                _this.acDropdownEl.style.position = "absolute";
                _this.acDropdownEl.style.zIndex = "1";
                _this.acDropdownEl.style.top = "0";
                _this.acDropdownEl.style.left = "0";
                _this.acDropdownEl.style.display = "inline-block";
                var thisInputElBCR = _this.inputEl.getBoundingClientRect();
                // Not a good method of access the dom API directly.
                // Best to use Angular to access it for you and pass the values / methods you wish to get updated
                _this.renderer.setElementStyle(component.autoCompleteInput.nativeElement, 'width', thisInputElBCR.width + "px");
                _this.renderer.setElementStyle(component.autoCompleteInput.nativeElement, 'height', thisInputElBCR.height + "px");
                _this.renderer.invokeElementMethod(component.autoCompleteInput.nativeElement, 'focus');
                component.closeToBottom = (thisInputElBCR.bottom + 100 > window.innerHeight);
            }
        };
        this.componentInputChanged = function (val) {
            if (_this.acceptUserInput !== false) {
                _this.inputEl.value = val;
                (val !== _this.ngModel) && _this.ngModelChange.emit(val);
                _this.valueChanged.emit(val);
            }
        };
        this.selectNewValue = function (val) {
            if (val !== '') {
                val = _this.addToStringFunction(val);
            }
            (val !== _this.ngModel) && _this.ngModelChange.emit(val);
            _this.valueChanged.emit(val);
            _this.inputEl && (_this.inputEl.value = '' + val);
            _this.hideAutoCompleteDropdown();
        };
        this.el = this.viewContainerRef.element.nativeElement;
    }
    Ng2AutoCompleteDirective.prototype.ngOnInit = function () {
        // wrap this element with <div class="ng2-auto-complete">
        var divEl = document.createElement("div");
        divEl.className = "ng2-auto-complete";
        //divEl.style.display = "inline-block"; //this makes material design not compatible
        divEl.style.position = "relative";
        this.el.parentElement.insertBefore(divEl, this.el.nextSibling);
        divEl.appendChild(this.el);
        // apply toString() method for the object
        this.selectNewValue(this.ngModel);
        // when somewhere else clicked, hide this autocomplete
        document.addEventListener("click", this.hideAutoCompleteDropdown);
    };
    Ng2AutoCompleteDirective.prototype.ngOnDestroy = function () {
        if (this.componentRef) {
            this.componentRef.instance.valueSelected.unsubscribe();
            this.componentRef.instance.inputChanged.unsubscribe();
        }
        document.removeEventListener("click", this.hideAutoCompleteDropdown);
    };
    Ng2AutoCompleteDirective.prototype.ngOnChanges = function (changes) {
        if (changes['ngModel']) {
            this.ngModel = this.addToStringFunction(changes['ngModel'].currentValue);
        }
    };
    //show auto-complete list below the current element
    Ng2AutoCompleteDirective.prototype.showAutoCompleteDropdown = function () {
        this.hideAutoCompleteDropdown();
        var factory = this.resolver.resolveComponentFactory(ng2_auto_complete_component_1.Ng2AutoCompleteComponent);
        this.componentRef = this.viewContainerRef.createComponent(factory);
        var component = this.componentRef.instance;
        component.listFormatter = this.listFormatter;
        //component.prefillFunc = this.prefillFunc;
        component.pathToData = this.pathToData;
        component.minChars = this.minChars;
        component.valuePropertyName = this.valuePropertyName || "id";
        component.displayPropertyName = this.displayPropertyName || "value";
        component.source = this.source;
        component.placeholder = this.autoCompletePlaceholder;
        component.blankOptionText = this.blankOptionText;
        component.acceptUserInput = this.acceptUserInput;
        component.loadingText = this.loadingText;
        component.maxNumList = parseInt(this.maxNumList, 10);
        component.valueSelected.subscribe(this.selectNewValue);
        component.inputChanged.subscribe(this.componentInputChanged);
        this.acDropdownEl = this.componentRef.location.nativeElement;
        this.acDropdownEl.style.display = "none";
        // if this element is not an input tag, move dropdown after input tag
        // so that it displays correctly
        this.moveAutocompleteDropDownAfterInputEl();
        setTimeout(this.styleAutoCompleteDropdown);
    };
    Ng2AutoCompleteDirective.prototype.addToStringFunction = function (val) {
        if (val && typeof val === "object") {
            var displayVal_1 = val[this.displayPropertyName || "value"];
            val.toString = function () {
                return displayVal_1;
            };
        }
        return val;
    };
    Ng2AutoCompleteDirective.prototype.moveAutocompleteDropDownAfterInputEl = function () {
        this.inputEl = this.el;
        if (this.el.tagName !== "INPUT" && this.acDropdownEl) {
            this.inputEl = this.el.querySelector("input");
            this.inputEl.parentElement.insertBefore(this.acDropdownEl, this.inputEl.nextSibling);
        }
    };
    Ng2AutoCompleteDirective.prototype.elementIn = function (el, containerEl) {
        while (el = el.parentNode) {
            if (el === containerEl) {
                return true;
            }
        }
        return false;
    };
    Ng2AutoCompleteDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "[auto-complete], [ng2-auto-complete]",
                    host: {
                        "(click)": "showAutoCompleteDropdown()",
                        "(focus)": "showAutoCompleteDropdown()"
                    }
                },] },
    ];
    /** @nocollapse */
    Ng2AutoCompleteDirective.ctorParameters = [
        { type: core_1.ComponentFactoryResolver, },
        { type: core_1.Renderer, },
        { type: core_1.ViewContainerRef, },
    ];
    Ng2AutoCompleteDirective.propDecorators = {
        'autoCompletePlaceholder': [{ type: core_1.Input, args: ["auto-complete-placeholder",] },],
        'listFormatter': [{ type: core_1.Input, args: ["list-formatter",] },],
        'source': [{ type: core_1.Input, args: ["source",] },],
        'pathToData': [{ type: core_1.Input, args: ["path-to-data",] },],
        'minChars': [{ type: core_1.Input, args: ["min-chars",] },],
        'valuePropertyName': [{ type: core_1.Input, args: ["value-property-name",] },],
        'displayPropertyName': [{ type: core_1.Input, args: ["display-property-name",] },],
        'blankOptionText': [{ type: core_1.Input, args: ["blank-option-text",] },],
        'acceptUserInput': [{ type: core_1.Input, args: ["accept-user-input",] },],
        'loadingText': [{ type: core_1.Input, args: ["loading-text",] },],
        'maxNumList': [{ type: core_1.Input, args: ["max-num-list",] },],
        'ngModel': [{ type: core_1.Input },],
        'ngModelChange': [{ type: core_1.Output },],
        'valueChanged': [{ type: core_1.Output },],
    };
    return Ng2AutoCompleteDirective;
}());
exports.Ng2AutoCompleteDirective = Ng2AutoCompleteDirective;
//# sourceMappingURL=ng2-auto-complete.directive.js.map