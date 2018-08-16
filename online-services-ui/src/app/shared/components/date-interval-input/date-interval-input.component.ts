import { Component, ElementRef, forwardRef, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { NgbCalendar, NgbDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

function equals(one: NgbDateStruct, two: NgbDateStruct) {
  return one && two && two.year === one.year && two.month === one.month && two.day === one.day;
}

function before(one: NgbDateStruct, two: NgbDateStruct) {
  return !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
      ? false : one.day < two.day : one.month < two.month : one.year < two.year;
}

function after(one: NgbDateStruct, two: NgbDateStruct) {
  return !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
      ? false : one.day > two.day : one.month > two.month : one.year > two.year;
}

@Component({
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateIntervalInputComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DateIntervalInputComponent),
    multi: true
  }],
  selector: 'os-date-interval-input',
  templateUrl: './date-interval-input.component.html',
  styleUrls: ['./date-interval-input.component.scss']
})
export class DateIntervalInputComponent implements ControlValueAccessor, Validator {

  hoveredDate: NgbDateStruct;

  datePickerVisible = false;

  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  @ViewChild('fromPicker') fromPicker: ElementRef;
  @ViewChild('toPicker') toPicker: ElementRef;

  onChange: any;

  isDisabled = false;

  constructor(calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  onDateSelection(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.fromPicker.nativeElement.focus();
    } else if (this.fromDate && !this.toDate && !before(date, this.fromDate)) {
      this.toDate = date;
      this.toPicker.nativeElement.focus();
      this.datePickerVisible = false;
    } else {
      this.fromPicker.nativeElement.focus();
      this.toDate = null;
      this.fromDate = date;
    }
    this.onChange({
      from: this.fromDate,
      to: this.toDate
    });
  }

  toggleDatepicker() {
    this.datePickerVisible = !this.datePickerVisible;
  }

  isHovered(date: NgbDateStruct): boolean {
    return this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  }

  isInside(date: NgbDateStruct): boolean {
    return after(date, this.fromDate) && before(date, this.toDate);
  }

  isFrom(date: NgbDateStruct): boolean {
    return equals(date, this.fromDate);
  }

  isTo(date: NgbDateStruct): boolean {
    return equals(date, this.toDate);
  }

  validate(c: AbstractControl): ValidationErrors | null {
    if (after(this.fromDate, this.toDate)) {
      return {
        fromMoreTo: 'from date is later than to date'
      };
    }
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
  }

  writeValue(obj: { from: any, to: any }): void {
    this.fromDate = obj.from;
    this.toDate = obj.to;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
