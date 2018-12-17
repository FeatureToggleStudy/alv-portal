import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { JobSeekerDashboardPageComponent } from './pages/job-seeker-dashboard-page/job-seeker-dashboard-page.component';
import { PavDashboardPageComponent } from './pages/pav-dashboard-page/pav-dashboard-page.component';
import { NavigationGuard } from '../core/auth/navigation-guard.service';
import { DashboardPageComponent } from './pages/dashboard-page.component';
import { CompanyDashboardPageComponent } from './pages/company-dashboard-page/company-dashboard-page.component';

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
        data: { titleKey: 'portal.home.job-seeker.browser-title' }
      },
      {
        path: 'pav',
        component: PavDashboardPageComponent,
        data: { titleKey: 'portal.home.company.browser-title' }
      },
      {
        path: 'company',
        component: CompanyDashboardPageComponent,
        data: { titleKey: 'portal.home.pav.browser-title' }
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
