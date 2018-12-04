import { Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { FALLBACK_LANGUAGE, LANGUAGES } from './languages.constants';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

const LANGUAGE_KEY = 'NG_TRANSLATE_LANG_KEY';


/**
 * This service wraps the ngx-translate Translate service adding persistency to it.
 * More precisely it stores the language in a persistent memory and judges which language
 * will be default.
 */
@Injectable({
  providedIn: 'root'
})
export class I18nService {

  private readonly currentLanguage$: Observable<string>;

  constructor(private translateService: TranslateService,
              private cookieService: CookieService) {
    // all changes in ngx-translate will be mirrored in currentLanguage$ observable
    this.currentLanguage$ = this.translateService.onLangChange.pipe(
      startWith({
        lang: this.translateService.currentLang,
        translations: {}
      }),
      map((evt: LangChangeEvent) => evt.lang)
    );
  }


  get currentLanguage(): Observable<string> {
    return this.currentLanguage$;
  }

  /**
   * A function is meant to run in the beginning of the application
   */
  initAppDefaultLanguage(): void {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translateService.setDefaultLang(FALLBACK_LANGUAGE);
    this.translateService.use(this.getAppDefaultLanguage());
  }

  /**
   * Changes the current language of the application and saves in the persistent memory
   * @param languageKey
   */
  changeLanguage(languageKey: string): void {
    this.saveLangugeInPersistentMemory(languageKey);
    this.translateService.use(languageKey);
  }

  /**
   * delegate to ngxTranslateService.get
   */
  get(key: string | Array<string>, interpolateParams?: Object): Observable<string | any> {
    return this.translateService.get(key, interpolateParams);
  }

  private isLanguagePersisted(): boolean {
    return (this.cookieService.check(LANGUAGE_KEY));
  }

  private saveLangugeInPersistentMemory(language: string): void {
    this.cookieService.set(LANGUAGE_KEY, language);
  }

  private getPersistentLanguage(): string | null {
    return this.isLanguagePersisted() ? this.cookieService.get(LANGUAGE_KEY) : null;
  }

  private isValid(language: string): boolean {
    return LANGUAGES.includes(language);
  }

  private getAppDefaultLanguage(): string {
    const defaultLangauge = this.isLanguagePersisted()
      ? this.getPersistentLanguage()
      : this.translateService.getBrowserLang();
    return this.isValid(defaultLangauge)
      ? defaultLangauge
      : FALLBACK_LANGUAGE;
  }
}
