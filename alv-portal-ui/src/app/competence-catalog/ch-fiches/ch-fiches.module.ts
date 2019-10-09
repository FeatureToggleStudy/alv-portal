import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedCompetenceCatalogModule } from '../shared/shared-competence-catalog.module';
import { ChFichesRoutingModule } from './ch-fiches-routing.module';
import { ChFichesOverviewComponent } from './ch-fiches-overview/ch-fiches-overview.component';
import { ChFicheDetailComponent } from './ch-fiche-detail/ch-fiche-detail.component';
import { ChFicheComponent } from './ch-fiche/ch-fiche.component';
import { CompetenceSetSearchModalComponent } from './competence-set-search-modal/competence-set-search-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChFichesRoutingModule,
    InfiniteScrollModule,
    SharedCompetenceCatalogModule
  ],
  declarations: [
    ChFichesOverviewComponent,
    ChFicheDetailComponent,
    ChFicheComponent,
    CompetenceSetSearchModalComponent
  ],
  entryComponents: [
    CompetenceSetSearchModalComponent
  ],
  providers: [
    ModalService
  ]
})
export class ChFichesModule {
}
