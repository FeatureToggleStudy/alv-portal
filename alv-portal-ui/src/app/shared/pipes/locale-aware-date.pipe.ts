import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'localeAwareDate'
})
export class LocaleAwareDatePipe implements PipeTransform {

  constructor(private translateService: TranslateService) {
  }

  public transform(value: any, pattern = 'mediumDate'): any {
    const wrapped = new DatePipe(mapLangToLocale(this.translateService.currentLang));
    return wrapped.transform(value, pattern);
  }
}

function mapLangToLocale(langKey: string): string {

  const DEFAULT_LOCALE = 'de-CH';

  const langToLocaleMap = {
    'de': 'de-CH',
    'fr': 'fr-CH',
    'it': 'it-CH',
    'en': 'en-GB'
  };

  return langToLocaleMap[langKey] ? langToLocaleMap[langKey] : DEFAULT_LOCALE;
}
