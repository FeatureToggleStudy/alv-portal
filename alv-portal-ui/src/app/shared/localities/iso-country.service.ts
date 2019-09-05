import { Injectable } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { SelectableOption } from '../forms/input/selectable-option.model';
import { Observable } from 'rxjs';
import * as countries from 'i18n-iso-countries';
import { map } from 'rxjs/operators';

@Injectable()
export class IsoCountryService {

  public static readonly ISO_CODE_SWITZERLAND = 'CH';

  public static readonly MAIN_COUNTRIES_ISO_CODES_ORDER = {
    CH: 1,
    LI: 2,
    DE: 3,
    FR: 4,
    IT: 5
  };

  private readonly defaultCountryOptions$: Observable<SelectableOption[]>;

  constructor(private i18nService: I18nService) {
    countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
    countries.registerLocale(require('i18n-iso-countries/langs/fr.json'));
    countries.registerLocale(require('i18n-iso-countries/langs/de.json'));
    countries.registerLocale(require('i18n-iso-countries/langs/it.json'));

    this.defaultCountryOptions$ = this.i18nService.currentLanguage$.pipe(
      map(this.getCountryOptions)
    );
  }

  getCountryOptions(lang: string): SelectableOption[] {
    const countryNames = countries.getNames(lang);
    return Object.keys(countryNames)
      .map((value) => ({ value, label: countryNames[value] }));
  }

  getSortedCountryOptions(customCountryOptions$?: Observable<SelectableOption[]>): Observable<SelectableOption[]> {
    const countryOptions = customCountryOptions$ || this.defaultCountryOptions$;
    return countryOptions.pipe(
      map(c => {
        c.sort((a, b) => {
          const aWeight = IsoCountryService.MAIN_COUNTRIES_ISO_CODES_ORDER[a.value];
          const bWeight = IsoCountryService.MAIN_COUNTRIES_ISO_CODES_ORDER[b.value];
          if (aWeight && bWeight) {
            return aWeight - bWeight;
          } else if (aWeight) {
            return -1;
          } else if (bWeight) {
            return 1;
          } else {
            return a.label.localeCompare(b.label);
          }
        });
        return c;
      })
    );
  }
}
