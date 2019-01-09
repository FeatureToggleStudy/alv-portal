import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './shared/landing-page/landing-page.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { AuthenticatedGuard } from './core/auth/authenticated.guard';
import { NotAuthenticatedGuard } from './core/auth/not-authenticated.guard';
import { LandingPageGuard } from './shared/landing-page/landing-page.guard';

const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
    canActivateChild: [NotAuthenticatedGuard],
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivateChild: [AuthenticatedGuard],
  },
  {
    path: 'registration',
    loadChildren: './registration/registration.module#RegistrationModule'
  },
  {
    path: 'job-search',
    loadChildren: './job-ad-search/job-ad-search.module#JobAdSearchModule'
  },
  {
    path: 'candidate-search',
    loadChildren: './candidate-search/candidate-search.module#CandidateSearchModule'
  },
  {
    path: 'manage-job-ads',
    loadChildren: './manage-job-ads/manage-job-ads.module#ManageJobAdsModule'
  },
  {
    path: 'landing',
    component: LandingPageComponent,
    canActivate: [LandingPageGuard],
  },
  {
    path: 'showcase',
    component: ShowcaseComponent,
    data: { titleKey: 'portal.showcase.browser-title' }
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
