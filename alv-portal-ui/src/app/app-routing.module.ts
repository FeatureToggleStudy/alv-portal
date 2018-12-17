import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './shared/landing-page/landing-page.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { AuthenticatedGuard } from './core/auth/authenticated.guard';
import { NotAuthenticatedGuard } from './core/auth/not-authenticated.guard';

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
    path: 'landing',
    component: LandingPageComponent,
  },
  {
    path: 'showcase',
    component: ShowcaseComponent,
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
