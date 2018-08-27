import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldComponent } from './input-field.component';
import { ValidationMessagesComponent } from '../validation-messages/validation-messages.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('InputFieldComponent', () => {
  let component: InputFieldComponent;
  let fixture: ComponentFixture<InputFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ InputFieldComponent, ValidationMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
