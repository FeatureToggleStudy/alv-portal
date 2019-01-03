import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './safe-html.pipe';
import { LocaleAwareDatePipe } from './locale-aware-date.pipe';
import { PhoneNumberPipe } from './phone-number.pipe';
import { MarkdownModule } from 'ngx-markdown';
import { MarkdownEscapePipe } from './markdown-escape.pipe';
import { WorkingTimeRangePipe } from './working-time-range.pipe';
import { NormalizeUrlPipe } from './normalize-url.pipe';
import { KeysPipe } from './enum-keys.pipe';

@NgModule({
  declarations: [
    SafeHtmlPipe,
    LocaleAwareDatePipe,
    WorkingTimeRangePipe,
    PhoneNumberPipe,
    MarkdownEscapePipe,
    NormalizeUrlPipe,
    KeysPipe
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
    MarkdownEscapePipe,
    NormalizeUrlPipe,
    KeysPipe
  ]
})
export class PipesModule {

}


