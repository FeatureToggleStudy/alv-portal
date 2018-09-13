import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvpFormComponent } from './avp-form.component';

describe('AvpFormComponent', () => {
  let component: AvpFormComponent;
  let fixture: ComponentFixture<AvpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
          declarations: [AvpFormComponent],
          schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
