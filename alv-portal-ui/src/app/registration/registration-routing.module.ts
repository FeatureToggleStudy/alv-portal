import { FinishRegistrationComponent } from './finish-registration/finish-registration.component';
import { AccessCodeComponent } from './access-code/access-code.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const registrationRoutes: Routes = [
  {
    path: 'finish',
    component: FinishRegistrationComponent,
    data: { titleKey: 'portal.registration.browser-title' }
  },
  {
    path: 'access-code',
    component: AccessCodeComponent,
    data: { titleKey: 'portal.registration.browser-title' }
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
