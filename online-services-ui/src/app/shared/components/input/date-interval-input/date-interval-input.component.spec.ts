import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DateIntervalInputComponent } from './date-interval-input.component';
import { DateInputComponent } from '../date-input/date-input.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ValidationMessagesComponent } from '../validation-messages/validation-messages.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('DateIntervalInputComponent', () => {
  let component: DateIntervalInputComponent;
  let fixture: ComponentFixture<DateIntervalInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbDatepickerModule,
        ReactiveFormsModule
      ],
      declarations: [
        DateIntervalInputComponent,
        DateInputComponent,
        ValidationMessagesComponent]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateIntervalInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
