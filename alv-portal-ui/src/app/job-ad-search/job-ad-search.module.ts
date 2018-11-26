import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSearchComponent } from './job-search/job-search.component';
import { FilterPanelComponent } from './job-search/filter-panel/filter-panel.component';
import { ResultListItemComponent } from './job-search/result-list-item/result-list-item.component';
import { SharedModule } from '../shared/shared.module';
import { JobAdvertisementService } from '../shared/backend-services/job-advertisement/job-advertisement.service';
import { JobSearchResultComponent } from './job-search/job-search-result/job-search-result.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NouisliderModule } from 'ng2-nouislider';
import { JobAdSearchRoutingModule } from './job-ad-search-routing.module';
import { JobDetailComponent } from './job-detail/job-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    JobAdSearchRoutingModule,
    InfiniteScrollModule,
    NouisliderModule,
  ],
  providers: [
    JobAdvertisementService
  ],
  declarations: [
    JobSearchComponent,
    FilterPanelComponent,
    ResultListItemComponent,
    JobSearchResultComponent,
    JobDetailComponent]
})
export class JobAdSearchModule {
}
