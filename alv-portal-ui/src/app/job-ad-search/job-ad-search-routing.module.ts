import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { JobDetailComponent } from './job-detail/job-detail.component';

const routes: Routes = [
  {
    path: '',
    component: JobDetailComponent
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
