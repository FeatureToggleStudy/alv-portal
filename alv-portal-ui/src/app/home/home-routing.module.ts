import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { JobSeekerHomeComponent } from './job-seeker-home/job-seeker-home.component';
import { CompanyHomeComponent } from './company-home/company-home.component';
import { PavHomeComponent } from './pav-home/pav-home.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'job-seeker',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'job-seeker',
        component: JobSeekerHomeComponent,
        data: {
          titleKey: 'portal.home.job-seeker.browser-title',
          scrollToTop: true
        }
      },
      {
        path: 'company',
        component: CompanyHomeComponent,
        data: {
          titleKey: 'portal.home.company.browser-title',
          scrollToTop: true
        }
      },
      {
        path: 'pav',
        component: PavHomeComponent,
        data: {
          titleKey: 'portal.home.pav.browser-title',
          scrollToTop: true
        }
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
