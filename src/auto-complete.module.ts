import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NguiAutoCompleteComponent } from './auto-complete.component';
import { NguiAutoCompleteDirective } from './auto-complete.directive';
import { NguiAutoComplete } from './auto-complete';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NguiAutoCompleteComponent, NguiAutoCompleteDirective],
  exports:  [NguiAutoCompleteComponent, NguiAutoCompleteDirective],
  entryComponents: [NguiAutoCompleteComponent]
})
export class NguiAutoCompleteModule {
  static forRoot() {
    return {
      ngModule: NguiAutoCompleteModule,
      providers: [NguiAutoComplete]
    }
  }
}

