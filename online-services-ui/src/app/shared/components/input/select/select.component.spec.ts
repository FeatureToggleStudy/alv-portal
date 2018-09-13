import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { ValidationMessagesComponent } from '../validation-messages/validation-messages.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SelectComponent,
        ValidationMessagesComponent
      ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
