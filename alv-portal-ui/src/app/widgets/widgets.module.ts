import { NgModule } from '@angular/core';
import { JobQueryPanelComponent } from './job-search-widget/job-query-panel/job-query-panel.component';
import { SharedModule } from '../shared/shared.module';
import { JobSearchWidgetComponent } from './job-search-widget/job-search-widget.component';
import { CandidateSearchWidgetComponent } from './candidate-search-widget/candidate-search-widget.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    JobSearchWidgetComponent,
    JobQueryPanelComponent,
    CandidateSearchWidgetComponent
  ],
  exports: [
    JobSearchWidgetComponent,
    JobQueryPanelComponent,
    CandidateSearchWidgetComponent
  ]
})
export class WidgetsModule {
}
