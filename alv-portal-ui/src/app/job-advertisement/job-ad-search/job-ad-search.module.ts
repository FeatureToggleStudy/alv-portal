import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSearchComponent } from './job-search/job-search.component';
import { FilterPanelComponent } from './job-search/filter-panel/filter-panel.component';
import { SharedModule } from '../../shared/shared.module';
import { JobSearchResultComponent } from './job-search/job-search-result/job-search-result.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NouisliderModule } from 'ng2-nouislider';
import { JobAdSearchRoutingModule } from './job-ad-search-routing.module';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { StoreModule } from '@ngrx/store';
import { JobAdSearchEffects, jobAdSearchReducer } from './state-management';
import { EffectsModule } from '@ngrx/effects';
import { JobSearchFilterParameterService } from './job-search/job-search-filter-parameter.service';
import { JobDetailGuard } from './job-detail/job-detail.guard';
import { JobSearchGuard } from './job-search/job-search.guard';
import { WidgetsModule } from '../../widgets/widgets.module';
import { SharedJobAdvertisementModule } from '../shared/shared-job-advertisement.module';

@NgModule({
  imports: [
    StoreModule.forFeature('jobAdSearch', jobAdSearchReducer),
    EffectsModule.forFeature([JobAdSearchEffects]),
    CommonModule,
    SharedModule,
    JobAdSearchRoutingModule,
    InfiniteScrollModule,
    NouisliderModule,
    WidgetsModule,
    SharedJobAdvertisementModule
  ],
  declarations: [
    JobSearchComponent,
    FilterPanelComponent,
    JobSearchResultComponent,
    JobDetailComponent,
  ],
  providers: [
    JobSearchFilterParameterService,
    JobDetailGuard,
    JobSearchGuard
  ]
})
export class JobAdSearchModule {
}
