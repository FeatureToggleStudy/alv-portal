import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { PilotActivationRoutingModule } from './pilot-activation-routing.module';
import { PilotActivationComponent } from './pilot-activation/pilot-activation.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PilotActivationRoutingModule
  ],
  declarations: [
  PilotActivationComponent],
  entryComponents: [
  ],
  providers: [
  ]
})
export class PilotActivationModule {
}
