import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Ng2AutoCompleteComponent } from './ng2-auto-complete.component';
import { Ng2AutoCompleteDirective } from './ng2-auto-complete.directive';
import { Ng2AutoComplete } from './ng2-auto-complete';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [Ng2AutoCompleteComponent, Ng2AutoCompleteDirective],
  exports:  [Ng2AutoCompleteComponent, Ng2AutoCompleteDirective],
  entryComponents: [Ng2AutoCompleteComponent]
})
export class Ng2AutoCompleteModule {
  static forRoot() {
    return {
      ngModule: Ng2AutoCompleteModule,
      providers: [Ng2AutoComplete]
    }
  }
}

