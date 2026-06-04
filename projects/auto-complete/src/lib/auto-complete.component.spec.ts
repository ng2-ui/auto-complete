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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to showing the input tag and accepting user input', () => {
    expect(component.showInputTag).toBe(true);
    expect(component.acceptUserInput).toBe(true);
  });
});
