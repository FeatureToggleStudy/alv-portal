import { Injectable } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { SelectableOption } from '../forms/input/selectable-option.model';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { Language } from '../backend-services/shared.types';
import * as countries from 'i18n-iso-countries';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  public static readonly MAIN_LANGUAGES_ISO_CODES_ORDER = {
    'de': 1,
    'fr': 2,
    'it': 3,
    'en': 4,
    'de-ch': 5
  };

  private readonly _languageOptions$: Observable<SelectableOption[]>;

  constructor(private i18nService: I18nService) {
    this._languageOptions$ = this.i18nService.currentLanguage$.pipe(
      flatMap(currentLang => this.i18nService.stream(
        Object.values(Language).map(lang => 'global.reference.language.' + lang)
      ))
    );
  }

  getLanguages(addEmptySelection?: boolean): Observable<SelectableOption[]> {
    return this._languageOptions$.pipe(
      map(translatedKeys => {
        return Object.values(Language).map(language => {
          return {
            value: language,
            label: translatedKeys['global.reference.language.' + language]
          };
        });
      }),
      map(c => {
        c.sort((a, b) => {
          const aWeight = LanguagesService.MAIN_LANGUAGES_ISO_CODES_ORDER[a.value];
          const bWeight = LanguagesService.MAIN_LANGUAGES_ISO_CODES_ORDER[b.value];
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

        if (addEmptySelection) {
          c.splice(0, 0, {
            value: null,
            label: 'global.reference.language.no-selection'
          });
        }
        return c;
      })
    );
  }
}
