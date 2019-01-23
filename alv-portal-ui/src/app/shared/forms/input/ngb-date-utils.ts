import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {formatDate} from '@angular/common';


/**
 *
 * @param date
 * @param timeHours
 * @param timeMinutes
 */
export const toLocalDateTimeISO = (date: NgbDate, timeHours: string, timeMinutes: string) => {
  let dateObj = new Date(date.year, date.month - 1, date.day, parseInt(timeHours), parseInt(timeMinutes));
  return formatDate(dateObj, 'yyyy-MM-ddTHH:mm:00', 'en-US');
};

/**
 *
 * @param isoDate
 */
export const fromDateISO = (isoDate: string): NgbDate => {
  let dateObj = new Date(isoDate);
  return new NgbDate(dateObj.getFullYear(), dateObj.getMonth() + 1, dateObj.getDate());
};

/**
 *
 * @param date
 */
export const toLocalDateIso = (date: NgbDate) => {
  let dateObj = new Date(date.year, date.month - 1, date.day, 12);
  return formatDate(dateObj, 'yyyy-MM-dd', 'en-US');
};
