import { NgModule } from '@angular/core';
import { HasAnyAuthorityDirective } from './has-any-authority/has-any-authority.directive';
import { IsAuthenticatedDirective } from './is-authenticated/is-authenticated.directive';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { SessionManagerService } from './session-manager/session-manager.service';
import { AuthExpiredInterceptor } from './interceptor/auth-expired.interceptor';
import { AuthenticationService } from './authentication.service';
import { LocalLoginComponent } from './local-login/local-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    HasAnyAuthorityDirective,
    IsAuthenticatedDirective,
    LocalLoginComponent,
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    CommonModule
  ],
  entryComponents: [
    LocalLoginComponent
  ],
  exports: [
    HasAnyAuthorityDirective,
    IsAuthenticatedDirective,
    LocalLoginComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: [
        SessionManagerService
      ]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true,
      deps: [
        AuthenticationService
      ]
    }
  ]
})
export class AuthModule {

}

