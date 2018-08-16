import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateIntervalInputComponent } from './date-interval-input.component';

describe('DateIntervalInputComponent', () => {
  let component: DateIntervalInputComponent;
  let fixture: ComponentFixture<DateIntervalInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
          declarations: [DateIntervalInputComponent],
          schemas: [NO_ERRORS_SCHEMA],
          imports: [NgbModule.forRoot()],
          providers: [
            FormBuilder
          ]
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
