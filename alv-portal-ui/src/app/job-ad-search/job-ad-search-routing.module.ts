import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { JobSearchComponent } from './job-search/job-search.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobDetailGuard } from './job-detail/job-detail.guard';
import { JobSearchGuard } from './job-search/job-search.guard';

const routes: Routes = [
  {
    path: '',
    component: JobSearchComponent,
    canActivate: [JobSearchGuard],
    data: { titleKey: 'portal.job-ad-search.browser-title' }
  },
  {
    path: ':id',
    component: JobDetailComponent,
    canActivate: [JobDetailGuard],
    data: { titleKey: 'portal.job-ad-search.browser-title' }
  },
  {
    path: '**',
    redirectTo: ''
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

export class JobAdSearchRoutingModule {
}
