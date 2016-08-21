import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule  } from '@angular/platform-browser';

import { AutoComplete } from './auto-complete';
import { AutoCompleteComponent } from './auto-complete.component';
import { AutoCompleteDirective } from './auto-complete.directive';

var directives =
@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [AutoCompleteComponent, AutoCompleteDirective],
  exports:  [AutoCompleteComponent, AutoCompleteDirective],
  providers: [ AutoComplete ]
})
export class Ng2AutoCompleteModule {}

