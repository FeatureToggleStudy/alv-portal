import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { JobSeekerDashboardComponent } from './job-seeker-dashboard/job-seeker-dashboard.component';
import { PavDashboardComponent } from './pav-dashboard/pav-dashboard.component';
import { NavigationGuard } from '../core/auth/navigation-guard.service';
import { DashboardComponent } from './dashboard.component';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
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
          authorities: [UserRole.ROLE_JOB_SEEKER],
          collapseNavigation: false,
          scrollToTop: true
        }
      },
      {
        path: 'pav',
        component: PavDashboardComponent,
        data: {
          titleKey: 'portal.home.company.browser-title',
          authorities: [UserRole.ROLE_PAV],
          collapseNavigation: false,
          scrollToTop: true
        }
      },
      {
        path: 'company',
        component: CompanyDashboardComponent,
        data: {
          titleKey: 'portal.home.pav.browser-title',
          authorities: [UserRole.ROLE_COMPANY],
          collapseNavigation: false,
          scrollToTop: true
        }
      },
      {
        path: 'admin',
        component: AdminDashboardComponent,
        data: {
          titleKey: 'portal.home.admin.browser-title',
          authorities: [UserRole.ROLE_ADMIN, UserRole.ROLE_SYSADMIN],
          collapseNavigation: false,
          scrollToTop: true
        }
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
