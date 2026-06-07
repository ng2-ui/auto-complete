import { enableProdMode, provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';

import { environment } from './environments/environment';
import { AppService } from './app/app.service';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [
		provideZonelessChangeDetection(),
		provideRouter(routes, withHashLocation()),
		provideHttpClient(withXhr(), withInterceptorsFromDi()),
		provideAnimations(),
		AppService,
	],
}).catch((err) => console.error(err));
