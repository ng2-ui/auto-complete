import { Component } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { AppSvc } from "./app.service";

let templateStr: string = `
  <h1> Autocomplete Directive Test - Local Source </h1>
    
  <fieldset><legend><h2>Source as Array of Strings</h2></legend>
    <ng2-utils-1>
      <input ng2-auto-complete 
        [source]="arrayOfStrings"
        [accept-user-input]="false"
        (ngModelChange)="myCallback($event)"
        placeholder="enter text"
        id="model1" [ngModel]="model1" />
      <br/>selected model1: {{json(model1)}}<br/><br/>
    </ng2-utils-1>
    <pre>{{templateStr | htmlCode:'ng2-utils-1'}}</pre>
    <pre> arrayOfStrings: {{json(arrayOfStrings)}}</pre>
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
  }

  rightAligned = (data: any) : SafeHtml => {
    let html = `<div style="text-align:right">${data}.00</div>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  json(obj) {
    return JSON.stringify(obj, null, '  ');
  }
}
