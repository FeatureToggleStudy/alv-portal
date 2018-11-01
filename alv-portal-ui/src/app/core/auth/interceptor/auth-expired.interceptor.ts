import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { NotificationsService } from '../../notifications.service';

export class AuthExpiredInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService,
              private notificationService: NotificationsService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
        tap((event: HttpEvent<any>) => {},
            (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              if (this.authenticationService.isAuthenticated()) {
                this.authenticationService.logout();
                this.router.navigate(['/home']).then(success => {
                  this.notificationService.info('portal.authentication.notification.expired', true);
                });
              }
            }
          }
        })
    );
  }
}
