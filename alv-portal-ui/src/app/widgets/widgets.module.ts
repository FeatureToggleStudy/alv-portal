import { NgModule } from '@angular/core';
import { JobQueryPanelComponent } from './job-search-widget/job-query-panel/job-query-panel.component';
import { SharedModule } from '../shared/shared.module';
import { JobSearchWidgetComponent } from './job-search-widget/job-search-widget.component';
import { CandidateSearchWidgetComponent } from './candidate-search-widget/candidate-search-widget.component';
import { CandidateQueryPanelComponent } from './candidate-search-widget/candidate-query-panel/candidate-query-panel.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    JobSearchWidgetComponent,
    JobQueryPanelComponent,
    CandidateSearchWidgetComponent,
    CandidateQueryPanelComponent
  ],
  exports: [
    JobSearchWidgetComponent,
    JobQueryPanelComponent,
    CandidateSearchWidgetComponent,
    CandidateQueryPanelComponent
  ]
})
export class WidgetsModule {
}
