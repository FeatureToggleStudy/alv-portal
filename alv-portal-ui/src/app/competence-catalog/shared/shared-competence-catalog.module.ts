import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetenceElementComponent } from './competence-element/competence-element.component';
import { SharedModule } from '../../shared/shared.module';
import { CompetenceSetComponent } from './competence-set/competence-set.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CompetenceElementsCollapsePanelComponent } from './competence-elements-collapse-panel/competence-elements-collapse-panel.component';
import { RouterModule } from '@angular/router';
import { CompetenceElementModalComponent } from './competence-element-modal/competence-element-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgbCollapseModule,
    RouterModule
  ],
  declarations: [
    CompetenceElementComponent,
    CompetenceSetComponent,
    CompetenceElementsCollapsePanelComponent,
    CompetenceElementModalComponent
  ],
  providers: [],
  entryComponents: [
    CompetenceElementModalComponent
  ],
  exports: [
    CompetenceElementComponent,
    CompetenceSetComponent
  ]
})
export class SharedCompetenceCatalogModule {
}
