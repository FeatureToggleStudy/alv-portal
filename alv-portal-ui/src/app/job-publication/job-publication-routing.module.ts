import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { JobPublicationComponent } from './job-publication.component';

const routes: Routes = [
  {
    path: '',
    component: JobPublicationComponent,
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
export class JobPublicationRoutingModule {

}
