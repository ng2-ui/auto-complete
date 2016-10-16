import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { Ng2AutoComplete } from "./ng2-auto-complete";
import { Ng2AutoCompleteComponent } from "./ng2-auto-complete.component";
import { Ng2AutoCompleteDirective } from "./ng2-auto-complete.directive";

export {
  Ng2AutoComplete,
  Ng2AutoCompleteComponent,
  Ng2AutoCompleteDirective
};

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [Ng2AutoCompleteComponent, Ng2AutoCompleteDirective],
  exports:  [Ng2AutoCompleteComponent, Ng2AutoCompleteDirective],
  entryComponents: [Ng2AutoCompleteComponent],
  providers: [ Ng2AutoComplete ]
})
export class Ng2AutoCompleteModule {}

