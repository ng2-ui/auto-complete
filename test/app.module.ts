import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from "@angular/forms";
import { HTTP_PROVIDERS } from "@angular/http";

import { AppComponent }   from './app.component';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

@NgModule({
  imports: [BrowserModule, FormsModule, Ng2AutoCompleteModule],
  declarations: [AppComponent],
  providers: [HTTP_PROVIDERS],
  bootstrap: [ AppComponent ]
})
export class AppModule { }