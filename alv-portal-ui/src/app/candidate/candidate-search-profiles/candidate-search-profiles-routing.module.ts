import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CandidateSearchProfilesComponent } from './candidate-search-profiles/candidate-search-profiles.component';

const routes: Routes = [
  {
    path: '',
    component: CandidateSearchProfilesComponent
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

export class CandidateSearchProfilesRoutingModule {
}
