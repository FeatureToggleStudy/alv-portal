import { NgModule } from '@angular/core';
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
    ClipboardModule
  ]
})
export class SharedModule {
}


