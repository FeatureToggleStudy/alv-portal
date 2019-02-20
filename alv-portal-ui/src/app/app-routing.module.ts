import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowcaseComponent } from './showcase/showcase.component';
import { AuthenticatedGuard } from './core/auth/authenticated.guard';
import { NotAuthenticatedGuard } from './core/auth/not-authenticated.guard';
import { LandingPageGuard } from './shared/landing-page/landing-page.guard';
import { DummyComponent } from './shared/dummy/dummy.component';
import { LegacyUrlStrategyRedirectionGuard } from '../legacy-url-strategy-redirection-guard.service';
import { UserRole } from './core/auth/user.model';
import { HasAnyAuthoritiesGuard } from './core/auth/has-any-authorities-guard.service';
import { UserSettingsComponent } from './shared/user-settings/user-settings.component';

const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
    canActivateChild: [NotAuthenticatedGuard],
  },
  {
    path: 'registration',
    loadChildren: './registration/registration.module#RegistrationModule',
    canActivateChild: [NotAuthenticatedGuard],
    data: {
      titleKey: 'portal.registration.browser-title'
    }
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivateChild: [AuthenticatedGuard]
  },
  {
    path: 'job-search',
    loadChildren: './job-advertisement/job-ad-search/job-ad-search.module#JobAdSearchModule',
    data: {
      collapseNavigation: true,
      titleKey: 'portal.job-ad-search.browser-title'
    }
  },
  {
    path: 'candidate-search',
    loadChildren: './candidate-search/candidate-search.module#CandidateSearchModule',
    data: {
      collapseNavigation: true,
      titleKey: 'portal.candidate-search.browser-title'
    }
  },
  {
    path: 'job-publication',
    loadChildren: './job-advertisement/job-publication/job-publication.module#JobPublicationModule',
    data: {
      titleKey: 'portal.job-publication.browser-title'
    }
  },
  {
    path: 'manage-job-ads',
    loadChildren: './job-advertisement/manage-job-ads/manage-job-ads.module#ManageJobAdsModule',
    data: {
      titleKey: 'portal.manage-job-ads.browser-title'
    }
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivateChild: [HasAnyAuthoritiesGuard],
    data: {
      authorities: [UserRole.ROLE_SYSADMIN]
    }
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
    path: 'user-settings',
    component: UserSettingsComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      titleKey: 'portal.dashboard.user-settings.main.title'
    }
  },
  {
    path: '**',
    canActivate: [LegacyUrlStrategyRedirectionGuard],
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
