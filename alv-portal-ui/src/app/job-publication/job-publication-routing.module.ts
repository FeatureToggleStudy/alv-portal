import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { JobPublicationComponent } from './job-publication.component';
import { JobPublicationResolver } from './job-publication.resolver';

const routes: Routes = [
  {
    path: '',
    component: JobPublicationComponent,
    resolve: {
      initialFormValueConfig: JobPublicationResolver
    }
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
