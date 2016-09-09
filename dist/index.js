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
var forms_1 = require("@angular/forms");
var platform_browser_1 = require('@angular/platform-browser');
var auto_complete_1 = require('./auto-complete');
exports.AutoComplete = auto_complete_1.AutoComplete;
var auto_complete_component_1 = require('./auto-complete.component');
exports.AutoCompleteComponent = auto_complete_component_1.AutoCompleteComponent;
var auto_complete_directive_1 = require('./auto-complete.directive');
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
//# sourceMappingURL=index.js.map