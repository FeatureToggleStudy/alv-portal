import { Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { LANGUAGES } from './languages.constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const LANGUAGE_KEY = 'NG_TRANSLATE_LANG_KEY';
const FALLBACK_LANGUAGE = 'en';


/**
 * This service wraps the ngx-translate Translate service adding persistency to it.
 * More precisely it stores the language in a persistent memory and judges which language
 * will be default.
 */
@Injectable({
  providedIn: 'root'
})
export class I18nService {

  private currentLanguage$: Observable<string>;

  constructor(private ngxTranslateService: TranslateService,
              private persistentMemoryService: CookieService) {
    // all changes in ngx-translate will be mirrored in currentLanguage$ observable
    this.currentLanguage$ = this.ngxTranslateService.onLangChange.pipe(
        map((evt: LangChangeEvent) => evt.lang)
    );
  }

  get currentLanguage(): Observable<string> {
    return this.currentLanguage$;
  }

  /**
   * A function is meant to run in the beginning of the application
   */
  init() {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.ngxTranslateService.setDefaultLang(FALLBACK_LANGUAGE);
    this.ngxTranslateService.use(this.getAppDefaultLanguage());
  }

  /**
   * Changes the current language of the application and saves in the persistent memory
   * @param languageKey
   */
  changeLanguage(languageKey: string) {
    this.setPersistentLanguage(languageKey);
    this.ngxTranslateService.use(languageKey);
  }

  private isPersistentLanguageExists() {
    return (this.persistentMemoryService.check(LANGUAGE_KEY));
  }

  private setPersistentLanguage(language: string) {
    this.persistentMemoryService.set(LANGUAGE_KEY, language);
  }

  private getPersistentLanguage(): string | null {
    return this.isPersistentLanguageExists() ? this.persistentMemoryService.get(LANGUAGE_KEY) : null;
  }

  private isValid(language: string) {
    return LANGUAGES.indexOf(language) > -1;
  }

  private getAppDefaultLanguage() {
    if (this.isPersistentLanguageExists()) {
      const persistedLanguage = this.getPersistentLanguage();
      if (this.isValid(persistedLanguage)) {
        return persistedLanguage;
      }
    } else { // if the language has never been saved in persistent memory
      const browserLanguage = this.ngxTranslateService.getBrowserLang();
      if (this.isValid(browserLanguage)) {
        return browserLanguage;
      }
    }
    return FALLBACK_LANGUAGE;
  }
}
