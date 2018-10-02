import { NgModule } from '@angular/core';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { OnlineFormsComponent } from './online-forms.component';
import { OnlineFormsRoutingModule } from './online-forms-routing.module';

import { CommonModule } from '@angular/common';
import { AvpFormComponent } from './forms/avp-form/avp-form.component';
import { EmploymentsComponent } from './forms/avp-form/employments/employments.component';
import { AbsencesComponent } from './forms/avp-form/absences/absences.component';
import { IncapacitiesComponent } from './forms/avp-form/incapacities/incapacities.component';
import { MiscellaneousComponent } from './forms/avp-form/miscellaneous/miscellaneous.component';
import { AttachmentsOverviewComponent } from './forms/avp-form/attachments-overview/attachments-overview.component';
import { ConfirmationComponent } from './forms/avp-form/confirmation/confirmation.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OnlineFormsComponent,
    AvpFormComponent,
    EmploymentsComponent,
    AbsencesComponent,
    IncapacitiesComponent,
    AttachmentsOverviewComponent,
    MiscellaneousComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OnlineFormsRoutingModule,
    //NgbTabsetModule.forRoot(),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class OnlineFormsModule {
}
