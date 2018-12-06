import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/auth/auth-guard.service';
import { LandingPageComponent } from './shared/landing-page/landing-page.component';
import { ShowcaseComponent } from './showcase/showcase.component';

const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivateChild: [AuthGuardService],
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
    // redirectTo: './job-search/77b02467-ef7e-11e8-ba2e-005056ac3479'
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
