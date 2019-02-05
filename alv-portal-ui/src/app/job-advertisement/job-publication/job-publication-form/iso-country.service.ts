import { Injectable } from '@angular/core';
import { I18nService } from '../../../core/i18n.service';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { Observable } from 'rxjs';
import * as countries from 'i18n-iso-countries';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class IsoCountryService {

  public static readonly ISO_CODE_SWITZERLAND = 'CH';
  public static readonly ISO_CODE_LIECHTENSTEIN = 'LI';
  public static readonly ISO_CODE_GERMANY = 'DE';
  public static readonly ISO_CODE_FRANCE = 'FR';
  public static readonly ISO_CODE_ITALY = 'IT';

  public static readonly MAIN_COUNTRIES_ISO_CODES = [
    IsoCountryService.ISO_CODE_SWITZERLAND,
    IsoCountryService.ISO_CODE_LIECHTENSTEIN,
    IsoCountryService.ISO_CODE_GERMANY,
    IsoCountryService.ISO_CODE_FRANCE,
    IsoCountryService.ISO_CODE_ITALY
  ];

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
    return this._countryOptions$.pipe(
      tap(country => {
        country.sort()
      })
    );
  }

  get countryOptionsSorted$(): Observable<SelectableOption[]> {
    return this._countryOptions$.pipe(

      tap(countries => {
        countries.sort(function (a, b) {
          return IsoCountryService.MAIN_COUNTRIES_ISO_CODES.includes(a.value)
            ? -1 // if a is true, it should come first in the list
            : !IsoCountryService.MAIN_COUNTRIES_ISO_CODES.includes(a.value) && IsoCountryService.MAIN_COUNTRIES_ISO_CODES.includes(b.value)
              ? 1 // if a is true and b is false a should come later on
              : IsoCountryService.MAIN_COUNTRIES_ISO_CODES.includes(a.value) && !IsoCountryService.MAIN_COUNTRIES_ISO_CODES.includes(a.value)
                ? -1 // if a is false and b is true a should come earlier
                : a.label > b.label
                  ? 1 // if a.other > b.other, a must come later on
                  : a.label < b.label
                    ? -1 // if a.other < b.other, a must come earlier
                    : 0; // otherwise they are equal, so they hav
        });
      })
    );
  }
}
