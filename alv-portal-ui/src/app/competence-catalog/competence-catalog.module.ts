import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetenceCatalogHomeComponent } from './competence-catalog-home/competence-catalog-home.component';
import { SharedModule } from '../shared/shared.module';
import { CompetenceCatalogRoutingModule } from './competence-catalog-routing.module';
import { ModalService } from '../shared/layout/modal/modal.service';
import { CompetenceCatalogSearchComponent } from './competence-catalog-search/competence-catalog-search.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CompetenceCatalogRoutingModule
  ],
  declarations: [
    CompetenceCatalogHomeComponent,
    CompetenceCatalogSearchComponent
  ],
  entryComponents: [],
  providers: [
    ModalService
  ]
})
export class CompetenceCatalogModule {
}
