import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  /*
  {
    path: '',
    component: JobSearchComponent,
    canActivate: [JobSearchGuard],
    data: { titleKey: 'portal.job-ad-search.browser-title' }
  },
  */
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

export class CandidateSearchRoutingModule {
}
