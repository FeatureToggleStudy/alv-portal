import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsCompetenceCatalogDirective } from './is-competence-catalog.directive';


@NgModule({
  declarations: [
    IsCompetenceCatalogDirective
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [],
  exports: [
    IsCompetenceCatalogDirective
  ],
  providers: []
})
export class SharedAppContextModule {
}

