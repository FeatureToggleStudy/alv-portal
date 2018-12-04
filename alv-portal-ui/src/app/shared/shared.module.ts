import { LOCALE_ID, NgModule } from '@angular/core';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { TranslateModule } from '@ngx-translate/core';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LayoutModule } from './layout/layout.module';
import { FormsModule as AlvFormsModule } from './forms/forms.module';
import { SharedAuthModule } from './auth/shared-auth.module';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { LocaleAwareDatePipe } from './pipes/locale-aware-date.pipe';
import { WorkingTimeRangePipe } from './pipes/working-time-range.pipe';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import { ClipboardModule } from 'ngx-clipboard';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/de';
import localeFr from '@angular/common/locales/fr';
import localeIt from '@angular/common/locales/it';
import localeEn from '@angular/common/locales/en';
import { MarkdownModule } from 'ngx-markdown';
import { JobAdvertisementRepository } from './backend-services/job-advertisement/job-advertisement.repository';

@NgModule({
  declarations: [
    LandingPageComponent,
    SafeHtmlPipe,
    LocaleAwareDatePipe,
    WorkingTimeRangePipe,
    PhoneNumberPipe
  ],
  imports: [
    AlvFormsModule,
    PrettyJsonModule,
    LayoutModule,
    SharedAuthModule,
    ClipboardModule,
    MarkdownModule.forRoot(),
    SharedAuthModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'de'
    },
    JobAdvertisementRepository

  ],
  entryComponents: [],
  exports: [
    TranslateModule,
    AlvFormsModule,
    LandingPageComponent,
    LayoutModule,
    SafeHtmlPipe,
    LocaleAwareDatePipe,
    WorkingTimeRangePipe,
    PhoneNumberPipe,
    ClipboardModule,
    MarkdownModule
  ]
})
export class SharedModule {
  constructor() {
    registerLocaleData(locale);
    registerLocaleData(localeFr);
    registerLocaleData(localeIt);
    registerLocaleData(localeEn);
  }
}


