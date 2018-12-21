import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CandidateSearchRoutingModule } from './candidate-search-routing.module';
import { CandidateSearchComponent } from './candidate-search/candidate-search.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CandidateDetailComponent } from './candidate-detail/candidate-detail.component';
import { CandidateSearchResultComponent } from './candidate-search/candidate-search-result/candidate-search-result.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CandidateSearchEffects, candidateSearchReducer } from './state-management';
import { CandidateDetailGuard } from './candidate-detail/candidate-detail.guard';


@NgModule({
  imports: [
    StoreModule.forFeature('candidateSearch', candidateSearchReducer),
    EffectsModule.forFeature([CandidateSearchEffects]),
    CommonModule,
    SharedModule,
    CandidateSearchRoutingModule,
    InfiniteScrollModule
  ],
  declarations: [
    CandidateSearchComponent,
    CandidateDetailComponent,
    CandidateSearchResultComponent
  ],
  providers: [
    CandidateDetailGuard
  ]
})
export class CandidateSearchModule {
}
