import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ApplicationDocumentsOverviewComponent } from './application-documents-overview/application-documents-overview.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationDocumentsOverviewComponent,
    data: {
      collapseNavigation: true
    }
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

export class ApplicationDocumentsRoutingModule {
}
