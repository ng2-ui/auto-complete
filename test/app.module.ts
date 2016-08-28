import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent }   from './app.component';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

@NgModule({
  imports: [BrowserModule, HttpModule, FormsModule, Ng2AutoCompleteModule],
  declarations: [AppComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }