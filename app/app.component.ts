import { Component } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { AppSvc } from "./app.service";

@Component({
  selector: "my-app",
  template: `
    <h1> Autocomplete Directive Test - Local Source </h1>
    
    <h3>With Array of Strings</h3>
    <pre>source: {{json(arrayOfStrings)}}</pre>
    <div ng2-auto-complete 
      [source]="arrayOfStrings"
      (ngModelChange)="myCallback($event)"
      placeholder="enter text">
      <input [ngModel]="model1" />
    </div>
    <br/>selected model1: {{json(model1)}}<br/><br/>
    
    <h3>With Array of id/value</h3>
    <pre>source: {{json(arrayOfKeyValues)}}</pre>
    <input 
      ng2-auto-complete
      [(ngModel)]="model2"
      [source]="arrayOfKeyValues" 
      placeholder="enter text"/> 
    <a href="#" (click)="model2={id:'change', value: 'it'}">Change It</a>
    <br/>selected model2: {{model2 | json}}<br/><br/>
    
    <h3>With Array of Key/Name</h3>
    <pre>source: {{json(arrayOfKeyValues2)}}</pre>
    <input ng2-auto-complete [source]="arrayOfKeyValues2"
      [(ngModel)]="model3"
      placeholder="enter text"
      value-property-name="key"
      display-property-name="name"/>
    <br/>selected model3: {{model3 | json}}<br/><br/>
      
    <h3>With Remote Source as HTTP URI String</h3>
    <pre> source: {{googleGeoCode}}</pre>
    <input  ng2-auto-complete
      [(ngModel)]="model4"
      placeholder="Enter Address(min. 2 chars)"
      [source]="googleGeoCode" 
      display-property-name="formatted_address"
      path-to-data="results"
      min-chars="2" />
    <br/>selected model4: {{model4 | json}}<br/><br/>
 
    <h3>With Remote Source as Observable "Marvel API" </h3>
    <input  ng2-auto-complete
      placeholder="Start typing a hero name (min. 2 chars) ... for example: Hulk"     
      [(ngModel)]="model5" 
      [source]="appSvc.findHeroes"  
      [list-formatter]="renderHero"
      path-to-data="data.results"
      min-chars="2" 
    />
    <br/>selected model5: {{model5 | json}}<br/><br/>
    
    <h3>With Material Design</h3>
    <md-input ng2-auto-complete 
      [(ngModel)]="myModel"
      [source]="arrayOfNumbers"
      [list-formatter]="rightAligned"
      placeholder="amount" align="end">
      <span md-prefix>$&nbsp;</span>
      <span md-suffix>.00</span>
    </md-input>
     
 `,
  styles: [`
    ng2-auto-complete, input {
      display: block; border: 1px solid #ccc; width: 300px;
    }
  `],
   providers : [AppSvc]
})
export class AppComponent {

  arrayOfNumbers: number[] = [100, 200, 300, 400, 500];

  arrayOfStrings: string[] =
    ["this", "is", "array", "of", "text"];

  arrayOfKeyValues: any[] =
    [{id:1, value:"One"}, {id:2, value:"Two"}, {id:3, value:"Three"}, {id:4, value:"Four"}];

  arrayOfKeyValues2: any[] =
    [{key:1, name:"Key One"}, {key:2, name:"Key Two"}, {key:3, name:"Key Three"}, {key:4, name:"Key Four"}];

  googleGeoCode: string = "https://maps.googleapis.com/maps/api/geocode/json?address=:keyword";

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
  }

  rightAligned = (data: any) : SafeHtml => {
    let html = `<div style="text-align:right">${data}.00</div>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  json(obj) {
    return JSON.stringify(obj);
  }
}
