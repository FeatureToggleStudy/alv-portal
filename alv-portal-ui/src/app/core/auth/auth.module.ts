import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { SessionManagerService } from './session-manager/session-manager.service';
import { AuthExpiredInterceptor } from './interceptor/auth-expired.interceptor';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../notifications.service';

@NgModule({
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
        AuthenticationService,
        NotificationsService,
        Router
      ]
    }
  ]
})
export class AuthModule {

}

