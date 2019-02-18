import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { PavDashboardComponent } from './pav-dashboard/pav-dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { WidgetsModule } from '../widgets/widgets.module';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { JobSeekerDashboardComponent } from './job-seeker-dashboard/job-seeker-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { CompanyContactManagementComponent } from './user-settings/company-contact-management/company-contact-management.component';

@NgModule({
  declarations: [
    DashboardHeaderComponent,
    CompanyDashboardComponent,
    JobSeekerDashboardComponent,
    PavDashboardComponent,
    DashboardComponent,
    AdminDashboardComponent,
    UserSettingsComponent,
    CompanyContactManagementComponent
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    DashboardRoutingModule,
    NgbTooltipModule,
    WidgetsModule
  ],
  entryComponents: [],
  exports: [],
  providers: []
})
export class DashboardModule {

}

