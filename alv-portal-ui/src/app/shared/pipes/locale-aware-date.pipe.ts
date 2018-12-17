import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localeAwareDate'
})
export class LocaleAwareDatePipe implements PipeTransform {

  constructor(private translateService: TranslateService) {
  }

  public transform(value: any, pattern = 'mediumDate'): any {
    const wrapped = new DatePipe(this.translateService.currentLang);
    return wrapped.transform(value, pattern);
  }
}
