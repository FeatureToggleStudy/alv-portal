import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CompetenceCatalogRoutingModule } from './competence-catalog-routing.module';
import { ChFichesOverviewComponent } from './ch-fiches/ch-fiches-overview/ch-fiches-overview.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CompetenceCatalogRoutingModule
  ],
  declarations: [],
  entryComponents: [],
  providers: []
})
export class CompetenceCatalogModule {
}
