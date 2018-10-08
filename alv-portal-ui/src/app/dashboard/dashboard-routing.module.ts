import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { JobSeekerDashboardPageComponent } from './pages/job-seeker-dashboard-page/job-seeker-dashboard-page.component';
import { PavDashboardPageComponent } from './pages/pav-dashboard-page/pav-dashboard-page.component';
import { NavigationGuard } from '../core/auth/navigation-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [NavigationGuard]
  },
  {
    path: 'job-seeker',
    component: JobSeekerDashboardPageComponent,
    data: { titleKey: 'JOB_SEEKER_DASHBOARD_PAGE' }
  },
  {
    path: 'pav',
    component: PavDashboardPageComponent,
    data: { titleKey: 'PAV_DASHBOARD_PAGE' }
  },
  {
    path: 'company',
    component: PavDashboardPageComponent,
    data: { titleKey: 'COMPANY_DASHBOARD_PAGE' }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(
        routes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule {
}
