import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, provideZonelessChangeDetection } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { DirectiveTestComponent } from './directive-test.component';
import { AppService } from '../app.service';

describe('DirectiveTestComponent', () => {
	let component: DirectiveTestComponent;
	let fixture: ComponentFixture<DirectiveTestComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FormsModule, DirectiveTestComponent],
			providers: [provideZonelessChangeDetection(), AppService, provideHttpClient(withXhr()), provideHttpClientTesting()],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DirectiveTestComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
