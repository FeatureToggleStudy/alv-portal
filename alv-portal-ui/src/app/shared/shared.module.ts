import { LOCALE_ID, NgModule } from '@angular/core';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { TranslateModule } from '@ngx-translate/core';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LayoutModule } from './layout/layout.module';
import { FormsModule as AlvFormsModule } from './forms/forms.module';
import { SharedAuthModule } from './auth/shared-auth.module';
import { ClipboardModule } from 'ngx-clipboard';
import { CommonModule, registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/de';
import localeFr from '@angular/common/locales/fr';
import localeIt from '@angular/common/locales/it';
import localeEn from '@angular/common/locales/en';
import { MarkdownModule } from 'ngx-markdown';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [
    LandingPageComponent,
  ],
  imports: [
    AlvFormsModule,
    PrettyJsonModule,
    LayoutModule,
    SharedAuthModule,
    ClipboardModule,
    PipesModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'de'
    }
  ],
  entryComponents: [],
  exports: [
    CommonModule,
    TranslateModule,
    AlvFormsModule,
    LandingPageComponent,
    LayoutModule,
    PipesModule,
    ClipboardModule,
    MarkdownModule,
    SharedAuthModule
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


