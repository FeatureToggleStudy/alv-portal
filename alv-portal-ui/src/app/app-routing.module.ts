import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowcaseComponent } from './showcase/showcase.component';
import { AuthenticatedGuard } from './core/auth/authenticated.guard';
import { NotAuthenticatedGuard } from './core/auth/not-authenticated.guard';
import { LandingPageGuard } from './shared/landing-page/landing-page.guard';
import { DummyComponent } from './shared/dummy/dummy.component';
import { RedirectionGuard } from '../redirection.guard';

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
    loadChildren: './registration/registration.module#RegistrationModule',
    canActivateChild: [NotAuthenticatedGuard],
  },
  {
    path: 'job-search',
    loadChildren: './job-advertisement/job-ad-search/job-ad-search.module#JobAdSearchModule'
  },
  {
    path: 'candidate-search',
    loadChildren: './candidate-search/candidate-search.module#CandidateSearchModule'
  },
  {
    path: 'job-publication',
    loadChildren: './job-publication/job-publication.module#JobPublicationModule'
  },
  {
    path: 'manage-job-ads',
    loadChildren: './job-advertisement/manage-job-ads/manage-job-ads.module#ManageJobAdsModule',
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
  },
  {
    path: 'landing',
    component: DummyComponent,
    canActivate: [LandingPageGuard],
  },
  {
    path: 'showcase',
    component: ShowcaseComponent,
    data: { titleKey: 'portal.showcase.browser-title' }
  },
  {
    path: '**',
    canActivate: [RedirectionGuard],
    component: DummyComponent
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
