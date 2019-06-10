import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { WorkEffortsRoutingModule } from './work-efforts-routing.module';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { WorkEffortsComponent } from './work-efforts/work-efforts.component';
import { WorkEffortFormComponent } from './work-effort-form/work-effort-form.component';
import { WorkEffortComponent } from './work-efforts/work-effort/work-effort.component';
import { WorkEffortsReportComponent } from './work-efforts/work-efforts-report/work-efforts-report.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkEffortsFilterModalComponent } from './work-efforts/work-efforts-filter-modal/work-efforts-filter-modal.component';
import { JobPublicationModule } from '../../job-advertisement/job-publication/job-publication.module';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { WorkEffortFormGuard } from './work-effort-form/work-effort-form.guard';
import { SuccessModalComponent } from './work-effort-form/success-modal/success-modal.component';
import { AssistantLinkComponent } from './work-effort-form/assistant-link/assistant-link.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    WorkEffortsRoutingModule,
    NgbDropdownModule,
    JobPublicationModule,
    PrettyJsonModule
  ],
  declarations: [
    WorkEffortsComponent,
    WorkEffortComponent,
    WorkEffortsReportComponent,
    WorkEffortFormComponent,
    WorkEffortsFilterModalComponent,
    SuccessModalComponent,
    AssistantLinkComponent
  ],
  entryComponents: [
    WorkEffortsFilterModalComponent,
    SuccessModalComponent
  ],
  providers: [
    ModalService,
    WorkEffortFormGuard
  ]
})
export class WorkEffortsModule {
}
