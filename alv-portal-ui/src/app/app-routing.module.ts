import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './core/landing/landing-page/landing-page.component';
import { JobSeekerLandingPageComponent } from './core/landing/job-seeker-landing-page/job-seeker-landing-page.component';
import { PvaLandingPageComponent } from './core/landing/pva-landing-page/pva-landing-page.component';
import { NzaPageComponent } from './core/nza-page/nza-page.component';
import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    children: [
      {
        path: 'job-seeker',
        component: JobSeekerLandingPageComponent
      },
      {
        path: 'pva',
        component: PvaLandingPageComponent
      },
      {
        path: 'company',
        component: PvaLandingPageComponent //right now we provide the same page for pva and the company
      }
    ]
  },
  {
    path: 'nza',
    component: NzaPageComponent
  },
  {
    path: 'landing',
    component: LandingPageComponent,
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
