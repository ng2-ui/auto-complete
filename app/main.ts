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
import { Ng2UtilsModule } from 'ng2-utils';
import { MdInputModule } from '@angular2-material/input';
import { LocationStrategy, HashLocationStrategy } from "@angular/common";

import { AppComponent }   from './app.component';
// noinspection TypeScriptCheckImport
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { APP_ROUTER_PROVIDERS, APP_ROUTER_COMPONENTS } from './app.route';

@NgModule({
  imports : [
    BrowserModule,
    APP_ROUTER_PROVIDERS,
    HttpModule,
    FormsModule,
    Ng2UtilsModule,
    MdInputModule,
    Ng2AutoCompleteModule
  ],
  declarations : [AppComponent, APP_ROUTER_COMPONENTS],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap : [AppComponent]
})
export class AppModule { }

// compile and launch the module
platformBrowserDynamic().bootstrapModule(AppModule);

