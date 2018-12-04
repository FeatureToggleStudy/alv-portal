import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { JobSearchComponent } from './job-search/job-search.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobDetailGuard } from './job-detail/job-detail.guard';

const routes: Routes = [
  {
    path: '',
    component: JobSearchComponent
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
