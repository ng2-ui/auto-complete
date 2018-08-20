import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AppSvc } from './app.service';
import { AutoCompleteFilter } from '../src/auto-complete.filter';

const templateStr: string = `
  <h1> Autocomplete Directive Test - Local Source </h1>

  <fieldset><legend><h2>Source as Array of Strings</h2></legend>
    <ngui-utils-1>
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
      <br/>selected model1: {{json(model1)}}<br/><br/>
    </ngui-utils-1>
    <pre>{{templateStr | htmlCode:'ngui-utils-1'}}</pre>
    <pre> arrayOfStrings: {{json(arrayOfStrings)}}</pre>
  </fieldset>

  <fieldset><legend><h2>Source as Array of Strings. Drop-down on focus disable</h2></legend>
    <ngui-utils-1>
      <div ngui-auto-complete
        [source]="arrayOfStrings"
        [accept-user-input]="true"
        [open-on-focus]="false"
        [auto-select-first-item]="false"
        [select-on-blur]="true"
        (ngModelChange)="myCallback1($event)"
        (customSelected)="customCallback($event)"
        placeholder="enter text">
        <input id="model1" [ngModel]="model1" autofocus />
      </div>
      <br/>selected model1: {{json(model1)}}<br/><br/>
    </ngui-utils-1>
    <pre>{{templateStr | htmlCode:'ngui-utils-1'}}</pre>
    <pre> arrayOfStrings: {{json(arrayOfStrings)}}</pre>
  </fieldset>

  <fieldset><legend><h2>Source as Array of id/value</h2></legend>
    <ngui-utils-2>
      <input
        id="model2"
        ngui-auto-complete
        blank-option-text="Select One"
        [(ngModel)]="model2"
        [source]="arrayOfKeyValues"
        placeholder="enter text"
        z-index="4"/>
      <a href="javascript:void(0)" (click)="model2={id:'change', value: 'it'}">Change It</a>
      <br/>selected model2: {{model2 | json}}<br/><br/>
    </ngui-utils-2>
    <pre>{{templateStr | htmlCode:'ngui-utils-2'}}</pre>
    <pre>arrayOfKeyValues: {{json(arrayOfKeyValues)}}</pre>
  </fieldset>

  <fieldset><legend><h2>Source as Array of Key/Name</h2></legend>
    <ngui-utils-3>
      <input ngui-auto-complete [source]="arrayOfKeyValues2"
        id="model3"
        [(ngModel)]="model3"
        placeholder="enter text"
        value-formatter="(key) name"
        list-formatter="(key) name"
        [match-formatted]="true" />
      <br/>selected model3: {{model3 | json}}<br/><br/>
    </ngui-utils-3>
    <pre>{{templateStr | htmlCode:'ngui-utils-3'}}</pre>
    <pre>arrayOfKeyValues2: {{json(arrayOfKeyValues2)}}</pre>
  </fieldset>

  <fieldset><legend><h2>Source as HTTP URI String</h2></legend>
    <ngui-utils-4>
      <input ngui-auto-complete
        id="model4"
        [(ngModel)]="model4"
        placeholder="Enter Address(min. 2 chars)"
        [source]="googleGeoCode"
        no-match-found-text="No Match Found"
        list-formatter="formatted_address"
        path-to-data="results"
        loading-text="Google Is Thinking..."
        [loading-template]="loadingTemplate"
        max-num-list="5"
        min-chars="2" />
      <br/>selected model4: {{model4 | json}}<br/><br/>
    </ngui-utils-4>
    <pre>{{templateStr | htmlCode:'ngui-utils-4'}}</pre>
    <pre> source: {{googleGeoCode}}</pre>
  </fieldset>

  <fieldset><legend><h2>Source as Observable "Marvel API"</h2></legend>
    <ngui-utils-5>
      <input ngui-auto-complete
        id="model5"
        placeholder="Start typing a hero name (min. 2 chars) ... for example: Hulk"
        [(ngModel)]="model5"
        [source]="appSvc.findHeroes"
        path-to-data="data.results"
        [list-formatter]="renderHero"
        min-chars="2"
      />
      <br/>selected model5: {{model5 | json}}<br/><br/>
    </ngui-utils-5>
    <pre>{{templateStr | htmlCode:'ngui-utils-5'}}</pre>
    <b>appSvc.findHeroes functoin</b>
    <pre>{{appSvc.findHeroes | jsCode}}</pre>
  </fieldset>

  <fieldset><legend><h2>With Material Design</h2></legend>
    <ngui-utils-6>
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
    </ngui-utils-6>
    <pre>{{templateStr | htmlCode:'ngui-utils-6'}}</pre>
    <pre>arrayOfNumbers: {{json(arrayOfNumbers)}}</pre>
  </fieldset>

  <fieldset><legend><h2>Source as Array of Strings (with auto-select-first-item)</h2></legend>
    <ngui-utils-7>
      <div ngui-auto-complete
        [source]="arrayOfStrings"
        (ngModelChange)="myCallback7($event)"
        placeholder="enter text">
        <input id="model7" [ngModel]="model7"/>
      </div>
      <br/>selected model7: {{json(model7)}}<br/><br/>
    </ngui-utils-7>
    <pre>{{templateStr | htmlCode:'ngui-utils-7'}}</pre>
    <pre> arrayOfStrings: {{json(arrayOfStrings)}}</pre>
  </fieldset>

 <fieldset style="direction:rtl;text-align:right"><legend><h2>RTL support</h2></legend>
    <ngui-utils-8>
      <div ngui-auto-complete
        [source]="arrayOfStrings"
        [accept-user-input]="false"
        (ngModelChange)="myCallback8($event)"
        [is-rtl]="true"
        placeholder="enter text">
        <input id="model8" [ngModel]="model8" autofocus />
      </div>
      <br/>selected model8: {{json(model8)}}<br/><br/>
    </ngui-utils-8>
    <pre>{{templateStr | htmlCode:'ngui-utils-8'}}</pre>
    <pre> arrayOfStrings: {{json(arrayOfStrings)}}</pre>
  </fieldset>

  <fieldset><legend><h2>Grid-Style Results with Header Row</h2></legend>
    <ngui-utils-9>
      <input ngui-auto-complete
        style="width: 650px"
        [(ngModel)]="model9"
        [source]="arrayOfCities"
        [accept-user-input]="false"
        [list-formatter]="renderCity"
        placeholder="Search for a city"
        display-property-name="city"
        [header-item-template]="cityHeaderTemplate"
        />
        <br />selected model9: {{json(model9)}}<br /><br />
    </ngui-utils-9>
    <pre>{{templateStr | htmlCode:'ngui-utils-9'}}</pre>
    <pre> arrayOfCities: {{json(arrayOfCities)}}</pre>
  </fieldset>

   <fieldset><legend><h2>Exact Match Including Accents</h2></legend>
    <ngui-utils-10>
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
      <br/>selected model10: {{json(model10)}}<br/><br/>
    </ngui-utils-10>
    <pre>{{templateStr | htmlCode:'ngui-utils-10'}}</pre>
    <pre> arrayOfStrings: {{json(arrayOfAccentedStrings)}}</pre>
  </fieldset>

  <fieldset><legend><h2>Outer input</h2></legend>
    <ngui-utils-11>
        <input #outerInput id="model11" [ngModel]="model11" autofocus placeholder="enter text"/>
        <div ngui-auto-complete
            [outer-input-element]="outerInput"
            [source]="arrayOfStrings"
            [accept-user-input]="true"
            [auto-select-first-item]="false"
            [select-on-blur]="true"
            (ngModelChange)="myCallback11($event)"
            (customSelected)="customCallback($event)" >
        </div>
      <br/>selected model11: {{json(model11)}}<br/><br/>
    </ngui-utils-11>
    <pre>{{templateStr | htmlCode:'ngui-utils-11'}}</pre>
    <pre> arrayOfStrings: {{json(arrayOfStrings)}}</pre>
  </fieldset>

    <fieldset><legend><h2>With inline filters</h2></legend>
    <ngui-utils-12>
        <input #withInlineFilters
         id="model12"
         [ngModel]="model12"
         autofocus
         placeholder="enter text"
         style="width: 650px"/>
        <div ngui-auto-complete
            style="width: 650px"
            [outer-input-element]="withInlineFilters"
            [source]="arrayOfCities"
            [list-formatter]="renderCity"
            placeholder="Search for a city"
            display-property-name="city"
            [accept-user-input]="false"
            [auto-select-first-item]="false"
            [select-on-blur]="true"
            [filters]="filters"
            [header-item-template]="cityHeaderTemplate"
            (ngModelChange)="myCallback12($event)"
            (customSelected)="customCallback($event)" >
        </div>
        <br/>selected model12: {{json(model12)}}<br/><br/>
    </ngui-utils-12>
    <pre>{{templateStr | htmlCode:'ngui-utils-12'}}</pre>
    <pre> arrayOfStrings: {{json(arrayOfStrings)}}</pre>
  </fieldset>
 `;

