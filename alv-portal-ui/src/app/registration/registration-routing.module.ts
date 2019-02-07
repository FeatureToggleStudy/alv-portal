import { FinishRegistrationComponent } from './finish-registration/finish-registration.component';
import { AccessCodeComponent } from './access-code/access-code.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const registrationRoutes: Routes = [
  {
    path: 'finish',
    component: FinishRegistrationComponent
  },
  {
    path: 'access-code',
    component: AccessCodeComponent
  },
  {
    path: '**',
    redirectTo: 'finish'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(
        registrationRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class RegistrationRoutingModule {
}
