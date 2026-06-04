import { Component, ViewEncapsulation, inject } from '@angular/core';
import { AppService } from '../app.service';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { NguiAutoCompleteModule } from 'auto-complete';
import { FormsModule } from '@angular/forms';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Dir } from '@angular/cdk/bidi';
import { MatButton } from '@angular/material/button';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-directive-test',
    templateUrl: './directive-test.component.html',
    styleUrls: ['./directive-test.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, NguiAutoCompleteModule, FormsModule, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatFormField, MatIcon, MatPrefix, MatInput, MatSuffix, Dir, MatButton, JsonPipe]
})
export class DirectiveTestComponent {
  appSvc = inject(AppService);

  public loadingTemplate = `<h1>Loading</h1>`;
  public cityHeaderTemplate = `
      <div class="header-row">
        <div class="col-2">City</div>
        <div class="col-1">State</div>
        <div class="col-2">Nickname</div>
        <div class="col-1">Population</div>
      </div>`;
  public arrayOfNumbers: number[] = [100, 200, 300, 400, 500];
  public arrayOfStrings: string[] = ['this', 'is', 'array', 'of', 'text', 'with', 'long', 'and long', 'and long', 'list'];
  public arrayOfAccentedStrings: string[] = ['Cádiz', 'München'];
  public arrayOfArabicStrings: string[] = ['الرياض', 'مكة المكرمة', 'المدينة المنورة', 'جدة', 'الدمام', 'القاهرة', 'دبي', 'أبوظبي', 'الكويت', 'بيروت', 'عمان', 'بغداد'];

  public arrayOfKeyValues: any[] =
    [{id: 1, value: 'One'}, {id: 2, value: 'Two'}, {id: 3, value: 'Three'}, {
      id: 4,
      value: 'Four'
    }];

  public arrayOfKeyValues2: any[] =
    [{id: 11, key: 1, name: 'Key One'}, {id: 12, key: 2, name: 'Key Two'}, {
      id: 13,
      key: 3,
      name: 'Key Three'
    }, {id: 14, key: 4, name: 'Key Four'}];

  public arrayOfCities: any[] =
    [{city: 'New York', state: 'New York', nickname: 'The Big Apple', population: '8,537,673'},
      {city: 'Los Angeles', state: 'California', nickname: 'City of Angels', population: '3,976,322'},
      {city: 'Chicago', state: 'Illinois', nickname: 'The Windy City', population: '2,704,958'},
      {city: 'Houston', state: 'Texas', nickname: 'Space City', population: '2,303,482'},
      {city: 'Phoenix', state: 'Arizona', nickname: 'Valley of the Sun', population: '1,615,017'},
      {city: 'Philadelphia', state: 'Pennsylvania', nickname: 'City of Brotherly Love', population: '1,567,872'},
      {city: 'San Antonio', state: 'Texas', nickname: 'Alamo City', population: '1,492,510'},
      {city: 'San Diego', state: 'California', nickname: 'America\'s Finest City', population: '1,406,630'},
      {city: 'Dallas', state: 'Texas', nickname: 'The Big D', population: '1,317,929'},
      {city: 'San Jose', state: 'California', nickname: 'Capital of Silicon Valley', population: '1,025,350'}];

  public model1 = 'is';
  public model2 = {id: 1, value: 'One'};
  public model3 = {key: 3, name: 'Key Three'};
  public model4;
  public model5;
  public model7 = '';
  public model8 = '';
  public model9 = '';
  public model10 = '';
  public model11 = '';
  public model12 = '';
  public model13 = '';
  public noMatchVisible11 = false;
  public myModel;

  public openDir = 'auto';
  public directionOptions = ['auto', 'up', 'down'];

  template1 = `
  <div ngui-auto-complete
       [source]="arrayOfStrings"
       [accept-user-input]="true"
       [auto-select-first-item]="false"
       [select-on-blur]="true"
       (ngModelChange)="myCallback1($event)"
       (customSelected)="customCallback($event)"
       placeholder="enter text">
    <input id="model1" [ngModel]="model1" autofocus />
  </div>
  `;

  template2 = `
  <div ngui-auto-complete
       [source]="arrayOfStrings"
       [accept-user-input]="true"
       [open-on-focus]="false"
       [auto-select-first-item]="false"
       [select-on-blur]="true"
       (ngModelChange)="myCallback1($event)"
       (customSelected)="customCallback($event)"
       placeholder="enter text">
    <input id="model1-1" [ngModel]="model1" autofocus />
  </div>
  `;

  template3 = `
  <input
    id="model2"
    ngui-auto-complete
    blank-option-text="Select One"
    [(ngModel)]="model2"
    [source]="arrayOfKeyValues"
    placeholder="enter text"
    z-index="4"/>
  <a href="javascript:void(0)" (click)="model2={id:'change', value: 'it'}">Change It</a>
  `;

