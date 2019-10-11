import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'competence-sets',
    loadChildren: './competence-sets/competence-sets.module#CompetenceSetsModule',
    data: {
      titleKey: 'portal.competence-catalog.competence-sets.browser-title',
    }
  },
  {
    path: 'competence-elements',
    loadChildren: './competence-elements/competence-elements.module#CompetenceElementsModule',
    data: {
      titleKey: 'portal.competence-catalog.competence-elements.browser-title',
    }
  },
  {
    path: '**',
    redirectTo: 'competence-sets'
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
