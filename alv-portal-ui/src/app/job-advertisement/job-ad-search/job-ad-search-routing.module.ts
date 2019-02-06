import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { JobSearchComponent } from './job-search/job-search.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobDetailGuard } from './job-detail/job-detail.guard';
import { JobSearchGuard } from './job-search/job-search.guard';
import { JobFingerprintGuard } from './job-fingerprint-redirect/job-fingerprint.guard';
import { DummyComponent } from '../../shared/dummy/dummy.component';

const routes: Routes = [
  {
    path: '',
    component: JobSearchComponent,
    canActivate: [JobSearchGuard]
  },
  {
    path: 'job-fingerprint-redirect',
    canActivate: [JobFingerprintGuard],
    component: DummyComponent
  },
  {
    path: ':id',
    component: JobDetailComponent,
    canActivate: [JobDetailGuard]
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
