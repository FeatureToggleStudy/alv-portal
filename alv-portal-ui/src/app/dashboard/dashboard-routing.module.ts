import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { JobSeekerDashboardComponent } from './job-seeker-dashboard/job-seeker-dashboard.component';
import { PavDashboardComponent } from './pav-dashboard/pav-dashboard.component';
import { NavigationGuard } from '../core/auth/navigation-guard.service';
import { DashboardComponent } from './dashboard.component';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ContactTemplateManagementComponent } from './contact-template-management/contact-template-management.component';
import { UserRole } from '../core/auth/user.model';
import { HasAnyAuthoritiesGuard } from '../core/auth/has-any-authorities-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [NavigationGuard]
  },
  {
    path: '',
    component: DashboardComponent,
    canActivateChild: [HasAnyAuthoritiesGuard],
    children: [
      {
        path: 'job-seeker',
        component: JobSeekerDashboardComponent,
        data: {
          titleKey: 'portal.home.job-seeker.browser-title',
          authorities: [UserRole.ROLE_JOB_SEEKER]
        }
      },
      {
        path: 'pav',
        component: PavDashboardComponent,
        data: {
          titleKey: 'portal.home.company.browser-title',
          authorities: [UserRole.ROLE_PAV]
        }
      },
      {
        path: 'company',
        component: CompanyDashboardComponent,
        data: {
          titleKey: 'portal.home.pav.browser-title',
          authorities: [UserRole.ROLE_COMPANY]
        }
      },
      {
        path: 'admin',
        component: AdminDashboardComponent,
        data: {
          titleKey: 'portal.home.admin.browser-title',
          authorities: [UserRole.ROLE_ADMIN]
        }
      }
    ]
  },
  {
    path: 'contact-template',
    component: ContactTemplateManagementComponent,
    canActivate: [HasAnyAuthoritiesGuard],
    data: {
      titleKey: 'portal.dashboard.contact-template-management.browser-title',
      authorities: [UserRole.ROLE_PAV, UserRole.ROLE_COMPANY]
    }
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
