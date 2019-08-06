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
import { IsoCountryService } from './localities/iso-country.service';
import { GATrackingEventDirective } from './tracking/g-a-tracking-event.directive';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { CompanyContactManagementComponent } from './user-settings/company-contact-management/company-contact-management.component';
import { UploadProgressbarComponent } from './progress/upload-progressbar/upload-progressbar.component';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    DummyComponent,
    LegalTermsDirective,
    LegalTermsModalComponent,
    GATrackingEventDirective,
    UserSettingsComponent,
    CompanyContactManagementComponent,
    UploadProgressbarComponent
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
    IconsModule,
    NgbProgressbarModule
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
    LegalTermsDirective,
    GATrackingEventDirective,
    UserSettingsComponent,
    CompanyContactManagementComponent,
    UploadProgressbarComponent
  ],
  providers: [
    LandingPageGuard,
    IsoCountryService
  ]
})
export class SharedModule {

}


