import { ErrorHandler, LOCALE_ID, NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { AuthModule } from './auth/auth.module';
import { CookieService } from 'ngx-cookie-service';
import { GlobalErrorHandler } from './error-handler/global-error-handler';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { coreReducers } from './state-management/reducers/core.reducers';
import { CoreEffects } from './state-management/effects/core.effects';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../../environments/environment';
import { XhrMarkerInterceptor } from './xhr-marker.interceptor';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/de';
import localeFr from '@angular/common/locales/fr';
import localeIt from '@angular/common/locales/it';
import localeEn from '@angular/common/locales/en';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, environment.translationBaseUrl, '.json');
}

export function LocalIdFactory(translateService: TranslateService) {
  return translateService.currentLang;
}

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    AuthModule,
    StoreModule.forRoot({ coreState: coreReducers }),
    EffectsModule.forRoot([CoreEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    AuthModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: LocalIdFactory,
      deps: [TranslateService]
    },
    CookieService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: XhrMarkerInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  /**
   * Prevent reimport of CoreModule
   * @param parentModule will be `null` if {@link CoreModule} is not reimported by another module,
   * otherwise it will throw an error.
   */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
    registerLocaleData(locale);
    registerLocaleData(localeFr);
    registerLocaleData(localeIt);
    registerLocaleData(localeEn);
  }
}

