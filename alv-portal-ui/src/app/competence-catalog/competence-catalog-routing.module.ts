import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CompetenceCatalogHomeComponent } from './competence-catalog-home/competence-catalog-home.component';
import { CompetenceCatalogSearchComponent } from './competence-catalog-search/competence-catalog-search.component';
import { DummyComponent } from '../shared/dummy/dummy.component';
import { LandingPageGuard } from '../shared/landing-page/landing-page.guard';

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
    path: 'landing',
    component: DummyComponent,
    canActivate: [LandingPageGuard],
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
