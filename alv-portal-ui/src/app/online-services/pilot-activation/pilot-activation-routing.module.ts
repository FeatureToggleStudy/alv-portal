import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PilotActivationComponent } from './pilot-activation/pilot-activation.component';

const routes: Routes = [
  {
    path: '',
    component: PilotActivationComponent,
    data: {
      collapseNavigation: true
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(
      routes
    )
  ],
  exports: [
    RouterModule
  ]
})

export class PilotActivationRoutingModule {
}
