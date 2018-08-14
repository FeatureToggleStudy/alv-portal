import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { YesNoInputComponent } from './yes-no-input.component';

describe('YesNoInputComponent', () => {
  let component: YesNoInputComponent;
  let fixture: ComponentFixture<YesNoInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
          declarations: [YesNoInputComponent],
          schemas: [NO_ERRORS_SCHEMA],
          providers: [
            FormBuilder
          ],
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YesNoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
