import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { JobSeekerHomePageComponent } from './pages/job-seeker-home-page/job-seeker-home-page.component';
import { CompanyHomePageComponent } from './pages/company-home-page/company-home-page.component';
import { PavHomePageComponent } from './pages/pav-home-page/pav-home-page.component';
import { HomePageComponent } from './pages/home-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'job-seeker',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'job-seeker',
        component: JobSeekerHomePageComponent,
        data: { titleKey: 'portal.home.job-seeker.browser-title' }
      },
      {
        path: 'company',
        component: CompanyHomePageComponent,
        data: { titleKey: 'portal.home.company.browser-title' }
      },
      {
        path: 'pav',
        component: PavHomePageComponent,
        data: { titleKey: 'portal.home.pav.browser-title' }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(
      routes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {
}
