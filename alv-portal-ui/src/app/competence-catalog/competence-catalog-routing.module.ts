import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'sets',
    loadChildren: './competence-sets/competence-sets.module#CompetenceSetsModule',
  },
  {
    path: 'elements',
    loadChildren: './competence-elements/competence-elements.module#CompetenceElementsModule',
  },
  {
    path: '**',
    redirectTo: 'sets'
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

export class CompetenceCatalogRoutingModule {
}
