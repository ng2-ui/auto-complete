import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { NguiAutoCompleteService } from './auto-complete.service';

describe('NguiAutoCompleteService', () => {
	let service: NguiAutoCompleteService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideZonelessChangeDetection(), NguiAutoCompleteService],
		});
		service = TestBed.inject(NguiAutoCompleteService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should filter a string list by keyword (case-insensitive)', () => {
		const list = ['Apple', 'banana', 'Cherry'];
		expect(service.filter(list, 'an', false, false)).toEqual(['banana']);
		expect(service.filter(list, 'APP', false, false)).toEqual(['Apple']);
	});

	it('should match accents when accent-insensitive filtering is enabled', () => {
		const list = ['Cádiz', 'Munich'];
		expect(service.filter(list, 'cadiz', false, true)).toEqual(['Cádiz']);
	});

	it('should format an object list item using a string template', () => {
		// string templates are a documented runtime option even though the typed
		// field only declares the function form
		(service as { listFormatter: unknown }).listFormatter = '(id) value';
		expect(service.getFormattedListItem({ id: 1, value: 'Apple' })).toBe('(1) Apple');
	});
});
