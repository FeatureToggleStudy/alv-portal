import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CandidateSearchRoutingModule } from './candidate-search-routing.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CandidateSearchRoutingModule
  ],
  declarations: [
  ],
  providers: [
  ]
})
export class CandidateSearchModule {
}
