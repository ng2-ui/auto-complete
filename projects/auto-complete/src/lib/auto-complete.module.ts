import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NguiAutoCompleteComponent } from './auto-complete.component';

@NgModule({
  declarations: [
    NguiAutoCompleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [NguiAutoCompleteComponent]
})
export class NguiAutoCompleteModule { }
