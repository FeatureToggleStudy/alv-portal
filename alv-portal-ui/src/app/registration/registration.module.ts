import { NgModule } from '@angular/core';
import { AccessCodeRegistrationPageComponent } from './access-code-registration-page/access-code-registration-page.component';
import { FinishRegistrationPageComponent } from './finish-registation-page/finish-registration-page.component';
import { RegistrationRoutingModule } from './registration-routing.module';

@NgModule({
  declarations: [
    AccessCodeRegistrationPageComponent,
    FinishRegistrationPageComponent
  ],
  imports: [
      RegistrationRoutingModule
  ],
  entryComponents: [],
  exports: [],
  providers: []
})
export class RegistrationModule {
}


