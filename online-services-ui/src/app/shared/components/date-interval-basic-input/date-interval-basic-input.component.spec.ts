import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateIntervalBasicInputComponent } from './date-interval-basic-input.component';

describe('DateIntervalBasicInputComponent', () => {
  let component: DateIntervalBasicInputComponent;
  let fixture: ComponentFixture<DateIntervalBasicInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
          declarations: [DateIntervalBasicInputComponent],
          schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateIntervalBasicInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
