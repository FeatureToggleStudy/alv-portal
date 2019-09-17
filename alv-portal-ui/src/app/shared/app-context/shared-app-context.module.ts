import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppContextDefaultDirective } from './app-context-default.directive';
import { AppContextCompetenceCatalogDirective } from './app-context-competence-catalog.directive';


@NgModule({
  declarations: [
    AppContextDefaultDirective,
    AppContextCompetenceCatalogDirective
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [],
  exports: [
    AppContextDefaultDirective,
    AppContextCompetenceCatalogDirective
  ],
  providers: []
})
export class SharedAppContextModule {
}

