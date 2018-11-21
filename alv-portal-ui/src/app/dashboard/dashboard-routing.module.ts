import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { JobSeekerDashboardPageComponent } from './pages/job-seeker-dashboard-page/job-seeker-dashboard-page.component';
import { PavDashboardPageComponent } from './pages/pav-dashboard-page/pav-dashboard-page.component';
import { NavigationGuard } from '../core/auth/navigation-guard.service';
import { DashboardPageComponent } from './pages/dashboard-page.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [NavigationGuard]
  },
  {
    path: '',
    component: DashboardPageComponent,
    children: [
      {
        path: 'job-seeker',
        component: JobSeekerDashboardPageComponent,
        data: { titleKey: 'JOB_SEEKER_DASHBOARD_PAGE', collapsed: true }
      },
      {
        path: 'pav',
        component: PavDashboardPageComponent,
        data: { titleKey: 'PAV_DASHBOARD_PAGE', collapsed: true }
      },
      {
        path: 'company',
        component: PavDashboardPageComponent,
        data: { titleKey: 'COMPANY_DASHBOARD_PAGE', collapsed: true }
      }
    ]
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
