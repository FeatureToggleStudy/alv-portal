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
import { LazyModuleDeactivateGuard } from './core/lazy-module-deactivate.guard';
import { ModuleName } from './core/state-management/actions/core.actions';

const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
    canActivateChild: [NotAuthenticatedGuard]
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
    canDeactivate: [LazyModuleDeactivateGuard],
    data: {
      moduleName: ModuleName.JOB_SEARCH,
      collapseNavigation: true,
      titleKey: 'portal.job-ad-search.browser-title'
    }
  },
  {
    path: 'candidate-search',
    loadChildren: './candidate/candidate-search/candidate-search.module#CandidateSearchModule',
    canDeactivate: [LazyModuleDeactivateGuard],
    data: {
      moduleName: ModuleName.CANDIDATE_SEARCH,
      collapseNavigation: true,
      titleKey: 'portal.candidate-search.browser-title'
    }
  },
  {
    path: 'job-publication',
    loadChildren: './job-advertisement/job-publication/job-publication.module#JobPublicationModule',
    canDeactivate: [LazyModuleDeactivateGuard],
    data: {
      moduleName: ModuleName.JOB_PUBLICATION,
      titleKey: 'portal.job-publication.browser-title',
      scrollToTop: true
    }
  },
  {
    path: 'manage-job-ads',
    loadChildren: './job-advertisement/manage-job-ads/manage-job-ads.module#ManageJobAdsModule',
    canDeactivate: [LazyModuleDeactivateGuard],
    data: {
      moduleName: ModuleName.MANAGE_JOB_AD,
      titleKey: 'portal.manage-job-ads.browser-title',
      scrollToTop: true
    }
  },
  {
    path: 'job-favourites',
    loadChildren: './job-advertisement/job-ad-favourites/job-ad-favourites.module#JobAdFavouritesModule',
    canActivateChild: [AuthenticatedGuard],
    canDeactivate: [LazyModuleDeactivateGuard],
    data: {
      moduleName: ModuleName.JOB_AD_FAVOURITE,
      titleKey: 'portal.job-ad-favourites.browser-title',
      scrollToTop: true
    }
  },
  {
    path: 'job-search-profiles',
    loadChildren: './job-advertisement/job-ad-search-profiles/job-ad-search-profiles.module#JobAdSearchProfilesModule',
    canActivateChild: [AuthenticatedGuard],
    canDeactivate: [LazyModuleDeactivateGuard],
    data: {
      moduleName: ModuleName.JOB_SEARCH_PROFILES,
      titleKey: 'portal.job-ad-search-profiles.browser-title',
      scrollToTop: true
    }
  },
  {
    path: 'work-efforts',
    loadChildren: './online-services/work-efforts/work-efforts.module#WorkEffortsModule',
    canDeactivate: [LazyModuleDeactivateGuard],
    data: {
      authorities: [UserRole.ROLE_JOB_SEEKER],
      moduleName: ModuleName.WORK_EFFORTS,
      titleKey: 'portal.work-efforts.browser-title',
      scrollToTop: true
    }
  },
  {
    path: 'application-documents',
    loadChildren: './online-services/application-documents/application-documents.module#ApplicationDocumentsModule',
    canDeactivate: [LazyModuleDeactivateGuard],
    data: {
      authorities: [UserRole.ROLE_JOB_SEEKER],
      moduleName: ModuleName.APPLICATION_DOCUMENTS,
      titleKey: 'portal.application-documents.browser-title',
      scrollToTop: true
    }
  },
  {
    path: 'candidate-search-profiles',
    loadChildren: './candidate/candidate-search-profiles/candidate-search-profiles.module#CandidateSearchProfilesModule',
    canDeactivate: [LazyModuleDeactivateGuard],
    canActivateChild: [HasAnyAuthoritiesGuard],
    data: {
      moduleName: ModuleName.CANDIDATE_SEARCH_PROFILES,
      titleKey: 'portal.candidate-search-profiles.browser-title',
      scrollToTop: true,
      authorities: [UserRole.ROLE_COMPANY, UserRole.ROLE_PAV, UserRole.ROLE_SYSADMIN]
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
      titleKey: 'portal.dashboard.user-settings.browser-title',
      scrollToTop: true
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
      {
        enableTracing: false,
      },
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
