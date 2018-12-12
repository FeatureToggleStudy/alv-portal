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
import { JobLocationComponent } from './job-detail/job-location/job-location.component';
import { PostAddressComponent } from './job-detail/post-address/post-address.component';

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
    JobLocationComponent,
    PostAddressComponent
  ]
})
export class JobAdSearchModule {
}
