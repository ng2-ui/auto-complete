import { Component, ViewEncapsulation } from '@angular/core';

var templateStr = `
  <br/>
  <fieldset><legend><h2>Component test - multi autocomplete</h2></legend>
    <ngui-utils-1>
      <div class="wrapper" (click)="showAutocomplete=true">
      
        <li class="addr" *ngFor="let addr of addrs; let i = index;" >
          <span>{{addr.formatted_address}}</span>
          <span class="remove" (click)="removeFromAddrs($event, i)">x</span>
        </li>
        
        <ngui-auto-complete
          *ngIf="showAutocomplete"
          (valueSelected)="addToAddrs($event)"
          [accept-user-input]="true"
          [source]="googleGeoCode"
          display-property-name="formatted_address"
          [list-formatter]="myListFormatter"
          loading-text="Google Is Thinking..."
          [loading-template]="loadingTemplate"
          max-num-list="5"
          min-chars="2"
          no-match-found-text="No Match Found"
          path-to-data="results"
          placeholder="Enter Address"
        ></ngui-auto-complete>
      </div>
    </ngui-utils-1>
    <pre>{{templateStr | htmlCode:'ngui-utils-1'}}</pre>
  </fieldset>
  
  <fieldset>
    <ngui-utils-2>
      <input [(ngModel)]="myModel"
          (focus)="showMe=true"
          (blur)="showMe=false" />
      <ngui-auto-complete 
         *ngIf="showMe"
         [show-dropdown-on-init]="true"
         (valueSelected)="myModel = $event"
         [show-input-tag]="false"
         [source]="[1,2,3,4,5]">
      </ngui-auto-complete>
     </ngui-utils-2>
     <pre>{{templateStr | htmlCode:'ngui-utils-2'}}</pre>
  </fieldset>
`;


@Component({
  selector: 'my-app',
  template: templateStr,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    fieldset {display: inline-block; vertical-align: top; margin: 10px; padding: 20px }
    ngui-auto-complete {display: inline-block}
    ngui-auto-complete .ngui-auto-complete ul {position: absolute}
    li.addr {margin: 5px; padding: 5px; list-style: none; border: 1px solid #ccc; display: inline-block;}
    .wrapper { padding: 10px; border: 1px solid #ccc}
    span.remove {color: red}
    ngui-utils-2 ngui-auto-complete {display: block; width: 300px}
    ngui-utils-2 .ngui-auto-complete > ul {width: 300px}
  `]
})
export class ComponentTestComponent {
  templateStr: string = templateStr;
  googleGeoCode: string = "https://maps.googleapis.com/maps/api/geocode/json?address=:my_own_keyword";
  showAutocomplete: boolean = true;
  loadingTemplate = '<h1>Loading h1</h1>';
  addrs: any[] = [
    {formatted_address: 'my addr 1'},
    {formatted_address: 'my addr 2'}
  ];
  addToAddrs(addr: any): void {
    this.addrs.push(addr);
    this.showAutocomplete = false;
  }
  removeFromAddrs(evt, index: number): void {
    this.addrs.splice(index,1);
    event.stopPropagation();
  }
  myListFormatter(data: any): string {
      return data['formatted_address'];
  }
}
