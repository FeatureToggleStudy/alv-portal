import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { JobAdSearchRoutingModule } from './job-ad-search-routing.module';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobLocationComponent } from './job-location/job-location.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    JobAdSearchRoutingModule,
  ],
  providers: [],
  declarations: [
    JobDetailComponent,
    JobLocationComponent]
})
export class JobAdSearchModule {
}
