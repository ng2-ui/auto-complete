import { ComponentFixture, TestBed } from '@angular/core/testing';

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
