import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobContentComponent } from './job-content/job-content.component';
import { SharedModule } from '../../shared/shared.module';
import { JobDetailModelFactory } from './job-detail-model-factory';
import { JobCompanyContextComponent } from './job-company-context/job-company-context.component';
import { JobCenterContextComponent } from './job-center-context/job-center-context.component';
import { JobBadgesMapperService } from '../../widgets/job-publication-widget/job-badges-mapper.service';
import { WidgetsModule } from '../../widgets/widgets.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    WidgetsModule
  ],
  declarations: [
    JobContentComponent,
    JobCompanyContextComponent,
    JobCenterContextComponent,
  ],
  providers: [
    JobBadgesMapperService,
    JobDetailModelFactory,
  ],
  exports: [
    JobContentComponent,
    JobCompanyContextComponent,
    JobCenterContextComponent
  ]
})
export class SharedJobAdvertisementModule {
}
