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
        data: { titleKey: 'JOB_SEEKER_HOME_PAGE' }
      },
      {
        path: 'company',
        component: CompanyHomePageComponent,
        data: { titleKey: 'COMPANY_HOME_PAGE' }
      },
      {
        path: 'pav',
        component: PavHomePageComponent,
        data: { titleKey: 'PAV_HOME_PAGE' }
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
