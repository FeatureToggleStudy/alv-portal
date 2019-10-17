import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CompetenceElementsOverviewComponent } from './competence-elements-overview/competence-elements-overview.component';

const routes: Routes = [
  {
    path: '',
    component: CompetenceElementsOverviewComponent
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

export class CompetenceElementsRoutingModule {
}