@Component({
    selector: 'my-app',
    template: templateStr,
    encapsulation: ViewEncapsulation.None,
    styles: [`
        fieldset {
            display: inline-block;
            vertical-align: top;
            margin: 10px;
            padding: 20px
        }

        ngui-auto-complete, input {
            display: block;
            border: 1px solid #ccc;
            width: 300px;
        }

        ngui-utils-1 .ngui-auto-complete > ul {
            max-height: 100px;
            overflow-y: auto;
        }

        .header-row {
          background-color: #505050;
          color: #ffffff;
          margin: -2px -5px;
        }
        .data-row {
          margin: -2px -5px;
        }
        .col-1 {
          border-left: 1px solid #ccc;
          padding-left: 5px;
          display: inline-block;
          width: 100px;
        }
        .col-2 {
          border-left: 1px solid #ccc;
          padding-left: 5px;
          display: inline-block;
          width: 200px;
        }
    `],
    providers: [AppSvc]
})
export class DirectiveTestComponent {
    public templateStr: any = templateStr;
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

    public googleGeoCode: string = 'https://maps.googleapis.com/maps/api/geocode/json?address=:my_own_keyword';

    public model1 = 'is';
    public model2 = {id: 1, value: 'One'};
    public model3 = {key: 3, name: 'Key Three'};
    public model7 = '';
    public model8 = '';
    public model9 = '';
    public model10 = '';
    public model11 = '';
    public model12 = '';

    public filters: AutoCompleteFilter[] = [{
        label: 'Contains San',
        filterBy: (item: any) => item.city && item.city.indexOf('San') > -1
    }];

    constructor(public http: HttpClient, public appSvc: AppSvc, private _sanitizer: DomSanitizer) {
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

    public myCallback11(newVal11) {
        console.log('value is changed to ', newVal11);
        this.model11 = newVal11;
    }

    public myCallback12(newVal12) {
        console.log('value is changed to ', newVal12);
        this.model12 = newVal12;
    }

    public renderHero(data: any): SafeHtml {
        const html = `<b style='float:left;width:100%'>${data.name}</b>
                <img style="float: left;padding: 5px;" src="${data.thumbnail.path}/portrait_small.${data.thumbnail.extension}">
                <span>${data.description}</span>`;

        return this._sanitizer.bypassSecurityTrustHtml(html);
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

    public rightAligned(data: any): SafeHtml {
        const html = `<div style="text-align:right">${data}.00</div>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    public json(obj) {
        return JSON.stringify(obj, null, '  ');
    }

}
