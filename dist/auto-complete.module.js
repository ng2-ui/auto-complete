"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var auto_complete_component_1 = require("./auto-complete.component");
var auto_complete_directive_1 = require("./auto-complete.directive");
var auto_complete_1 = require("./auto-complete");
var NguiAutoCompleteModule = /** @class */ (function () {
    function NguiAutoCompleteModule() {
    }
    NguiAutoCompleteModule.forRoot = function () {
        return {
            ngModule: NguiAutoCompleteModule,
            providers: [auto_complete_1.NguiAutoComplete]
        };
    };
    NguiAutoCompleteModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, forms_1.FormsModule],
                    declarations: [auto_complete_component_1.NguiAutoCompleteComponent, auto_complete_directive_1.NguiAutoCompleteDirective],
                    exports: [auto_complete_component_1.NguiAutoCompleteComponent, auto_complete_directive_1.NguiAutoCompleteDirective],
                    entryComponents: [auto_complete_component_1.NguiAutoCompleteComponent]
                },] },
    ];
    return NguiAutoCompleteModule;
}());
exports.NguiAutoCompleteModule = NguiAutoCompleteModule;
//# sourceMappingURL=auto-complete.module.js.map