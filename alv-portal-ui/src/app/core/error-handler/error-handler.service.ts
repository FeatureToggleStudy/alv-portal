import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from '../notifications.service';
import { NotificationType } from '../../shared/layout/notifications/notification.model';
import { AuthenticationService } from '../auth/authentication.service';
import { SessionExpiredAction } from '../state-management/actions/core.actions';
import { CoreState } from '../state-management/state/core.state.ts';
import { Store } from '@ngrx/store';
import { HttpErrorHandlerStrategy, matchesStatus } from './http-error-handler-strategy';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  private httpErrorHandlerStrategies: Array<HttpErrorHandlerStrategy> = [];


  constructor(private notificationsService: NotificationsService,
              authenticationService: AuthenticationService,
              store: Store<CoreState>) {

    let isAuthenticated = false;
    authenticationService.getCurrentUser()
      .pipe(tap((user) => {
        return isAuthenticated = !!user;
      }))
      .subscribe();

    this.httpErrorHandlerStrategies.push(
      {
        matches: (e) => matchesStatus(e, 401),
        handle: () => store.dispatch(new SessionExpiredAction({}))
      },
      {
        matches: (e) => matchesStatus(e, 403),
        handle: () => this.showMessage('portal.global.exception.server.403')
      },
      {
        matches: (e) => matchesStatus(e, 404),
        handle: () => this.showMessage('portal.global.exception.server.404')
      },
      {
        matches: (e) => matchesStatus(e, 429),
        handle: () =>
          this.showMessage(
            isAuthenticated ? 'alert.error.tooManyRequests.authenticated' : 'alert.error.tooManyRequests.anonymous',
            NotificationType.WARNING
          )
      },
      {
        matches: (e) => matchesStatus(e, 504),
        handle: () => this.showMessage('portal.global.exception.server.504')
      }
    );

  }

  handleError(error) {
    console.error('handleError:', error);
    this.showMessage('portal.global.exception.client.unknown', NotificationType.ERROR);
  }

  handleHttpError(httpErrorResponse: HttpErrorResponse) {
    if (!(httpErrorResponse instanceof HttpErrorResponse)) {
      throw new Error('The given ErrorResponse is not type HttpErrorResponse');
    }
    if (!environment.production) {
      console.log('handleHttpError:', httpErrorResponse);
    }
    const errorHandlingStrategy = this.httpErrorHandlerStrategies
      .find((s) => s.matches(httpErrorResponse));
    if (errorHandlingStrategy !== undefined) {
      errorHandlingStrategy.handle();
    } else {
      this.showMessage('portal.global.exception.server.unknown');
    }
  }

  private showMessage(messageKey: string, type = NotificationType.ERROR, sticky = true, messageVariables?: any) {
    this.notificationsService.add({
      type: type,
      messageKey: messageKey,
      isSticky: sticky
    });
  }

}
