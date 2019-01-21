import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { JobPublicationComponent } from './job-publication.component';
import { JobPublicationFormResolver } from './job-publication-form/job-publication-form.resolver';

const routes: Routes = [
  {
    path: '',
    component: JobPublicationComponent,
    resolve: {
      initialFormValueConfig: JobPublicationFormResolver
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
