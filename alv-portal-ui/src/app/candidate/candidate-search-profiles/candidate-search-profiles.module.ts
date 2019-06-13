import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { WidgetsModule } from '../../widgets/widgets.module';
import { CandidateSearchProfilesRoutingModule } from './candidate-search-profiles-routing.module';
import { CandidateSearchProfilesComponent } from './candidate-search-profiles/candidate-search-profiles.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CandidateSearchProfilesRoutingModule,
    InfiniteScrollModule,
    WidgetsModule
  ],
  declarations: [
    CandidateSearchProfilesComponent
  ],
  entryComponents: [],
  providers: [
    ModalService
  ]
})
export class CandidateSearchProfilesModule {
}
