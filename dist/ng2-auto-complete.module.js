"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var ng2_auto_complete_component_1 = require('./ng2-auto-complete.component');
var ng2_auto_complete_directive_1 = require('./ng2-auto-complete.directive');
var ng2_auto_complete_1 = require('./ng2-auto-complete');
var Ng2AutoCompleteModule = (function () {
    function Ng2AutoCompleteModule() {
    }
    Ng2AutoCompleteModule.forRoot = function () {
        return {
            ngModule: Ng2AutoCompleteModule,
            providers: [ng2_auto_complete_1.Ng2AutoComplete]
        };
    };
    Ng2AutoCompleteModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, forms_1.FormsModule],
                    declarations: [ng2_auto_complete_component_1.Ng2AutoCompleteComponent, ng2_auto_complete_directive_1.Ng2AutoCompleteDirective],
                    exports: [ng2_auto_complete_component_1.Ng2AutoCompleteComponent, ng2_auto_complete_directive_1.Ng2AutoCompleteDirective],
                    entryComponents: [ng2_auto_complete_component_1.Ng2AutoCompleteComponent]
                },] },
    ];
    /** @nocollapse */
    Ng2AutoCompleteModule.ctorParameters = [];
    return Ng2AutoCompleteModule;
}());
exports.Ng2AutoCompleteModule = Ng2AutoCompleteModule;
//# sourceMappingURL=ng2-auto-complete.module.js.map