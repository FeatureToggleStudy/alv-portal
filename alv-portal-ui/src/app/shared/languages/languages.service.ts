import { Injectable } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { SelectableOption } from '../forms/input/selectable-option.model';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { Language } from '../backend-services/shared.types';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor(private i18nService: I18nService) {
  }

  getLanguages(): Observable<SelectableOption[]> {
    return this.i18nService.currentLanguage$.pipe(
      flatMap(currentLang => this.i18nService.stream(Object.values(Language).slice(5)
        .map(lang => 'global.reference.language.' + lang))),
      map(translatedKeys => [
          {
            value: null,
            label: 'global.reference.language.no-selection'
          },
          ...Object.values(Language).slice(0, 5).map(language => {
            return {
              value: language,
              label: 'global.reference.language.' + language
            };
          }),
          ...Object.values(Language).slice(5)
            .map(language => {
              return {
                value: language,
                label: translatedKeys['global.reference.language.' + language]
              };
            }).sort((a, b) => {
                if (a.label < b.label) {
                  return -1;
                }
                if (a.label > b.label) {
                  return 1;
                }
                return 0;
              }
            )
        ]
      )
    );
  }
}
