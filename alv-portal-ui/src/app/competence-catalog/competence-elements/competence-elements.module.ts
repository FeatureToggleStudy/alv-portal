import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetenceElementsRoutingModule } from './competence-elements-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { CompetenceElementsOverviewComponent } from './competence-elements-overview/competence-elements-overview.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedCompetenceCatalogModule } from '../shared/shared-competence-catalog.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CompetenceElementsRoutingModule,
    InfiniteScrollModule,
    SharedCompetenceCatalogModule
  ],
  declarations: [
    CompetenceElementsOverviewComponent
  ],
  entryComponents: [
  ],
  providers: [
    ModalService
  ]
})
export class CompetenceElementsModule {
}
