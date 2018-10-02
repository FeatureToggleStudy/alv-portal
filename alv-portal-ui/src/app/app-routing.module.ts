import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './core/landing/landing-page/landing-page.component';
import { JobSeekerDashboardPageComponent } from './core/landing/job-seeker-dashboard-page/job-seeker-dashboard-page.component';
import { PavDashboardPageComponent } from './core/landing/pav-dashboard-page/pav-dashboard-page.component';
import { FinishRegistrationPageComponent } from './core/finish-registation-page/finish-registration-page.component';
import { HomePageComponent } from './core/home-page/home-page.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePageComponent
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
    path: 'nza',
    component: FinishRegistrationPageComponent
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
