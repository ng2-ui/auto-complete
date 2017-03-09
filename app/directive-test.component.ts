import { Component } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { AppSvc } from "./app.service";

let templateStr: string = `
  <h1> Autocomplete Directive Test - Local Source </h1>
    
  <fieldset><legend><h2>Source as Array of Strings</h2></legend>
    <ng2-utils-1>
      <div ng2-auto-complete 
        [min-chars]="1"
        [source]="arrayOfStrings"
        [accept-user-input]="false"
        (ngModelChange)="myCallback($event)"
        placeholder="enter text">
        <input id="model1" [ngModel]="model1" autofocus />
      </div>
      <br/>selected model1: {{json(model1)}}<br/><br/>
    </ng2-utils-1>
    <pre>{{templateStr | htmlCode:'ng2-utils-1'}}</pre>
    <pre> arrayOfStrings: {{json(arrayOfStrings)}}</pre>
  </fieldset>
    
  <fieldset><legend><h2>Source as Array of id/value</h2></legend>
    <ng2-utils-2>
      <input 
        id="model2"
        ng2-auto-complete
        blank-option-text="Select One"
        [(ngModel)]="model2"
        [source]="arrayOfKeyValues" 
        placeholder="enter text"/> 
      <a href="javascript:void(0)" (click)="model2={id:'change', value: 'it'}">Change It</a>
      <br/>selected model2: {{model2 | json}}<br/><br/>
    </ng2-utils-2>
    <pre>{{templateStr | htmlCode:'ng2-utils-2'}}</pre>
    <pre>arrayOfKeyValues: {{json(arrayOfKeyValues)}}</pre>
  </fieldset>
    
  <fieldset><legend><h2>Source as Array of Key/Name</h2></legend>
    <ng2-utils-3>
      <input ng2-auto-complete [source]="arrayOfKeyValues2"
        id="model3"
        [(ngModel)]="model3"
        placeholder="enter text"
        value-formatter="(key) name"
        list-formatter="(key) name" />
      <br/>selected model3: {{model3 | json}}<br/><br/>
    </ng2-utils-3>
    <pre>{{templateStr | htmlCode:'ng2-utils-3'}}</pre>
    <pre>arrayOfKeyValues2: {{json(arrayOfKeyValues2)}}</pre>
  </fieldset>
  
      
  <fieldset><legend><h2>Source as HTTP URI String</h2></legend>
    <ng2-utils-4>
      <input  ng2-auto-complete
        id="model4"
        [(ngModel)]="model4"
        placeholder="Enter Address(min. 2 chars)"
        [source]="googleGeoCode" 
        no-match-found-text="No Match Found"
        list-formatter="formatted_address"
        path-to-data="results"
        loading-text="Google Is Thinking..."
        max-num-list="5"
        min-chars="2" />
      <br/>selected model4: {{model4 | json}}<br/><br/>
    </ng2-utils-4>
    <pre>{{templateStr | htmlCode:'ng2-utils-4'}}</pre>
    <pre> source: {{googleGeoCode}}</pre>
  </fieldset>
 
  <fieldset><legend><h2>Source as Observable "Marvel API"</h2></legend>
    <ng2-utils-5>
      <input  ng2-auto-complete
        id="model5"
        placeholder="Start typing a hero name (min. 2 chars) ... for example: Hulk"     
        [(ngModel)]="model5" 
        [source]="appSvc.findHeroes"  
        path-to-data="data.results"
        [list-formatter]="renderHero"
        min-chars="2" 
      />
      <br/>selected model5: {{model5 | json}}<br/><br/>
    </ng2-utils-5>
    <pre>{{templateStr | htmlCode:'ng2-utils-5'}}</pre>
    <b>appSvc.findHeroes functoin</b>
    <pre>{{appSvc.findHeroes | jsCode}}</pre>
  </fieldset>
    
  <fieldset><legend><h2>With Material Design</h2></legend>
    <ng2-utils-6>
      <md-input ng2-auto-complete 
        id="model6"
        [(ngModel)]="myModel"
        [source]="arrayOfNumbers"
        [list-formatter]="rightAligned"
        placeholder="amount" align="end">
        <span md-prefix>$&nbsp;</span>
        <span md-suffix>.00</span>
      </md-input>
    </ng2-utils-6>
    <pre>{{templateStr | htmlCode:'ng2-utils-6'}}</pre>
    <pre>arrayOfNumbers: {{json(arrayOfNumbers)}}</pre>
  </fieldset>
 `;

@Component({
  selector: "my-app",
  template: templateStr,
  styles: [`
    fieldset {display: inline-block; vertical-align: top; margin: 10px; padding: 20px }
    ng2-auto-complete, input {
      display: block; border: 1px solid #ccc; width: 300px;
    }
  `],
   providers : [AppSvc]
})
export class DirectiveTestComponent {
  templateStr: any = templateStr;

  arrayOfNumbers: number[] = [100, 200, 300, 400, 500];

  arrayOfStrings: string[] =
    ["this", "is", "array", "of", "text", "with", "long", "and long", "and long", "list"];

  arrayOfKeyValues: any[] =
    [{id:1, value:"One"}, {id:2, value:"Two"}, {id:3, value:"Three"}, {id:4, value:"Four"}];

  arrayOfKeyValues2: any[] =
    [{key:1, name:"Key One"}, {key:2, name:"Key Two"}, {key:3, name:"Key Three"}, {key:4, name:"Key Four"}];

  googleGeoCode: string = "https://maps.googleapis.com/maps/api/geocode/json?address=:my_own_keyword";

  model1 = "is";
  model2 = {id:1, value: "One"};
  model3 = {key: 3, name: "Key Three"};

  constructor (
    public appSvc : AppSvc,
    private _sanitizer: DomSanitizer ) {
  }

  myCallback(newVal) {
    console.log("value is changed to ", newVal);
    this.model1 = newVal;
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
