import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvpFormComponent } from './forms/avp-form/avp-form.component';

const appRoutes: Routes = [
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
    RouterModule.forRoot(
        appRoutes,
        {enableTracing: false}
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
