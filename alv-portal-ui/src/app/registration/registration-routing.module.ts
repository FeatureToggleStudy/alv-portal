import { FinishRegistrationPageComponent } from './finish-registation-page/finish-registration-page.component';
import { AccessCodeRegistrationPageComponent } from './access-code-registration-page/access-code-registration-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const registrationRoutes: Routes = [
  {
    path: 'finish',
    component: FinishRegistrationPageComponent
  },
  {
    path: 'access-code',
    component: AccessCodeRegistrationPageComponent
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
