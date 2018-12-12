import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSearchComponent } from './job-search/job-search.component';
import { FilterPanelComponent } from './job-search/filter-panel/filter-panel.component';
import { ResultListItemComponent } from './job-search/result-list-item/result-list-item.component';
import { SharedModule } from '../shared/shared.module';
import { JobSearchResultComponent } from './job-search/job-search-result/job-search-result.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NouisliderModule } from 'ng2-nouislider';
import { JobAdSearchRoutingModule } from './job-ad-search-routing.module';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { StoreModule } from '@ngrx/store';
import { jobAdSearchReducer } from './state-management/reducers/job-ad-search.reducers';
import { EffectsModule } from '@ngrx/effects';
import { JobAdSearchEffects } from './state-management/effects/job-ad-search.effects';
import { ApplyChannelPostAddressComponent } from './job-detail/apply-channel-post-address/apply-channel-post-address.component';
import { JobBadgesMapperService } from './job-badges-mapper.service';
import { JobLocationPipe } from './job-location.pipe';
import { JobSearchFilterParameterService } from './job-search/job-search-filter-parameter.service';
import { JobDetailGuard } from './job-detail/job-detail.guard';
import { JobSearchGuard } from './job-search/job-search.guard';
import { JobDetailService } from './job-detail/job-detail.service';

@NgModule({
  imports: [
    StoreModule.forFeature('jobAdSearch', jobAdSearchReducer),
    EffectsModule.forFeature([JobAdSearchEffects]),
    CommonModule,
    SharedModule,
    JobAdSearchRoutingModule,
    InfiniteScrollModule,
    NouisliderModule,
  ],
  declarations: [
    JobSearchComponent,
    FilterPanelComponent,
    ResultListItemComponent,
    JobSearchResultComponent,
    JobDetailComponent,
    ApplyChannelPostAddressComponent,
    JobLocationPipe
  ],
  providers: [
    JobSearchFilterParameterService,
    JobBadgesMapperService,
    JobDetailGuard,
    JobSearchGuard,
    JobLocationPipe,
    JobDetailService
  ]
})
export class JobAdSearchModule {
}
