import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { WorkEffortsRoutingModule } from './work-efforts-routing.module';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { WorkEffortsComponent } from './work-efforts/work-efforts.component';
import { WorkEffortComponent } from './work-effort/work-effort.component';
import { ControlPeriodComponent } from './control-period/control-period.component';
import { WorkEffortFormComponent } from './work-effort-form/work-effort-form.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    WorkEffortsRoutingModule
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
