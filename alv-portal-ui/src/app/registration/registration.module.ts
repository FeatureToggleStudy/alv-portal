import { NgModule } from '@angular/core';
import { AccessCodeComponent } from './access-code/access-code.component';
import { FinishRegistrationComponent } from './finish-registration/finish-registration.component';
import { RegistrationRoutingModule } from './registration-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RegistrationPanelComponent } from './registration-panel/registration-panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JobseekerIdentificationComponent } from './finish-registration/jobseeker/jobseeker-identification/jobseeker-identification.component';
import { RoleSelectionComponent } from './finish-registration/role-selection/role-selection.component';
import { CompanyIdentificationComponent } from './finish-registration/company/company-identification/company-identification.component';
import { CompanyRequestAccessCodeComponent } from './finish-registration/company/company-request-access-code/company-request-access-code.component';
import { PavIdentificationComponent } from './finish-registration/pav/pav-identification/pav-identification.component';
import { PavRequestAccessCodeComponent } from './finish-registration/pav/pav-request-access-code/pav-request-access-code.component';

@NgModule({
  declarations: [
    AccessCodeComponent,
    FinishRegistrationComponent,
    RegistrationPanelComponent,
    JobseekerIdentificationComponent,
    RoleSelectionComponent,
    CompanyIdentificationComponent,
    CompanyRequestAccessCodeComponent,
    PavIdentificationComponent,
    PavRequestAccessCodeComponent
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


