import { NgModule } from '@angular/core';
import { AccessCodeComponent } from './access-code/access-code.component';
import { FinishRegistrationComponent } from './finish-registation/finish-registration.component';
import { RegistrationRoutingModule } from './registration-routing.module';

@NgModule({
  declarations: [
    AccessCodeComponent,
    FinishRegistrationComponent
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


