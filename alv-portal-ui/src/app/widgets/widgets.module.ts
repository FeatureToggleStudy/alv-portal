import { NgModule } from '@angular/core';
import { JobSearchWidgetComponent } from './job-search-widget/job-search-widget.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    JobSearchWidgetComponent
  ],
  exports: [
    JobSearchWidgetComponent
  ]
})
export class WidgetsModule {
}
