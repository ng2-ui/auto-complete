import { Component, ViewEncapsulation, inject } from '@angular/core';
import { AppService } from '../app.service';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { NguiAutoCompleteDirective } from 'auto-complete';
import { FormsModule } from '@angular/forms';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { JsonPipe } from '@angular/common';

@Component({
	selector: 'app-directive-test',
	templateUrl: './directive-test.component.html',
	styleUrls: ['./directive-test.component.scss'],
	encapsulation: ViewEncapsulation.None,
	imports: [
		MatCard,
		MatCardHeader,
		MatCardTitle,
		MatCardSubtitle,
		MatCardContent,
		NguiAutoCompleteDirective,
		FormsModule,
		MatExpansionPanel,
		MatExpansionPanelHeader,
		MatExpansionPanelTitle,
		MatFormField,
		MatIcon,
		MatPrefix,
		MatInput,
		MatSuffix,
		MatButton,
		JsonPipe,
	],
})
export class DirectiveTestComponent {
	appSvc = inject(AppService);

	public arrayOfNumbers: number[] = [100, 200, 300, 400, 500];
	public arrayOfStrings: string[] = ['this', 'is', 'array', 'of', 'text', 'with', 'long', 'and long', 'and long', 'list'];
	public arrayOfAccentedStrings: string[] = ['Cádiz', 'München'];
	public arrayOfArabicStrings: string[] = [
		'الرياض',
		'مكة المكرمة',
		'المدينة المنورة',
		'جدة',
		'الدمام',
		'القاهرة',
		'دبي',
		'أبوظبي',
		'الكويت',
		'بيروت',
		'عمان',
		'بغداد',
	];

	public arrayOfKeyValues: any[] = [
		{ id: 1, value: 'One' },
		{ id: 2, value: 'Two' },
		{ id: 3, value: 'Three' },
		{
			id: 4,
			value: 'Four',
		},
	];

	public arrayOfKeyValues2: any[] = [
		{ id: 11, key: 1, name: 'Key One' },
		{ id: 12, key: 2, name: 'Key Two' },
		{
			id: 13,
			key: 3,
			name: 'Key Three',
		},
		{ id: 14, key: 4, name: 'Key Four' },
	];

	public arrayOfCities: any[] = [
		{ city: 'New York', state: 'New York', nickname: 'The Big Apple', population: '8,537,673' },
		{ city: 'Los Angeles', state: 'California', nickname: 'City of Angels', population: '3,976,322' },
		{ city: 'Chicago', state: 'Illinois', nickname: 'The Windy City', population: '2,704,958' },
		{ city: 'Houston', state: 'Texas', nickname: 'Space City', population: '2,303,482' },
		{ city: 'Phoenix', state: 'Arizona', nickname: 'Valley of the Sun', population: '1,615,017' },
		{ city: 'Philadelphia', state: 'Pennsylvania', nickname: 'City of Brotherly Love', population: '1,567,872' },
		{ city: 'San Antonio', state: 'Texas', nickname: 'Alamo City', population: '1,492,510' },
		{ city: 'San Diego', state: 'California', nickname: "America's Finest City", population: '1,406,630' },
		{ city: 'Dallas', state: 'Texas', nickname: 'The Big D', population: '1,317,929' },
		{ city: 'San Jose', state: 'California', nickname: 'Capital of Silicon Valley', population: '1,025,350' },
	];

	// Models, named after what each example binds.
	public word = 'is'; // basic string list (cards 1 & 2)
	public idValue = { id: 1, value: 'One' }; // id/value objects
	public keyName = { key: 3, name: 'Key Three' }; // key/name objects
	public place; // remote address (HTTP source)
	public book; // remote book (Observable source)
	public amount; // Angular Material integration
	public autoSelectWord = ''; // auto-select-first-item
	public rtlCity = ''; // RTL
	public city = ''; // grid-style cities
	public accentWord = ''; // accent-sensitive matching
	public tag = ''; // (noMatchFound) "add new"
	public strictWord = ''; // suppress "no result found"
	public directionWord = ''; // open-direction

	public noMatchVisible = false;
	public openDir = 'auto';

	// Bound to the live "accept-user-input" toggles in two of the cards.
	public tagAcceptInput = true;
	public strictAcceptInput = false;

	template1 = `
  <div ngui-auto-complete
       [source]="arrayOfStrings"
       [accept-user-input]="true"
       [auto-select-first-item]="false"
       [select-on-blur]="true"
       [(ngModel)]="word"
       (valueSelected)="onSelection($event)">
    <input autofocus placeholder="enter text" />
  </div>
  `;

	template2 = `
  <div ngui-auto-complete
       [source]="arrayOfStrings"
       [accept-user-input]="true"
       [open-on-focus]="false"
       [auto-select-first-item]="false"
       [select-on-blur]="true"
       [(ngModel)]="word"
       (valueSelected)="onSelection($event)">
    <input autofocus placeholder="enter text" />
  </div>
  `;

	template3 = `
  <input
    ngui-auto-complete
    blank-option-text="Select One"
    [(ngModel)]="idValue"
    [source]="arrayOfKeyValues"
    placeholder="enter text"
    z-index="4"/>
  <a href="javascript:void(0)" (click)="idValue={id:100, value: 'it'}">Change It</a>
  `;

