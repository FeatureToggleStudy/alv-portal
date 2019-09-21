import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetenceSetsRoutingModule } from './competence-sets-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { CompetenceSetsOverviewComponent } from './competence-sets-overview/competence-sets-overview.component';
import { SharedCompetenceCatalogModule } from '../shared/shared-competence-catalog.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CompetenceSetsRoutingModule,
    SharedCompetenceCatalogModule
  ],
  declarations: [
    CompetenceSetsOverviewComponent
  ],
  entryComponents: [],
  providers: [
    ModalService
  ]
})
export class CompetenceSetsModule {
}
