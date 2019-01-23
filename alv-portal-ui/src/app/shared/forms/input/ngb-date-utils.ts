import {NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {formatDate} from '@angular/common';

export const toISOLocalDateTime = (date: NgbDateStruct, timeHours: string, timeMinutes: string): string => {
  if (!date) {
    return null;
  }
  let dateObj = new Date(date.year, date.month - 1, date.day, parseInt(timeHours), parseInt(timeMinutes));
  return formatDate(dateObj, 'yyyy-MM-ddTHH:mm:00', 'en-US');
};

export const toISOLocalDate = (date: NgbDateStruct): string => {
  if (!date) {
    return null;
  }
  const dateObj = new Date(date.year, date.month - 1, date.day, 12);
  return formatDate(dateObj, 'yyyy-MM-dd', 'en-US');
};

export const now = (): NgbDateStruct => {
  return fromDate(new Date());
};

export const fromISODate = (isoDateString: string): NgbDateStruct => {
  return fromDate(new Date(isoDateString));
};

export const fromDate = (date: Date): NgbDateStruct => {
  return NgbDate.from({year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()});
};

