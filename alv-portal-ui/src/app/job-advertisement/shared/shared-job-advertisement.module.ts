import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JobContentComponent} from './job-content/job-content.component';
import {SharedModule} from '../../shared/shared.module';
import {JobDetailModelFactory} from './job-detail-model-factory';
import {JobCompanyContextComponent} from './job-company-context/job-company-context.component';
import {JobCenterContextComponent} from './job-center-context/job-center-context.component';
import {JobBadgesMapperService} from './job-badges-mapper.service';
import {JobSearchResultComponent} from './job-search-result/job-search-result.component';
import {ComplaintModalComponent} from './complaint-modal/complaint-modal.component';
import {FavouriteNoteModalComponent} from './favourite-note-modal/favourite-note-modal.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule
  ],
  declarations: [
    JobContentComponent,
    JobCompanyContextComponent,
    JobCenterContextComponent,
    JobSearchResultComponent,
    ComplaintModalComponent,
    FavouriteNoteModalComponent
  ],
  providers: [
    JobBadgesMapperService,
    JobDetailModelFactory,
  ],
  entryComponents: [
    ComplaintModalComponent,
    FavouriteNoteModalComponent
  ],
  exports: [
    JobContentComponent,
    JobCompanyContextComponent,
    JobCenterContextComponent,
    JobSearchResultComponent,
    ComplaintModalComponent,
    FavouriteNoteModalComponent
  ]
})
export class SharedJobAdvertisementModule {
}
