import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NguiAutoCompleteComponent } from './auto-complete.component';
import { NguiAutoCompleteDirective } from './auto-complete.directive';
import { NguiAutoCompleteService } from './auto-complete.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NguiAutoCompleteComponent,
        NguiAutoCompleteDirective
    ],
    providers: [],
    exports: [
        NguiAutoCompleteComponent,
        NguiAutoCompleteDirective
    ]
})
export class NguiAutoCompleteModule {
}
