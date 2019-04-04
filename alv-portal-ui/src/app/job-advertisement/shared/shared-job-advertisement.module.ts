import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobContentComponent } from './job-content/job-content.component';
import { SharedModule } from '../../shared/shared.module';
import { JobDetailModelFactory } from './job-detail-model-factory';
import { JobCompanyContextComponent } from './job-company-context/job-company-context.component';
import { JobCenterContextComponent } from './job-center-context/job-center-context.component';
import { JobBadgesMapperService } from '../../widgets/job-publication-widget/job-badges-mapper.service';
import { JobSearchResultComponent } from './job-search-result/job-search-result.component';
import { ComplaintModalComponent } from './complaint-modal/complaint-modal.component';

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
    ComplaintModalComponent
  ],
  providers: [
    JobBadgesMapperService,
    JobDetailModelFactory,
  ],
  entryComponents: [
    ComplaintModalComponent
  ],
  exports: [
    JobContentComponent,
    JobCompanyContextComponent,
    JobCenterContextComponent,
    JobSearchResultComponent,
    ComplaintModalComponent
  ]
})
export class SharedJobAdvertisementModule {
}
