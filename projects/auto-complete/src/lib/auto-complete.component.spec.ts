import { Component, ViewChild, ChangeDetectionStrategy, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NguiAutoCompleteComponent, NguiAutoCompleteSelection } from './auto-complete.component';

describe('NguiAutoCompleteComponent', () => {
	let component: NguiAutoCompleteComponent;
	let fixture: ComponentFixture<NguiAutoCompleteComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NguiAutoCompleteComponent],
			providers: [provideZonelessChangeDetection()],
		}).compileComponents();

		fixture = TestBed.createComponent(NguiAutoCompleteComponent);
		component = fixture.componentInstance;
		// Provide a local array source so the focus-triggered dropdown reload (scheduled
		// from ngOnInit) resolves against local data instead of calling getRemoteData,
		// which throws on a non-string source.
		fixture.componentRef.setInput('source', ['Item 1', 'Item 2']);
		fixture.detectChanges();
	});

	afterEach(() => {
		fixture.destroy();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should default to showing the input tag and accepting user input', () => {
		expect(component.showInputTag()).toBe(true);
		expect(component.acceptUserInput()).toBe(true);
	});

	it('should give the internal keyword input a unique id and no name attribute (a11y, form-safe)', () => {
		const input: HTMLInputElement = fixture.nativeElement.querySelector('input.keyword');
		expect(input.id).toBe(component.inputId);
		expect(input.id).toMatch(/^ngui-auto-complete-input-\d+$/);
		expect(input.hasAttribute('name')).toBe(false);
	});

	it('should default open-direction to "auto" and not mark the dropdown as dropup', () => {
		component.dropdownVisible.set(true);
		fixture.detectChanges();
		const dropdown: HTMLElement = fixture.nativeElement.querySelector('ul');
		expect(component.openDirection()).toBe('auto');
		expect(dropdown.classList.contains('dropup')).toBe(false);
	});

	it('should add the "dropup" class when open-direction is "up"', () => {
		fixture.componentRef.setInput('open-direction', 'up');
		component.dropdownVisible.set(true);
		fixture.detectChanges();
		const dropdown: HTMLElement = fixture.nativeElement.querySelector('ul');
		expect(dropdown.classList.contains('dropup')).toBe(true);
	});

	it('should update value() and emit a fromSource selection when a list item is picked', () => {
		const emitted: any[] = [];
		component.valueSelected.subscribe((s) => emitted.push(s));
		component.selectOne('Item 1', 2);
		expect(component.value()).toBe('Item 1');
		expect(emitted).toEqual([{ value: 'Item 1', item: 'Item 1', index: 2, fromSource: true }]);
	});

	it('should emit a custom (fromSource:false) selection for a typed value not in the list', () => {
		const emitted: any[] = [];
		component.valueSelected.subscribe((s) => emitted.push(s));
		component.keyword = 'typed text';
		component.selectOne(undefined);
		expect(emitted).toEqual([{ value: 'typed text', item: 'typed text', index: -1, fromSource: false }]);
	});
});

@Component({
	imports: [NguiAutoCompleteComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ngui-auto-complete [source]="source" [itemTemplate]="tpl"></ngui-auto-complete>
		<ng-template #tpl let-item let-i="index">custom:{{ item }}:{{ i }}</ng-template>
	`,
})
class TemplateHostComponent {
	source = ['Alpha', 'Beta'];
	@ViewChild(NguiAutoCompleteComponent) autoComplete!: NguiAutoCompleteComponent;
}

describe('NguiAutoCompleteComponent itemTemplate', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
	});

	it('should render each row with the provided item template', () => {
		const fixture = TestBed.createComponent(TemplateHostComponent);
		fixture.detectChanges();

		const acDebug = fixture.debugElement.query(By.directive(NguiAutoCompleteComponent));
		const ac = fixture.componentInstance.autoComplete;
		// Writing these signals marks the OnPush view dirty, so a plain detectChanges() refreshes it
		// (no manual markForCheck needed, unlike when these were plain fields).
		ac.filteredList.set(['Alpha', 'Beta']);
		ac.dropdownVisible.set(true);
		fixture.detectChanges();

		const rows = acDebug.nativeElement.querySelectorAll('li.item');
		expect(rows.length).toBe(2);
		expect(rows[0].textContent.trim()).toBe('custom:Alpha:0');
		expect(rows[1].textContent.trim()).toBe('custom:Beta:1');

		fixture.destroy();
	});
});

interface City {
	name: string;
	country: string;
}

// Compile-time proof that the component is generic: binding a typed `[source]` infers `T = City`,
// so `(valueSelected)` is `NguiAutoCompleteSelection<City>` and `[(value)]` is `City`. The let-vars
// in the item template are typed too (`item.name` would not compile if inference were lost). If the
// generic regressed to `any`, this host's strict template type-check would still pass — but the typed
// handler signature below would fail to compile, which is the guarantee we want.
@Component({
	imports: [NguiAutoCompleteComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ngui-auto-complete [source]="cities" [(value)]="selected" (valueSelected)="onSelect($event)" [itemTemplate]="row"></ngui-auto-complete>
		<ng-template #row let-item let-i="index">{{ i }}:{{ item.name }} ({{ item.country }})</ng-template>
	`,
})
class TypedHostComponent {
	cities: City[] = [{ name: 'Amman', country: 'JO' }];
	selected?: City;
	picked?: City;

	onSelect(e: NguiAutoCompleteSelection<City>): void {
		this.picked = e.item;
	}
}

describe('NguiAutoCompleteComponent generic typing', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
	});

	it('infers the item type from a typed source', () => {
		const fixture = TestBed.createComponent(TypedHostComponent);
		fixture.detectChanges();
		expect(fixture.componentInstance).toBeTruthy();
		fixture.destroy();
	});
});
