import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EmploymentsComponent } from './forms/avp-form/employments/employments.component';
import { SharedModule } from './shared/shared.module';
import { AvpFormComponent } from './forms/avp-form/avp-form.component';
import { AbsencesComponent } from './forms/avp-form/absences/absences.component';
import { IncapacitiesComponent } from './forms/avp-form/incapacities/incapacities.component';
import { ConfirmationComponent } from './forms/avp-form/confirmation/confirmation.component';
import { AttachmentsOverviewComponent } from './forms/avp-form/attachments-overview/attachments-overview.component';
import { MiscellaneousComponent } from './forms/avp-form/miscellaneous/miscellaneous.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';

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
    SharedModule,
    AppRoutingModule,
    NgbTabsetModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
