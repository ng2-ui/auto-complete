import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-test',
  templateUrl: './component-test.component.html',
  styleUrls: ['./component-test.component.scss']
})
export class ComponentTestComponent implements OnInit {

  public googleGeoCode = 'https://maps.googleapis.com/maps/api/geocode/json?address=:my_own_keyword';
  public showAutocomplete = true;
  public loadingTemplate = '<h1>Loading h1</h1>';
  public addrs: any[] = [
    {formatted_address: 'my addr 1'},
    {formatted_address: 'my addr 2'}
  ];

  myModel;
  showMe;

  templateStr1 = `<div class="wrapper" (click)="showAutocomplete=true">
      <li class="addr" *ngFor="let addr of addrs; let i = index;">
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
    </div>`;

  templateStr2 = `
    <input [(ngModel)]="myModel"
           (focus)="showMe = true"
           (blur)="showMe = false"/>
    <ngui-auto-complete
      *ngIf="showMe"
      [show-dropdown-on-init]="true"
      (valueSelected)="myModel = $event"
      [show-input-tag]="false"
      [source]="[1, 2, 3, 4, 5]">
    </ngui-auto-complete>
  `;

  constructor() { }

  public addToAddrs(addr: any): void {
    this.addrs.push(addr);
    this.showAutocomplete = false;
  }

  public removeFromAddrs(evt, index: number): void {
    this.addrs.splice(index, 1);
    event.stopPropagation();
  }

  public myListFormatter(data: any): string {
    return data['formatted_address'];
  }

  ngOnInit(): void {
  }

}
