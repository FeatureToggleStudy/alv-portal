import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { EmploymentsComponent } from './employments.component';

describe('EmploymentsComponent', () => {
  let component: EmploymentsComponent;
  let fixture: ComponentFixture<EmploymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
          declarations: [EmploymentsComponent],
          schemas: [NO_ERRORS_SCHEMA],
          providers: [
            FormBuilder
          ]
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
