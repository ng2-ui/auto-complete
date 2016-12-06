// polyfills, comment the following out for debugging purpose
import 'hammerjs';
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';// the browser platform with a compiler

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }   from './app.component';
 
// noinspection TypeScriptCheckImport
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { MdInputModule } from '@angular2-material/input';

@NgModule({
  imports : [BrowserModule, HttpModule, FormsModule, MdInputModule, Ng2AutoCompleteModule],
  declarations : [AppComponent],
  bootstrap : [AppComponent]
})
export class AppModule { }

// compile and launch the module
platformBrowserDynamic().bootstrapModule(AppModule);