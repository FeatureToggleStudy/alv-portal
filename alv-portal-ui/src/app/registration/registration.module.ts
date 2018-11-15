import { NgModule } from '@angular/core';
import { AccessCodeComponent } from './access-code/access-code.component';
import { FinishRegistrationComponent } from './finish-registration/finish-registration.component';
import { RegistrationRoutingModule } from './registration-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RegistrationPanelComponent } from './registration-panel/registration-panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JobseekerIdentificationComponent } from './jobseeker/jobseeker-identification/jobseeker-identification.component';
import { RoleSelectionComponent } from './role-selection/role-selection.component';
import { CompanyUidComponent } from './company/company-uid/company-uid.component';
import { StepIndicatorComponent } from './step-indicator/step-indicator.component';
import { CompanyStepIndicatorComponent } from './company/company-step-indicator/company-step-indicator.component';
import { CompanyRequestAccessCodeComponent } from './company/company-request-access-code/company-request-access-code.component';

@NgModule({
  declarations: [
    AccessCodeComponent,
    FinishRegistrationComponent,
    RegistrationPanelComponent,
    JobseekerIdentificationComponent,
    RoleSelectionComponent,
    CompanyUidComponent,
    StepIndicatorComponent,
    CompanyStepIndicatorComponent,
    CompanyRequestAccessCodeComponent
  ],
  imports: [
      ReactiveFormsModule,
      RegistrationRoutingModule,
      SharedModule
  ],
  entryComponents: [],
  exports: [],
  providers: []
})
export class RegistrationModule {
}


