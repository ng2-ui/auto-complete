import { Component, ChangeDetectionStrategy, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NguiAutoCompleteDirective } from './auto-complete.directive';

// Resolve after `ms` real milliseconds (also flushing the microtask queue). Replaces the
// fakeAsync/tick pairing now that the suite runs zoneless and without zone.js/testing.
const wait = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

@Component({
	imports: [NguiAutoCompleteDirective, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `<input ngui-auto-complete [(ngModel)]="value" [source]="source" />`,
})
class HostComponent {
	value = 'init';
	source = ['Alpha', 'Beta'];
}

describe('NguiAutoCompleteDirective (ControlValueAccessor)', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HostComponent],
			providers: [provideZonelessChangeDetection()],
		}).compileComponents();
	});

	it('writes the bound value into the input (writeValue)', async () => {
		const fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
		await wait(); // ngModel writes the value asynchronously
		fixture.detectChanges();

		const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
		expect(input.value).toBe('init');
		fixture.destroy();
	});

	it('propagates a selected value back to the bound model (onChange)', async () => {
		const fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
		await wait();

		const directive = fixture.debugElement.query(By.directive(NguiAutoCompleteDirective)).injector.get(NguiAutoCompleteDirective);
		directive.selectNewValue('Beta');
		await wait();
		fixture.detectChanges();

		expect(fixture.componentInstance.value).toBe('Beta');
		fixture.destroy();
	});

	it('opens the dropdown in a CDK overlay on focus and removes it on hide', async () => {
		const fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
		await wait();

		const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
		input.dispatchEvent(new Event('focus'));
		await wait();

		expect(document.querySelector('.cdk-overlay-pane ngui-auto-complete')).toBeTruthy();

		const directive = fixture.debugElement.query(By.directive(NguiAutoCompleteDirective)).injector.get(NguiAutoCompleteDirective);
		directive.hideAutoCompleteDropdown();

		expect(document.querySelector('.cdk-overlay-pane ngui-auto-complete')).toBeFalsy();
		await wait(120); // let the dropdownJustHidden reset timer fire before teardown
		fixture.destroy();
	});
});
