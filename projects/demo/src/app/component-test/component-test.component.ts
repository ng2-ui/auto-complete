import { Component, inject } from '@angular/core';
import { AppService } from '../app.service';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { NguiAutoCompleteComponent } from 'auto-complete';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-component-test',
	templateUrl: './component-test.component.html',
	styleUrls: ['./component-test.component.scss'],
	imports: [
		MatCard,
		MatCardHeader,
		MatCardTitle,
		MatCardSubtitle,
		MatCardContent,
		NguiAutoCompleteComponent,
		MatExpansionPanel,
		MatExpansionPanelHeader,
		MatExpansionPanelTitle,
		FormsModule,
	],
})
export class ComponentTestComponent {
	appSvc = inject(AppService);

	public showAutocomplete = false;
	public loadingTemplate = '<span style="padding:8px;color:#888">Searching...</span>';
	public addrs: any[] = [{ display_name: 'Berlin, Germany' }, { display_name: 'London, United Kingdom' }];

	myModel;
	showMe;
	tplModel;
	showTpl = false;
	public people: any[] = [
		{ name: 'Ada Lovelace', role: 'Mathematician', year: 1815 },
		{ name: 'Alan Turing', role: 'Computer Scientist', year: 1912 },
		{ name: 'Grace Hopper', role: 'Computer Scientist', year: 1906 },
		{ name: 'Katherine Johnson', role: 'Mathematician', year: 1918 },
	];

	templateStr1 = `<div class="addr-input-wrapper" (click)="showAutocomplete = true">
  @for (addr of addrs; track addr; let i = $index) {
    <span class="addr-chip">
      {{ addr.display_name }}
      <span class="remove-btn" (click)="removeFromAddress($event, i)">✕</span>
    </span>
  }

  @if (showAutocomplete) {
    <ngui-auto-complete
      (valueSelected)="addToAddress($event.value)"
      [accept-user-input]="true"
      [source]="appSvc.getAddressUrl()"
      [list-formatter]="myListFormatter"
      loading-text="Searching..."
      max-num-list="5"
      min-chars="2"
      no-match-found-text="No Match Found"
      placeholder="Enter a place name">
    </ngui-auto-complete>
  }
</div>`;

	templateStr2 = `
<input [(ngModel)]="myModel"
       (focus)="showMe = true"
       (blur)="showMe = false"
       placeholder="click to open dropdown"/>
@if (showMe) {
  <ngui-auto-complete
    [show-dropdown-on-init]="true"
    [(value)]="myModel"
    [show-input-tag]="false"
    [source]="[1, 2, 3, 4, 5]">
  </ngui-auto-complete>
}`;

	templateStr3 = `
<input [ngModel]="tplModel?.name"
       (focus)="showTpl = true" (blur)="showTpl = false"
       readonly placeholder="focus to browse people"/>
@if (showTpl) {
  <ngui-auto-complete
    [show-dropdown-on-init]="true"
    [show-input-tag]="false"
    [source]="people"
    (valueSelected)="tplModel = $event.value"
    [headerTemplate]="peopleHead"
    [itemTemplate]="peopleRow">
  </ngui-auto-complete>
}
<ng-template #peopleHead>Pioneers of computing</ng-template>
<ng-template #peopleRow let-person let-i="index">
  <strong>{{ i + 1 }}. {{ person.name }}</strong> — {{ person.role }} ({{ person.year }})
</ng-template>`;

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
