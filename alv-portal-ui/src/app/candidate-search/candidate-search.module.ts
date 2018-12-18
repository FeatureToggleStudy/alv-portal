import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CandidateSearchRoutingModule } from './candidate-search-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CandidateSearchEffects } from './state-management/effects/candidate-search.effects';
import { candidateSearchReducer } from './state-management/reducers/candidate-search.reducers';


@NgModule({
  imports: [
    StoreModule.forFeature('candidateSearch', candidateSearchReducer),
    EffectsModule.forFeature([CandidateSearchEffects]),
    CommonModule,
    SharedModule,
    CandidateSearchRoutingModule
  ],
  declarations: [],
  providers: []
})
export class CandidateSearchModule {
}
