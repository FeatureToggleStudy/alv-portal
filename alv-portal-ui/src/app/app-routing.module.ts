import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './core/dashboard/landing-page/landing-page.component';
import { JobSeekerDashboardPageComponent } from './core/dashboard/job-seeker-dashboard-page/job-seeker-dashboard-page.component';
import { PavDashboardPageComponent } from './core/dashboard/pav-dashboard-page/pav-dashboard-page.component';
import { HomePageComponent } from './core/home-page/home-page.component';
import { JobSeekerHomePageComponent } from './core/home-page/job-seeker-home-page/job-seeker-home-page.component';
import { CompanyHomePageComponent } from './core/home-page/company-home-page/company-home-page.component';
import { PavHomePageComponent } from './core/home-page/pav-home-page/pav-home-page.component';
import { AuthGuardService } from './core/auth/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      {
        path: '',
        redirectTo: '/home/job-seeker',
        pathMatch: 'full',
      },
      {
        path: 'job-seeker',
        component: JobSeekerHomePageComponent,
        data: { titleKey: 'JOB_SEEKER_HOME_PAGE' }
      },
      {
        path: 'company',
        component: CompanyHomePageComponent,
        data: { titleKey: 'COMPANY_HOME_PAGE' }
      },
      {
        path: 'pav',
        component: PavHomePageComponent,
        data: { titleKey: 'PAV_HOME_PAGE' }
      }
    ]
  },
  {
    path: 'dashboard',
    canActivateChild: [AuthGuardService],
    children: [
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
    ]
  },
  {
    path: 'registration',
    loadChildren: './registration/registration.module#RegistrationModule'
  },
  {
    path: 'landing',
    component: LandingPageComponent,
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: false }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
