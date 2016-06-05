// The usual bootstrapping imports
import { bootstrap }      from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent }   from './app.component.ts';

bootstrap(AppComponent, [ HTTP_PROVIDERS ]);
