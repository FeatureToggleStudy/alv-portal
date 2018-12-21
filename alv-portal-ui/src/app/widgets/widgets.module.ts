import { NgModule } from '@angular/core';
import { JobQueryPanelComponent } from './job-search-widget/job-query-panel/job-query-panel.component';
import { SharedModule } from '../shared/shared.module';
import { JobSearchWidgetComponent } from './job-search-widget/job-search-widget.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    JobSearchWidgetComponent,
    JobQueryPanelComponent
  ],
  exports: [
    JobSearchWidgetComponent,
    JobQueryPanelComponent
  ]
})
export class WidgetsModule {
}
