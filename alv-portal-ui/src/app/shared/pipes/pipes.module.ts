import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './safe-html.pipe';
import { LocaleAwareDatePipe } from './locale-aware-date.pipe';
import { PhoneNumberPipe } from './phone-number.pipe';
import { CapitalizePipe } from './capitalize.pipe';
import { KeysPipe } from './enum-keys.pipe';
import { LocaleAwareDecimalPipe } from './locale-aware-number.pipe';
import { MarkdownModule } from 'ngx-markdown';
import { ShortenPipe } from './shorten.pipe';
import { MarkdownEscapePipe } from './markdown-escape.pipe';
import { WorkingTimeRangePipe } from './working-time-range.pipe';
import { NormalizeUrlPipe } from './normalize-url.pipe';

@NgModule({
  declarations: [
    SafeHtmlPipe,
    LocaleAwareDatePipe,
    WorkingTimeRangePipe,
    PhoneNumberPipe,
    CapitalizePipe,
    KeysPipe,
    LocaleAwareDecimalPipe,
    MarkdownEscapePipe,
    ShortenPipe,
    NormalizeUrlPipe
  ],
  providers: [
    LocaleAwareDatePipe,
    WorkingTimeRangePipe
  ],
  imports: [
    MarkdownModule.forRoot()
  ],
  entryComponents: [],
  exports: [
    SafeHtmlPipe,
    LocaleAwareDatePipe,
    WorkingTimeRangePipe,
    PhoneNumberPipe,
    CapitalizePipe,
    KeysPipe,
    LocaleAwareDecimalPipe,
    MarkdownEscapePipe,
    ShortenPipe,
    NormalizeUrlPipe
  ]
})
export class PipesModule {

}


