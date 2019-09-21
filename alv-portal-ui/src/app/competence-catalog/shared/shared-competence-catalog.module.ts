import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetenceElementComponent } from './competence-element/competence-element.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
  CompetenceElementComponent],
  providers: [
  ],
  entryComponents: [
  ],
  exports: [
    CompetenceElementComponent

  ]
})
export class SharedCompetenceCatalogModule {
}
