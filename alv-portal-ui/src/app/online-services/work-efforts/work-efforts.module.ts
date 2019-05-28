import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { WorkEffortsRoutingModule } from './work-efforts-routing.module';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { WorkEffortsComponent } from './work-efforts/work-efforts.component';
import { WorkEffortFormComponent } from './work-effort-form/work-effort-form.component';
import { WorkEffortComponent } from './work-efforts/work-effort/work-effort.component';
import { WorkEffortsReportComponent } from './work-efforts/control-period/work-efforts-report.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkEffortsFilterModalComponent } from './work-efforts/work-efforts-filter-modal/work-efforts-filter-modal.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    WorkEffortsRoutingModule,
    NgbDropdownModule
  ],
  declarations: [
    WorkEffortsComponent,
    WorkEffortComponent,
    WorkEffortsReportComponent,
    WorkEffortFormComponent,
    WorkEffortsFilterModalComponent
  ],
  entryComponents: [
    WorkEffortsFilterModalComponent
  ],
  providers: [
    ModalService
  ]
})
export class WorkEffortsModule {
}
