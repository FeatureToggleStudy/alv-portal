import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CandidateSearchRoutingModule } from './candidate-search-routing.module';
import { FilterPanelComponent } from './candidate-search/filter-panel/filter-panel.component';
import { CandidateSearchResultComponent } from './candidate-search/candidate-search-result/candidate-search-result.component';
import { CandidateSearchComponent } from './candidate-search/candidate-search.component';
import { CandidateDetailComponent } from './candidate-detail/candidate-detail.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CandidateSearchEffects, candidateSearchReducer } from './state-management';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CandidateDetailGuard } from './candidate-detail/candidate-detail.guard';
import { CandidateDetailModelFactory } from './candidate-detail/candidate-detail-model-factory';


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
    CandidateSearchResultComponent,
    FilterPanelComponent
  ],
  providers: [
    CandidateDetailGuard,
    CandidateDetailModelFactory
  ]
})
export class CandidateSearchModule {
}