	template4 = `
  <input ngui-auto-complete [source]="arrayOfKeyValues2"
         [(ngModel)]="keyName"
         placeholder="enter text"
         [display-with]="formatKeyName"
         list-formatter="(key) name"
         [match-formatted]="true" />
  `;

	template5 = `
  <input ngui-auto-complete
         [(ngModel)]="place"
         placeholder="Enter a place name (min. 2 chars)"
         [source]="appSvc.getAddressUrl()"
         no-match-found-text="No Match Found"
         list-formatter="display_name"
         display-with="display_name"
         loading-text="Searching..."
         max-num-list="5"
         min-chars="2" />
  `;

	template6 = `
  <input ngui-auto-complete
         placeholder="Search for a book (min. 2 chars)"
         [(ngModel)]="book"
         [source]="appSvc.findBooks"
         path-to-data="docs"
         [list-formatter]="renderBook"
         display-with="title"
         min-chars="2" />
  `;

	template7 = `
  <mat-form-field>
      <span matPrefix>$&nbsp;</span>
      <input matInput ngui-auto-complete
             [(ngModel)]="amount"
             [source]="arrayOfNumbers"
             [list-formatter]="rightAligned"
             placeholder="amount"/>
      <span matSuffix>.00</span>
   </mat-form-field>
  `;

	template8 = `
  <div ngui-auto-complete
       [source]="arrayOfStrings"
       [auto-select-first-item]="true"
       [(ngModel)]="autoSelectWord"
       (valueSelected)="onSelection($event)">
    <input placeholder="enter text"/>
  </div>
  `;

	template9 = `
  <!-- dropdown follows the ancestor dir="rtl" automatically -->
  <div ngui-auto-complete
        [source]="arrayOfArabicStrings"
        [accept-user-input]="false"
        [(ngModel)]="rtlCity"
        (valueSelected)="onSelection($event)">
        <input autofocus placeholder="ابحث عن مدينة..." />
      </div>
  `;

	template10 = `
  <input ngui-auto-complete
         [(ngModel)]="city"
         [source]="arrayOfCities"
         [accept-user-input]="false"
         [list-formatter]="renderCity"
         display-with="city"
         [headerTemplate]="cityHeaderTpl"
         placeholder="Search for a city" />
  <ng-template #cityHeaderTpl>
    <div class="header-row">…</div>
  </ng-template>
  `;

	template11 = `
    <div ngui-auto-complete
       [ignore-accents]="false"
       [source]="arrayOfAccentedStrings"
       [accept-user-input]="false"
       [auto-select-first-item]="false"
       [select-on-blur]="true"
       [(ngModel)]="accentWord"
       (valueSelected)="onSelection($event)">
        <input autofocus placeholder="try: Cad or Mun" />
    </div>
  `;

	template11b = `
  <label><input type="checkbox" [(ngModel)]="acceptInput" /> accept-user-input</label>
  <input #tagInput ngui-auto-complete
         [(ngModel)]="tag"
         [source]="arrayOfStrings"
         [accept-user-input]="acceptInput"
         no-match-found-text=""
         (noMatchFound)="noMatchVisible = true"
         (input)="noMatchVisible = false"
         (valueSelected)="noMatchVisible = false"
         placeholder="type something not in the list" />
  @if (noMatchVisible) {
    <button mat-button color="primary" (click)="addToTag(tagInput.value)">
      Add "{{ tagInput.value }}"
    </button>
  }
  `;

	template12 = `
  <label><input type="checkbox" [(ngModel)]="acceptInput" /> accept-user-input</label>
  <input ngui-auto-complete
         [(ngModel)]="strictWord"
         [source]="arrayOfStrings"
         [accept-user-input]="acceptInput"
         no-match-found-text=""
         placeholder="type something not in the list" />
  `;

	template13 = `
  <label>direction:
    <select [(ngModel)]="openDir">
      <option value="auto">auto</option>
      <option value="up">up</option>
      <option value="down">down</option>
    </select>
  </label>

  <div ngui-auto-complete
       [source]="arrayOfStrings"
       [open-direction]="openDir"
       [accept-user-input]="true"
       [select-on-blur]="true"
       [(ngModel)]="directionWord"
       (valueSelected)="onSelection($event)">
    <input placeholder="opens {{ openDir }}" />
  </div>
  `;

	public addToTag(value: string) {
		if (value && !this.arrayOfStrings.includes(value)) {
			this.arrayOfStrings = [...this.arrayOfStrings, value];
		}
		this.noMatchVisible = false;
	}

	public onSelection(selection: any) {
		console.log('selected', selection);
	}

	public formatKeyName = (item: any): string => `(${item.key}) ${item.name}`;

	public renderBook(data: any): string {
		const author = data.author_name?.length ? data.author_name[0] : 'Unknown author';
		return `<b style="display:block">${data.title}</b>
            <small style="color:#888">${author}</small>`;
	}

	public renderCity(data: any): string {
		const html = `
          <div class="data-row">
            <div class="col-2">${data.city}</div>
            <div class="col-1">${data.state}</div>
            <div class="col-2">${data.nickname}</div>
            <div class="col-1">${data.population}</div>
          </div>`;

		return html;
	}

	public rightAligned(data: any): string {
		return `<div style="text-align:right">${data}.00</div>`;
	}

	public json(obj) {
		return JSON.stringify(obj, null, '  ');
	}
}
