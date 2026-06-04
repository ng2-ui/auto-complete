import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NguiAutoCompleteComponent } from './auto-complete.component';
import { NguiAutoCompleteModule } from './auto-complete.module';

describe('NguiAutoCompleteComponent', () => {
  let component: NguiAutoCompleteComponent;
  let fixture: ComponentFixture<NguiAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NguiAutoCompleteModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NguiAutoCompleteComponent);
    component = fixture.componentInstance;
    // Provide a local array source so the focus-triggered dropdown reload (scheduled
    // from ngOnInit) resolves against local data instead of calling getRemoteData,
    // which throws on a non-string source.
    component.source = ['Item 1', 'Item 2'];
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to showing the input tag and accepting user input', () => {
    expect(component.showInputTag).toBe(true);
    expect(component.acceptUserInput).toBe(true);
  });
});

@Component({
  imports: [NguiAutoCompleteComponent],
  template: `
    <ngui-auto-complete [source]="source" [itemTemplate]="tpl"></ngui-auto-complete>
    <ng-template #tpl let-item let-i="index">custom:{{ item }}:{{ i }}</ng-template>
  `,
})
class TemplateHostComponent {
  source = ['Alpha', 'Beta'];
  @ViewChild(NguiAutoCompleteComponent) autoComplete: NguiAutoCompleteComponent;
}

describe('NguiAutoCompleteComponent itemTemplate', () => {
  it('should render each row with the provided item template', () => {
    const fixture = TestBed.createComponent(TemplateHostComponent);
    fixture.detectChanges();

    const ac = fixture.componentInstance.autoComplete;
    ac.filteredList = ['Alpha', 'Beta'];
    ac.dropdownVisible = true;
    fixture.detectChanges();

    const rows = fixture.debugElement
      .query(By.directive(NguiAutoCompleteComponent))
      .nativeElement.querySelectorAll('li.item');
    expect(rows.length).toBe(2);
    expect(rows[0].textContent.trim()).toBe('custom:Alpha:0');
    expect(rows[1].textContent.trim()).toBe('custom:Beta:1');

    fixture.destroy();
  });
});
