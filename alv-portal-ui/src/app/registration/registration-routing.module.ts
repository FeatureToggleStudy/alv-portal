import { FinishRegistrationComponent } from './finish-registration/finish-registration.component';
import { AccessCodeComponent } from './access-code/access-code.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const registrationRoutes: Routes = [
  {
    path: 'finish',
    component: FinishRegistrationComponent,
    data: { titleKey: 'FINISH_REGISTRATION_PAGE' }
  },
  {
    path: 'access-code',
    component: AccessCodeComponent,
    data: { titleKey: 'ACCESS_CODE_PAGE' }
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
