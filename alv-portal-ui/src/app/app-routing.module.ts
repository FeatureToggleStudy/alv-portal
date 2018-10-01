import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthoritiesLandingGuard } from './core/authorities-landing.guard';
import { LandingPageComponent } from './core/landing/landing-page/landing-page.component';
import { JobSeekerLandingPageComponent } from './core/landing/job-seeker-landing-page/job-seeker-landing-page.component';
import { PvaLandingPageComponent } from './core/landing/pva-landing-page/pva-landing-page.component';
import { OrganizationLandingPageComponent } from './core/landing/organization-landing-page/organization-landing-page.component';

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: LandingPageComponent,
    canActivate: [AuthoritiesLandingGuard],
    children: [
      { path: "job-seeker", component: JobSeekerLandingPageComponent, canActivate: [AuthoritiesLandingGuard] },
      { path: "pva", component: PvaLandingPageComponent, canActivate: [AuthoritiesLandingGuard] },
      { path: "organization", component: OrganizationLandingPageComponent, canActivate: [AuthoritiesLandingGuard] }
    ]
  },
  {
    path: 'online-forms',
    loadChildren: './online-forms/online-forms.module#OnlineFormsModule'
  },
  {
    path: '**',
    redirectTo: 'online-forms'
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
