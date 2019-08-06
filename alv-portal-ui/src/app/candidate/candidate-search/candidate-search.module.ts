import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
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

import { CandidateSearchGuard } from './candidate-search/candidate-search.guard';
import { CandidateSearchFilterParameterService } from './candidate-search/candidate-search-filter-parameter.service';
import { CandidateProfileBadgesMapperService } from './candidate-profile-badges-mapper.service';
import { WidgetsModule } from '../../widgets/widgets.module';
import { SaveSearchProfileModalComponent } from './candidate-search/candidate-search-profile/save-search-profile-modal/save-search-profile-modal.component';
import { UpdateSearchProfileModalComponent } from './candidate-search/candidate-search-profile/update-search-profile-modal/update-search-profile-modal.component';
import { CandidateSearchLoggingEffects } from './state-management/effects/candidate-search-logging-effects';

@NgModule({
  imports: [
    StoreModule.forFeature('candidateSearch', candidateSearchReducer),
    EffectsModule.forFeature([CandidateSearchEffects, CandidateSearchLoggingEffects]),
    CommonModule,
    SharedModule,
    CandidateSearchRoutingModule,
    InfiniteScrollModule,
    WidgetsModule
  ],
  declarations: [
    CandidateSearchComponent,
    CandidateDetailComponent,
    CandidateSearchResultComponent,
    FilterPanelComponent,
    SaveSearchProfileModalComponent,
    UpdateSearchProfileModalComponent
  ],
  entryComponents: [
    SaveSearchProfileModalComponent,
    UpdateSearchProfileModalComponent
  ],
  providers: [
    CandidateDetailGuard,
    CandidateSearchGuard,
    CandidateSearchFilterParameterService,
    CandidateProfileBadgesMapperService,
    CandidateDetailModelFactory
  ]
})
export class CandidateSearchModule {
}
