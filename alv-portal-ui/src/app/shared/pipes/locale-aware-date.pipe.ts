import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'localeAwareDate'
})
export class LocaleAwareDatePipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) {
  }

  public transform(value: any, pattern = 'mediumDate'): any {
    const wrapped = new DatePipe(this.locale);
    return wrapped.transform(value, pattern);
  }
}
