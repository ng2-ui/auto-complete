import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { AutoComplete } from "./auto-complete";
import { AutoCompleteComponent } from "./auto-complete.component";
import { AutoCompleteDirective } from "./auto-complete.directive";

export {
  AutoComplete,
  AutoCompleteComponent,
  AutoCompleteDirective
};

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [AutoCompleteComponent, AutoCompleteDirective],
  exports:  [AutoCompleteComponent, AutoCompleteDirective],
  entryComponents: [AutoCompleteComponent],
  providers: [ AutoComplete ]
})
export class Ng2AutoCompleteModule {}

