import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { WorkEffortsRoutingModule } from './work-efforts-routing.module';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { WorkEffortsComponent } from './work-efforts/work-efforts.component';
import { WorkEffortFormComponent } from './work-effort-form/work-effort-form.component';
import { WorkEffortComponent } from './work-efforts/work-effort/work-effort.component';
import { ControlPeriodComponent } from './work-efforts/control-period/control-period.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { JobPublicationModule } from '../../job-advertisement/job-publication/job-publication.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    WorkEffortsRoutingModule,
    NgbDropdownModule,
    JobPublicationModule
  ],
  declarations: [
    WorkEffortsComponent,
    WorkEffortComponent,
    ControlPeriodComponent,
    WorkEffortFormComponent
  ],
  entryComponents: [],
  providers: [
    ModalService
  ]
})
export class WorkEffortsModule {
}
