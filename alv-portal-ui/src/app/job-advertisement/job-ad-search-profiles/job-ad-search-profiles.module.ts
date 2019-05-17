import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { JobAdSearchProfilesRoutingModule } from './job-ad-search-profiles-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedJobAdvertisementModule } from '../shared/shared-job-advertisement.module';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { JobAdSearchProfilesComponent } from './job-ad-search-profiles/job-ad-search-profiles.component';
import { WidgetsModule } from '../../widgets/widgets.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    JobAdSearchProfilesRoutingModule,
    InfiniteScrollModule,
    SharedJobAdvertisementModule,
    WidgetsModule
  ],
  declarations: [
    JobAdSearchProfilesComponent
  ],
  entryComponents: [],
  providers: [
    ModalService
  ]
})
export class JobAdSearchProfilesModule {
}
