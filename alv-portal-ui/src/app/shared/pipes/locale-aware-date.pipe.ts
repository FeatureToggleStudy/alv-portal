import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

export const DATE_FORMAT = 'dd.MM.yyyy';
export const SHORT_DATE_TIME_FORMAT = 'dd.MM.yyyy HH:mm';


@Pipe({
  name: 'localeAwareDate'
})
export class LocaleAwareDatePipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) {
  }

  public transform(value: any, pattern = DATE_FORMAT): any {
    const wrapped = new DatePipe(this.locale);
    return wrapped.transform(value, pattern);
  }
}
