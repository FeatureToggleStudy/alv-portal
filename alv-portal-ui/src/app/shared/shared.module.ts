import { NgModule } from '@angular/core';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from './layout/layout.module';
import { FormsModule as AlvFormsModule } from './forms/forms.module';
import { SharedAuthModule } from './auth/shared-auth.module';
import { ClipboardModule } from 'ngx-clipboard';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { PipesModule } from './pipes/pipes.module';
import { LandingPageGuard } from './landing-page/landing-page.guard';
import { DummyComponent } from './dummy/dummy.component';
import { IconsModule } from './icons/icons.module';
import { LegalTermsDirective } from './legal-terms/legal-terms.directive';
import { LegalTermsModalComponent } from './legal-terms/legal-terms-modal/legal-terms-modal.component';

@NgModule({
  declarations: [
    DummyComponent,
    LegalTermsDirective,
    LegalTermsModalComponent
  ],
  imports: [
    TranslateModule.forChild(),
    CommonModule,
    AlvFormsModule,
    PrettyJsonModule,
    LayoutModule,
    SharedAuthModule,
    ClipboardModule,
    PipesModule,
    IconsModule
  ],
  entryComponents: [
    LegalTermsModalComponent
  ],
  exports: [
    CommonModule,
    TranslateModule,
    AlvFormsModule,
    DummyComponent,
    LayoutModule,
    PipesModule,
    ClipboardModule,
    MarkdownModule,
    SharedAuthModule,
    IconsModule,
    LegalTermsDirective
  ],
  providers: [
    LandingPageGuard
  ]
})
export class SharedModule {

}


