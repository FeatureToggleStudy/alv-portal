import { NgModule } from '@angular/core';
import { AccessCodeComponent } from './access-code/access-code.component';
import { FinishRegistrationComponent } from './finish-registration/finish-registration.component';
import { RegistrationRoutingModule } from './registration-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RegistrationPanelComponent } from './registration-panel/registration-panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JobseekerIdentificationComponent } from './jobseeker/jobseeker-identification/jobseeker-identification.component';
import { RoleSelectionComponent } from './role-selection/role-selection.component';
import { CompanyIdentificationComponent } from './company/company-identification/company-identification.component';
import { StepIndicatorComponent } from './step-indicator/step-indicator.component';
import { CompanyStepIndicatorComponent } from './company/company-step-indicator/company-step-indicator.component';
import { CompanyRequestAccessCodeComponent } from './company/company-request-access-code/company-request-access-code.component';
import { PavIdentificationComponent } from './pav/pav-identification/pav-identification.component';
import { PavRequestAccessCodeComponent } from './pav/pav-request-access-code/pav-request-access-code.component';
import { PavStepIndicatorComponent } from './pav/pav-step-indicator/pav-step-indicator.component';

@NgModule({
  declarations: [
    AccessCodeComponent,
    FinishRegistrationComponent,
    RegistrationPanelComponent,
    JobseekerIdentificationComponent,
    RoleSelectionComponent,
    CompanyIdentificationComponent,
    StepIndicatorComponent,
    CompanyStepIndicatorComponent,
    CompanyRequestAccessCodeComponent,
    PavIdentificationComponent,
    PavRequestAccessCodeComponent,
    PavStepIndicatorComponent
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


