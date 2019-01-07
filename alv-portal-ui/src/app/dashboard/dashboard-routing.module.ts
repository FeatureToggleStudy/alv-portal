import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { JobSeekerDashboardComponent } from './job-seeker-dashboard/job-seeker-dashboard.component';
import { PavDashboardComponent } from './pav-dashboard/pav-dashboard.component';
import { NavigationGuard } from '../core/auth/navigation-guard.service';
import { DashboardComponent } from './dashboard.component';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ContactTemplateManagementComponent } from './contact-template-management/contact-template-management.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [NavigationGuard]
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'job-seeker',
        component: JobSeekerDashboardComponent,
        data: { titleKey: 'portal.home.job-seeker.browser-title' }
      },
      {
        path: 'pav',
        component: PavDashboardComponent,
        data: { titleKey: 'portal.home.company.browser-title' }
      },
      {
        path: 'company',
        component: CompanyDashboardComponent,
        data: { titleKey: 'portal.home.pav.browser-title' }
      },
      {
        path: 'admin',
        component: AdminDashboardComponent,
        data: { titleKey: 'portal.home.admin.browser-title' }
      }
    ]
  },
  {
    path: 'contact-template',
    component: ContactTemplateManagementComponent,
    data: { titleKey: 'portal.dashboard.contact-template-management.browser-title' }
  },
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
