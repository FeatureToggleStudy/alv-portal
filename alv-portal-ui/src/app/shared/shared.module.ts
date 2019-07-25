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
import { TrackingEventDirective } from './tracking/tracking-event.directive';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { CompanyContactManagementComponent } from './user-settings/company-contact-management/company-contact-management.component';
import { ProgressbarComponent } from './progress/progressbar/progressbar.component';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    DummyComponent,
    LegalTermsDirective,
    LegalTermsModalComponent,
    TrackingEventDirective,
    UserSettingsComponent,
    CompanyContactManagementComponent,
    ProgressbarComponent
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
    TrackingEventDirective,
    UserSettingsComponent,
    CompanyContactManagementComponent,
    ProgressbarComponent
  ],
  providers: [
    LandingPageGuard,
    IsoCountryService
  ]
})
export class SharedModule {

}


