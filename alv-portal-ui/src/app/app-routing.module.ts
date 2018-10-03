import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './core/landing/landing-page/landing-page.component';
import { JobSeekerDashboardPageComponent } from './core/landing/job-seeker-dashboard-page/job-seeker-dashboard-page.component';
import { PavDashboardPageComponent } from './core/landing/pav-dashboard-page/pav-dashboard-page.component';
import { FinishRegistrationPageComponent } from './registration/finish-registation-page/finish-registration-page.component';
import { HomePageComponent } from './core/home-page/home-page.component';
import { JobSeekerHomePageComponent } from './core/home-page/job-seeker-home-page/job-seeker-home-page.component';
import { CompanyHomePageComponent } from './core/home-page/company-home-page/company-home-page.component';
import { PavHomePageComponent } from './core/home-page/pav-home-page/pav-home-page.component';
import { AccessCodeRegistrationPageComponent } from './registration/access-code-registration-page/access-code-registration-page.component';

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
        component: JobSeekerHomePageComponent
      },
      {
        path: 'company',
        component: CompanyHomePageComponent
      },
      {
        path: 'pav',
        component: PavHomePageComponent
      }
    ]
  },
  {
    path: 'dashboard',
    children: [
      {
        path: 'job-seeker',
        component: JobSeekerDashboardPageComponent
      },
      {
        path: 'pav',
        component: PavDashboardPageComponent
      },
      {
        path: 'company',
        component: PavDashboardPageComponent //right now we provide the same page for pva and the company
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