  template4 = `
  <input ngui-auto-complete [source]="arrayOfKeyValues2"
         id="model3"
         [(ngModel)]="model3"
         placeholder="enter text"
         value-formatter="(key) name"
         list-formatter="(key) name"
         [match-formatted]="true" />
  `;

  template5 = `
  <input ngui-auto-complete
         id="model4"
         [(ngModel)]="model4"
         placeholder="Enter a place name (min. 2 chars)"
         [source]="appSvc.getAddressUrl()"
         no-match-found-text="No Match Found"
         list-formatter="display_name"
         display-property-name="display_name"
         loading-text="Searching..."
         max-num-list="5"
         min-chars="2" />
  `;

  template6 = `
  <input ngui-auto-complete
         id="model5"
         placeholder="Search for a book (min. 2 chars)"
         [(ngModel)]="model5"
         [source]="appSvc.findBooks"
         path-to-data="docs"
         [list-formatter]="renderBook"
         display-property-name="title"
         min-chars="2"
  />
  `;

  template7 = `
  <mat-form-field>
      <span matPrefix>$&nbsp;</span>
      <input matInput ngui-auto-complete style="border: 1px solid #ccc"
             id="model6"
             [(ngModel)]="myModel"
             [source]="arrayOfNumbers"
             [list-formatter]="rightAligned"
             placeholder="amount" align="end"/>
      <span matSuffix>.00</span>
   </mat-form-field>
  `;

  template8 = `
  <div ngui-auto-complete
       [source]="arrayOfStrings"
       [auto-select-first-item]="true"
       (ngModelChange)="myCallback7($event)"
       placeholder="enter text">
    <input id="model7" [ngModel]="model7"/>
  </div>
  `;

  template9 = `
  <div ngui-auto-complete
        [source]="arrayOfStrings"
        [accept-user-input]="false"
        (ngModelChange)="myCallback8($event)"
        [is-rtl]="true"
        placeholder="enter text">
        <input id="model8" [ngModel]="model8" autofocus />
      </div>
  `;

  template10 = `
    <input ngui-auto-complete
         style="width: 650px"
         [(ngModel)]="model9"
         [source]="arrayOfCities"
         [accept-user-input]="false"
         [list-formatter]="renderCity"
         placeholder="Search for a city"
  `;

  template11 = `
    <div ngui-auto-complete
       [ignore-accents] = "false"
       [source]="arrayOfAccentedStrings"
       [accept-user-input]="true"
       [auto-select-first-item]="false"
       [select-on-blur]="true"
       (ngModelChange)="myCallback10($event)"
       (customSelected)="customCallback($event)"
       placeholder="enter text">
        <input id="model10" [ngModel]="model10" autofocus />
    </div>
  `;

  template11b = `
  <input ngui-auto-complete
         [(ngModel)]="model11"
         [source]="arrayOfStrings"
         [accept-user-input]="true"
         no-match-found-text=""
         (noMatchFound)="noMatchVisible11 = true"
         (ngModelChange)="noMatchVisible11 = false"
         (customSelected)="noMatchVisible11 = false"
         placeholder="type something not in the list" />
  @if (noMatchVisible11) {
    <div class="no-match-hint">
      <mat-icon>info_outline</mat-icon>
      Not in the list —
      <button mat-button color="primary" (click)="addToList11()">
        Add "{{ model11 }}"
      </button>
    </div>
  }
  `;

  template12 = `
  <input ngui-auto-complete
         [(ngModel)]="model12"
         [source]="arrayOfStrings"
         no-match-found-text=""
         placeholder="type something not in the list" />
  `;

  template13 = `
  <!-- the direction picker is, ironically, another autocomplete -->
  <input ngui-auto-complete
         [(ngModel)]="openDir"
         [source]="directionOptions"
         [accept-user-input]="false"
         [auto-select-first-item]="true"
         placeholder="auto | up | down" />

  <input ngui-auto-complete
         [(ngModel)]="model13"
         [source]="arrayOfStrings"
         [open-direction]="openDir"
         placeholder="opens {{ openDir }}" />
  `;

  public addToList11() {
    if (this.model11 && !this.arrayOfStrings.includes(this.model11)) {
      this.arrayOfStrings = [...this.arrayOfStrings, this.model11];
    }
    this.noMatchVisible11 = false;
  }

  public customCallback(text) {
    console.log('keyword ', text);
  }

  public myCallback1(newVal1) {
    console.log('value is changed to ', newVal1);
    this.model1 = newVal1;
  }

  public myCallback7(newVal7) {
    console.log('value is changed to ', newVal7);
    this.model7 = newVal7;
  }

  public myCallback8(newVal8) {
    console.log('value is changed to ', newVal8);
    this.model8 = newVal8;
  }

  public myCallback10(newVal10) {
    console.log('value is changed to ', newVal10);
    this.model10 = newVal10;
  }

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
