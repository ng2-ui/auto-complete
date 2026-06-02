import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-component-test',
  templateUrl: './component-test.component.html',
  styleUrls: ['./component-test.component.scss']
})
export class ComponentTestComponent {

  public showAutocomplete = false;
  public loadingTemplate = '<span style="padding:8px;color:#888">Searching...</span>';
  public addrs: any[] = [
    {display_name: 'Berlin, Germany'},
    {display_name: 'London, United Kingdom'}
  ];

  myModel;
  showMe;

  templateStr1 = `<div class="addr-input-wrapper" (click)="showAutocomplete = true">
  <span class="addr-chip" *ngFor="let addr of addrs; let i = index">
    {{ addr.display_name }}
    <span class="remove-btn" (click)="removeFromAddress($event, i)">✕</span>
  </span>

  <ngui-auto-complete
    *ngIf="showAutocomplete"
    (valueSelected)="addToAddress($event)"
    [accept-user-input]="true"
    [source]="appSvc.getAddressUrl()"
    display-property-name="display_name"
    [list-formatter]="myListFormatter"
    loading-text="Searching..."
    max-num-list="5"
    min-chars="2"
    no-match-found-text="No Match Found"
    placeholder="Enter a place name">
  </ngui-auto-complete>
</div>`;

  templateStr2 = `
<input [(ngModel)]="myModel"
       (focus)="showMe = true"
       (blur)="showMe = false"
       placeholder="click to open dropdown"/>
<ngui-auto-complete
  *ngIf="showMe"
  [show-dropdown-on-init]="true"
  (valueSelected)="myModel = $event"
  [show-input-tag]="false"
  [source]="[1, 2, 3, 4, 5]">
</ngui-auto-complete>`;

  constructor(public appSvc: AppService) {
  }

  public addToAddress(addr: any): void {
    this.addrs.push(addr);
    this.showAutocomplete = false;
  }

  public removeFromAddress(event: Event, index: number): void {
    this.addrs.splice(index, 1);
    event.stopPropagation();
  }

  public myListFormatter(data: any): string {
    return data['display_name'];
  }

}
