import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CompetenceCatalogHomeComponent } from './competence-catalog-home/competence-catalog-home.component';
import { CompetenceCatalogSearchComponent } from './competence-catalog-search/competence-catalog-search.component';

const routes: Routes = [
  {
    path: 'home',
    component: CompetenceCatalogHomeComponent
  },
  {
    path: 'search',
    component: CompetenceCatalogSearchComponent
  },
  {
    path: '**',
    redirectTo: 'home'
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
