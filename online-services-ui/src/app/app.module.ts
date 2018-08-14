import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AbsencesComponent } from './forms/avp-form/absences/absences.component';
import { AttachmentsOverviewComponent } from './forms/avp-form/attachments-overview/attachments-overview.component';
import { AvpFormComponent } from './forms/avp-form/avp-form.component';
import { ConfirmationComponent } from './forms/avp-form/confirmation/confirmation.component';
import { IncapacitiesComponent } from './forms/avp-form/incapacities/incapacities.component';
import { MiscellaneousComponent } from './forms/avp-form/miscellaneous/miscellaneous.component';
import { EmploymentsComponent } from './forms/avp-form/employments/employments.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    AvpFormComponent,
    EmploymentsComponent,
    AbsencesComponent,
    IncapacitiesComponent,
    AttachmentsOverviewComponent,
    MiscellaneousComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbTabsetModule.forRoot(),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
