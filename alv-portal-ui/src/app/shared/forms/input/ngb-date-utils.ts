import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';

/**
 * Converts a NgbDateStruct with hours and minutes parameters to an (8601) ISOLocalDatetime string representation without timezone information
 * f.E <NgbDateStruct>{day: 12, month: 2, year: 2000}, 14, 15) = '2000-02-12T14:15:00'

 * @param date
 * @param timeHours
 * @param timeMinutes
 */
export const toISOLocalDateTime = (date: NgbDateStruct, timeHours: string, timeMinutes: string): string => {
  if (!date) {
    return null;
  }
  const dateObj = new Date(date.year, date.month - 1, date.day, parseInt(timeHours, 10), parseInt(timeMinutes, 10));
  return formatDate(dateObj, 'yyyy-MM-ddTHH:mm:00', 'en-US');
};

/**
 * Converts a NgbDateStruct to an (8601) ISOLocalDate string representation
 * f.E <NgbDateStruct>{day: 12, month: 2, year: 2000} = '2000-02-12'
 *
 * @param date
 */
export const toISOLocalDate = (date: NgbDateStruct): string => {
  if (!date) {
    return null;
  }
  const dateObj = new Date(date.year, date.month - 1, date.day, 12);
  return formatDate(dateObj, 'yyyy-MM-dd', 'en-US');
};

/**
 * Converts a Date to a NgbDateStruct
 * f.E fromDate(new Date(2000, 0, 1)); = <NgbDateStruct>{day: 1, month: 1, year: 2000}
 * @param date
 */
export const fromDate = (date: Date): NgbDateStruct => {
  return NgbDate.from({year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()});
};

/**
 * Converts an (8601) ISODateString to a NgbDateStruct
 * f.E  '2000-12-11' = <NgbDateStruct>{day: 11, month: 12, year: 2000}
 * @param isoDateString
 */
export const fromISODate = (isoDateString: string): NgbDateStruct => {
  return fromDate(new Date(isoDateString));
};

export const now = (): NgbDateStruct => {
  return fromDate(new Date());
};



