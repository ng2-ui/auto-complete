import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { NguiAutoCompleteModule } from 'auto-complete';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentTestComponent } from './component-test/component-test.component';
import { DirectiveTestComponent } from './directive-test/directive-test.component';
import { AppService } from './app.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    ComponentTestComponent,
    DirectiveTestComponent
  ],
  bootstrap: [AppComponent], imports: [BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NguiAutoCompleteModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    MatTabsModule,
    MatFormFieldModule,
    MatIconModule], providers: [
    AppService,
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule {
}
