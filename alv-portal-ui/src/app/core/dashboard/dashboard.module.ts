import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from './widgets/dashboard-header/dashboard-header.component';
import { FindJobWidgetComponent } from './widgets/find-job-widget/find-job-widget.component';
import { FindCandidateWidgetComponent } from './widgets/find-candidate-widget/find-candidate-widget.component';
import { CompanyDashboardPageComponent } from './pages/company-dashboard-page/company-dashboard-page.component';
import { JobSeekerDashboardPageComponent } from './pages/job-seeker-dashboard-page/job-seeker-dashboard-page.component';
import { PavDashboardPageComponent } from './pages/pav-dashboard-page/pav-dashboard-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';


@NgModule({
  declarations: [
    DashboardHeaderComponent,
    FindJobWidgetComponent,
    FindCandidateWidgetComponent,
    CompanyDashboardPageComponent,
    JobSeekerDashboardPageComponent,
    PavDashboardPageComponent,
    LandingPageComponent
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    CommonModule
  ],
  entryComponents: [],
  exports: [
    DashboardHeaderComponent,
    FindJobWidgetComponent,
    FindCandidateWidgetComponent,
    CompanyDashboardPageComponent,
    JobSeekerDashboardPageComponent,
    PavDashboardPageComponent,
    LandingPageComponent
  ],
  providers: []
})
export class DashboardModule {

}

