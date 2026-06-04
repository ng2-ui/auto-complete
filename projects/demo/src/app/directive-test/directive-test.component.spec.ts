import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { DirectiveTestComponent } from './directive-test.component';
import { AppService } from '../app.service';

describe('DirectiveTestComponent', () => {
	let component: DirectiveTestComponent;
	let fixture: ComponentFixture<DirectiveTestComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [FormsModule, DirectiveTestComponent],
			providers: [AppService, provideHttpClient(), provideHttpClientTesting()],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DirectiveTestComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
