import { NgModule } from '@angular/core';
import { AccessCodeComponent } from './access-code/access-code.component';
import { FinishRegistrationComponent } from './finish-registation/finish-registration.component';
import { RegistrationRoutingModule } from './registration-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RegistrationPanelComponent } from './registration-panel/registration-panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JobseekerIdentificationComponent } from './jobseeker/jobseeker-identification/jobseeker-identification.component';
import { RoleSelectionComponent } from './role-selection/role-selection.component';
import { CompanyUidComponent } from './company/company-uid/company-uid.component';

@NgModule({
  declarations: [
    AccessCodeComponent,
    FinishRegistrationComponent,
    RegistrationPanelComponent,
    JobseekerIdentificationComponent,
    RoleSelectionComponent,
    CompanyUidComponent
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


