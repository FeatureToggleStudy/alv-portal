import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { JobPublicationComponent } from './job-publication.component';
import { JobPublicationResolver } from './job-publication.resolver';
import { JobPublicationGuard } from './job-publication.guard';

const routes: Routes = [
  {
    path: '',
    component: JobPublicationComponent,
    canActivate: [JobPublicationGuard],
    resolve: {
      initialFormValueConfig: JobPublicationResolver
    },
    runGuardsAndResolvers: 'pathParamsOrQueryParamsChange'
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
