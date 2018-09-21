import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvpFormComponent } from './forms/avp-form/avp-form.component';

const onlineFormsRoutes: Routes = [
  {
    path: 'avp-form',
    component: AvpFormComponent
  },
  {
    path: '**',
    redirectTo: 'avp-form'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(
        onlineFormsRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class OnlineFormsRoutingModule {
}
