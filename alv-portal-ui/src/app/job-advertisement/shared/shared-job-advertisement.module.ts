import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobContentComponent } from './job-content/job-content.component';
import { SharedModule } from '../../shared/shared.module';
import { JobLocationPipe } from './job-location.pipe';
import { JobBadgesMapperService } from './job-badges-mapper.service';
import { JobDetailModelFactory } from './job-detail-model-factory';
import { JobCompanyContextComponent } from './job-company-context/job-company-context.component';
import { JobCenterContextComponent } from './job-center-context/job-center-context.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule
  ],
  declarations: [
    JobContentComponent,
    JobLocationPipe,
    JobCompanyContextComponent,
    JobCenterContextComponent,
  ],
  providers: [
    JobLocationPipe,
    JobBadgesMapperService,
    JobDetailModelFactory,
  ],
  exports: [
    JobContentComponent,
    JobLocationPipe,
    JobCompanyContextComponent,
    JobCenterContextComponent
  ]
})
export class SharedJobAdvertisementModule {
}
