import { Component, ViewEncapsulation } from '@angular/core';

var templateStr = `
  <br/>
  <fieldset><legend><h2>Attributes and Events</h2></legend>
    <ng2-utils-1>
      <button (click)="show=!show">show/hide</button>
      <ng2-auto-complete
        *ngIf="show"
        (valueSelected)="address=$event"
        [accept-user-input]="true"
        [source]="googleGeoCode"
        blank-option-text="Select None"
        display-property-name="formatted_address"
        value-property-name="value"
        loading-text="Google Is Thinking..."
        max-num-list="5"
        min-chars="2"
        no-match-found-text="No Match Found"
        path-to-data="results"
        placeholder="Enter Address(min. 2 chars)"
      ></ng2-auto-complete>
      <br>address: {{address | json}}
    </ng2-utils-1>
    <pre>{{templateStr | htmlCode:'ng2-utils-1'}}</pre>
  </fieldset>`;

@Component({
  selector: 'my-app',
  template: templateStr,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    fieldset {display: inline-block; vertical-align: top; margin: 10px; padding: 20px }
    ng2-auto-complete .ng2-auto-complete > input {
      width: 100%; display: block; border: 1px solid #ccc; width: 300px;
    }`]
})
export class ComponentTestComponent {
  templateStr: string = templateStr;
  googleGeoCode: string = "https://maps.googleapis.com/maps/api/geocode/json?address=:my_own_keyword";
  show: boolean = true;
}
