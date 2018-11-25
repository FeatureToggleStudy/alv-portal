import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSearchPageComponent } from './pages/job-search-page/job-search-page.component';
import { CounterComponent } from './components/counter/counter.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { SearchRoutingModule } from './search-routing.module';
import { ResultListItemComponent } from './components/result-list-item/result-list-item.component';
import { SharedModule } from '../shared/shared.module';
import { JobAdvertisementService } from './services/job-advertisement/job-advertisement.service';
import { JobSearchResultComponent } from './pages/job-search-page/job-search-result/job-search-result.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SearchRoutingModule,
    InfiniteScrollModule
  ],
  providers: [
    JobAdvertisementService
  ],
  declarations: [JobSearchPageComponent, CounterComponent, FilterPanelComponent, ResultListItemComponent, JobSearchResultComponent]
})
export class SearchModule {
}
