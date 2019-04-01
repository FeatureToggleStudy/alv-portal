import { NgModule } from '@angular/core';
import { JobQueryPanelComponent } from './job-search-widget/job-query-panel/job-query-panel.component';
import { SharedModule } from '../shared/shared.module';
import { JobSearchWidgetComponent } from './job-search-widget/job-search-widget.component';
import { CandidateSearchWidgetComponent } from './candidate-search-widget/candidate-search-widget.component';
import { CandidateQueryPanelComponent } from './candidate-search-widget/candidate-query-panel/candidate-query-panel.component';
import { JobPublicationWidgetComponent } from './job-publication-widget/job-publication-widget.component';
import { ManageJobAdsWidgetComponent } from './manage-job-ads-widget/manage-job-ads-widget.component';
import { RouterModule } from '@angular/router';
import { JobAdManagementTableComponent } from './manage-job-ads-widget/job-ad-management-table/job-ad-management-table.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { JobAdManagementColumnService } from './manage-job-ads-widget/job-ad-management-column.service';
import { JobAdCancellationComponent } from './manage-job-ads-widget/job-ad-cancellation/job-ad-cancellation.component';
import { ModalService } from '../shared/layout/modal/modal.service';
import { FavouriteJobsWidgetComponent } from './favourite-jobs-widget/favourite-jobs-widget.component';
import { JobSearchResultComponent } from './favourite-jobs-widget/job-search-result/job-search-result.component';
import { JobBadgesMapperService } from './job-publication-widget/job-badges-mapper.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    InfiniteScrollModule,
  ],
  declarations: [
    JobSearchWidgetComponent,
    JobQueryPanelComponent,
    CandidateSearchWidgetComponent,
    CandidateQueryPanelComponent,
    JobPublicationWidgetComponent,
    ManageJobAdsWidgetComponent,
    JobAdManagementTableComponent,
    JobAdCancellationComponent,
    FavouriteJobsWidgetComponent,
    JobSearchResultComponent,
  ],
  providers: [
    ModalService,
    JobAdManagementColumnService,
    JobBadgesMapperService
  ],
  entryComponents: [
    JobAdCancellationComponent
  ],
  exports:
    [
      JobSearchWidgetComponent,
      JobQueryPanelComponent,
      CandidateSearchWidgetComponent,
      CandidateQueryPanelComponent,
      JobPublicationWidgetComponent,
      ManageJobAdsWidgetComponent,
      JobAdManagementTableComponent,
      JobAdCancellationComponent,
      FavouriteJobsWidgetComponent,
      JobSearchResultComponent,
    ]
})

export class WidgetsModule {
}
