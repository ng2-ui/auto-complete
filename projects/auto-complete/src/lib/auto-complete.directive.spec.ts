import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NguiAutoCompleteDirective } from './auto-complete.directive';

@Component({
	imports: [NguiAutoCompleteDirective, FormsModule],
	changeDetection: ChangeDetectionStrategy.Eager,
	template: `<input ngui-auto-complete [(ngModel)]="value" [source]="source" />`,
})
class HostComponent {
	value = 'init';
	source = ['Alpha', 'Beta'];
}

describe('NguiAutoCompleteDirective (ControlValueAccessor)', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
	});

	it('writes the bound value into the input (writeValue)', fakeAsync(() => {
		const fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
		tick(); // ngModel writes the value asynchronously
		fixture.detectChanges();

		const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
		expect(input.value).toBe('init');
		fixture.destroy();
	}));

	it('propagates a selected value back to the bound model (onChange)', fakeAsync(() => {
		const fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
		tick();

		const directive = fixture.debugElement.query(By.directive(NguiAutoCompleteDirective)).injector.get(NguiAutoCompleteDirective);
		directive.selectNewValue('Beta');
		tick();
		fixture.detectChanges();

		expect(fixture.componentInstance.value).toBe('Beta');
		fixture.destroy();
	}));

	it('opens the dropdown in a CDK overlay on focus and removes it on hide', fakeAsync(() => {
		const fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
		tick();

		const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
		input.dispatchEvent(new Event('focus'));
		tick();

		expect(document.querySelector('.cdk-overlay-pane ngui-auto-complete')).toBeTruthy();

		const directive = fixture.debugElement.query(By.directive(NguiAutoCompleteDirective)).injector.get(NguiAutoCompleteDirective);
		directive.hideAutoCompleteDropdown();
		tick(100); // dropdownJustHidden reset timer

		expect(document.querySelector('.cdk-overlay-pane ngui-auto-complete')).toBeFalsy();
		fixture.destroy();
	}));
});
