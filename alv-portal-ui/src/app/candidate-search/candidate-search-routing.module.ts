import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CandidateSearchComponent } from './candidate-search/candidate-search.component';
import { CandidateDetailComponent } from './candidate-detail/candidate-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CandidateSearchComponent,
    // TODO: add guard
    // canActivate: [JobSearchGuard],
    data: { titleKey: 'portal.candidate-search.browser-title' }
  },
  {
    path: ':id',
    component: CandidateDetailComponent,
    // TODO: add guard
    // canActivate: [JobDetailGuard],
    data: { titleKey: 'portal.candidate-search.browser-title' }
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

export class CandidateSearchRoutingModule {
}
