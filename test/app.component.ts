import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import {AutoCompleteDirective, AutoCompleteComponent} from "auto-complete";

@Component({
  selector: 'my-app',
  template: `
    <h1> Autocomplete Directive Test - Local Source </h1>
    component test with array of strings: {{arrayOfStrings | json}}<br/>
    <input ng2-auto-complete 
      [(ngModel)]="model1"
      [source]="arrayOfStrings"
       placeholder="enter text"/>selected: {{model1 | json}}<br/><br/>
    
    component test with array of id/values: {{arrayOfKeyValues | json}}<br/>
    <input 
      ng2-auto-complete
      [(ngModel)]="model2"
      [source]="arrayOfKeyValues" 
      placeholder="enter text"/> selected: {{model2 | json}}<br/><br/>
    
    component test with array of key/names: {{arrayOfKeyVaues2 | json}}<br/>
    <input ng2-auto-complete [source]="arrayOfKeyValues2"
      [(ngModel)]="model3"
      placeholder="enter text"
      value-property-name="key"
      display-property-name="name"/>selected: {{model3 | json}}<br/><br/>
      
    <h1> Autocomplete Directive Test - Remote Source </h1>
    component test with remote source: {{googleGeoCode}}<br/>
    <input  ng2-auto-complete
      [(ngModel)]="model4"
      placeholder="Enter Address(min. 2 chars)"
      [source]="googleGeoCode" 
      display-property-name="formatted_address"
      path-to-data="results"
      min-chars="2" />selected: {{model4 | json}}<br/><br/>
 `,
  providers: [HTTP_PROVIDERS], 
  directives: [AutoCompleteDirective, AutoCompleteComponent],
  styles: [`
    ng2-auto-complete, input {
      display: block; border: 1px solid #ccc; width: 300px;
    }
  `]
})
export class AppComponent {

  public arrayOfStrings: string[] =
    ["this", "is", "array", "of", "text"];

  public arrayOfKeyValues: any[] =
    [{id:1, value:'One'}, {id:2, value:'Two'}, {id:3, value:'Three'}, {id:4, value:'Four'}];

  public arrayOfKeyValues2: any[] =
    [{key:1, name:'Key One'}, {key:2, name:'Key Two'}, {key:3, name:'Key Three'}, {key:4, name:'Key Four'}];
  
  public googleGeoCode: string = "https://maps.googleapis.com/maps/api/geocode/json?address=:keyword";

  public model1;
  public model2;
  public model3;
  public model4;
}
