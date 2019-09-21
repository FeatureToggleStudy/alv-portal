import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CompetenceSetsOverviewComponent } from './competence-sets-overview/competence-sets-overview.component';

const routes: Routes = [
  {
    path: '',
    component: CompetenceSetsOverviewComponent
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

export class CompetenceSetsRoutingModule {
}
