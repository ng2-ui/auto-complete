import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { Component, ViewEncapsulation } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { AppSvc } from "./app.service";
let templateStr: string = `
  <h1> Autocomplete Directive Test - Local Source </h1>
    
  <fieldset><legend><h2>Source as Array of Strings</h2></legend>
    <ngui-utils-1>
      <div ngui-auto-complete 
        [source]="arrayOfStrings"
        [accept-user-input]="false"
        (ngModelChange)="myCallback1($event)"
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
      <input  ngui-auto-complete
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
      <md-input ngui-auto-complete 
        id="model6"
        [(ngModel)]="myModel"
        [source]="arrayOfNumbers"
        [list-formatter]="rightAligned"
        placeholder="amount" align="end">
        <span md-prefix>$&nbsp;</span>
        <span md-suffix>.00</span>
      </md-input>
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
        (ngModelChange)="myCallback1($event)"
        [is-rtl]="true"
        placeholder="enter text">
        <input id="model1" [ngModel]="model1" autofocus />
      </div>
      <br/>selected model1: {{json(model1)}}<br/><br/>
    </ngui-utils-8>
    <pre>{{templateStr | htmlCode:'ngui-utils-1'}}</pre>
    <pre> arrayOfStrings: {{json(arrayOfStrings)}}</pre>
  </fieldset>
 `;

@Component({
  selector: "my-app",
  template: templateStr,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    fieldset {display: inline-block; vertical-align: top; margin: 10px; padding: 20px }
    ngui-auto-complete, input {
      display: block; border: 1px solid #ccc; width: 300px;
    }
    ngui-utils-1 .ngui-auto-complete > ul {
      max-height: 100px;
      overflow-y: auto;
    }
  `],
   providers : [AppSvc]
})
export class DirectiveTestComponent {
  templateStr: any = templateStr;
  loadingTemplate = '<h1>Loading</h1>';
  arrayOfNumbers: number[] = [100, 200, 300, 400, 500];
  arrayOfStrings: string[] =
    ["this", "is", "array", "of", "text", "with", "long", "and long", "and long", "list"];

  arrayOfKeyValues: any[] =
    [{id:1, value:"One"}, {id:2, value:"Two"}, {id:3, value:"Three"}, {id:4, value:"Four"}];

  arrayOfKeyValues2: any[] =
    [{id:11, key:1, name:"Key One"}, {id:12, key:2, name:"Key Two"}, {id:13, key:3, name:"Key Three"}, {id:14, key:4, name:"Key Four"}];

  googleGeoCode: string = "https://maps.googleapis.com/maps/api/geocode/json?address=:my_own_keyword";

  model1 = "is";
  model2 = {id:1, value: "One"};
  model3 = {key: 3, name: "Key Three"};
  model7 = "";

  constructor (
    public http: Http,
    public appSvc : AppSvc,
    private _sanitizer: DomSanitizer ) {
  }

  myCallback1(newVal) {
    console.log("value is changed to ", newVal);
    this.model1 = newVal;
  }

  myCallback7(newVal) {
    console.log("value is changed to ", newVal);
    this.model7 = newVal;
  }

  renderHero = (data: any) : SafeHtml => {
    let html = `<b style='float:left;width:100%'>${data.name}</b>
                <img style="float: left;padding: 5px;" src="${data.thumbnail.path}/portrait_small.${data.thumbnail.extension}"> 
                <span>${data.description}</span>`;

    return this._sanitizer.bypassSecurityTrustHtml(html);
  };

  rightAligned = (data: any) : SafeHtml => {
    let html = `<div style="text-align:right">${data}.00</div>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  };

  json(obj) {
    return JSON.stringify(obj, null, '  ');
  }

}
