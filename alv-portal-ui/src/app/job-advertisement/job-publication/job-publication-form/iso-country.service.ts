import { Injectable } from '@angular/core';
import { I18nService } from '../../../core/i18n.service';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { Observable } from 'rxjs/index';
import * as countries from 'i18n-iso-countries';
import { map } from 'rxjs/operators';

@Injectable()
export class IsoCountryService {

  public static readonly ISO_CODE_SWITZERLAND = 'CH';

  private readonly _countryOptions$: Observable<SelectableOption[]>;

  constructor(private i18nService: I18nService) {
    countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
    countries.registerLocale(require('i18n-iso-countries/langs/fr.json'));
    countries.registerLocale(require('i18n-iso-countries/langs/de.json'));
    countries.registerLocale(require('i18n-iso-countries/langs/it.json'));

    this._countryOptions$ = this.i18nService.currentLanguage$.pipe(
      map((lang: string) => {
          const countryNames = countries.getNames(lang);
          return Object.keys(countryNames)
            .map((value) => ({ value, label: countryNames[value] }));
        }
      ));
  }

  get countryOptions$(): Observable<SelectableOption[]> {
    return this._countryOptions$;
  }
}
