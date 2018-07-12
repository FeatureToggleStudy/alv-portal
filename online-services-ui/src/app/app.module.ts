import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AvpInfoComponent} from './forms/avp-info/avp-info.component';
import {MonthlyEmploymentsComponent} from './forms/avp-info/monthly-employments/monthly-employments.component';
import {AbsencesComponent} from './forms/avp-info/absences/absences.component';
import {IncapacitiesComponent} from './forms/avp-info/incapacities/incapacities.component';
import {AttachmentsOverviewComponent} from './forms/avp-info/attachments-overview/attachments-overview.component';
import {MiscellaneousComponent} from './forms/avp-info/miscellaneous/miscellaneous.component';
import {ConfirmationComponent} from './forms/avp-info/confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    AvpInfoComponent,
    MonthlyEmploymentsComponent,
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
    NgbTabsetModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
