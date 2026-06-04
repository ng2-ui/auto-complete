import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { AppService } from './app.service';

describe('AppService', () => {
	let service: AppService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [AppService, provideHttpClient(), provideHttpClientTesting()],
		});
		service = TestBed.inject(AppService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
