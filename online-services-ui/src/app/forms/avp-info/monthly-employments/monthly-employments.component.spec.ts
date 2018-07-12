import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyEmploymentsComponent } from './monthly-employments.component';

describe('MonthlyEmploymentsComponent', () => {
  let component: MonthlyEmploymentsComponent;
  let fixture: ComponentFixture<MonthlyEmploymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyEmploymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyEmploymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
