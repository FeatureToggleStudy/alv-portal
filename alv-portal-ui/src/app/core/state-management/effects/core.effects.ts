import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  CURRENT_USER_LOADED,
  CurrentUserLoadedAction,
  EFFECT_ERROR_OCCURRED,
  EffectErrorOccurredAction,
  LOAD_CURRENT_USER,
  LoadCurrentUserAction,
  LOGOUT_USER,
  LogoutUserAction,
  SESSION_EXPIRED,
  ToggleMainNavigationAction
} from '../actions/core.actions';
import { HttpClient } from '@angular/common/http';
import { SessionManagerService } from '../../auth/session-manager/session-manager.service';
import { UserDto } from '../../auth/authentication.service';
import { User } from '../../auth/user.model';
import { ErrorHandlerService } from '../../error-handler/error-handler.service';
import { NotificationsService } from '../../notifications.service';
import { Router } from '@angular/router';
import { CoreState } from '../state/core.state.ts';

@Injectable()
export class CoreEffects {

  @Effect()
  loadCurrentUser: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_CURRENT_USER),
    switchMap((action: LoadCurrentUserAction) => {
      if (action.payload.jwt) {
        this.sessionManagerService.setToken(action.payload.jwt);
      }
      return this.httpClient.get<UserDto>('/api/current-user', { observe: 'response' }).pipe(
        map((response) => {
          this.sessionManagerService.setToken(response.headers.get('Authorization'));
          return new CurrentUserLoadedAction({ currentUser: User.toUser(response.body) });
        }),
        catchError(err => {
          if (err.status === 401) {
            return EMPTY;
          } else {
            return of(new EffectErrorOccurredAction({ httpError: err }));
          }
        }),
      );
    }),
  );

  @Effect()
  currentUserLoaded: Observable<Action> = this.actions$.pipe(
    ofType(CURRENT_USER_LOADED),
    map(() => {
      return new ToggleMainNavigationAction({ expanded: true });
    })
  );

  @Effect({ dispatch: false })
  logoutUser: Observable<Action> = this.actions$.pipe(
    ofType(LOGOUT_USER),
    tap(() => {
      this.sessionManagerService.clearToken();
    })
  );

  @Effect({ dispatch: false })
  effectErrorOccurred: Observable<Action> = this.actions$.pipe(
    ofType(EFFECT_ERROR_OCCURRED),
    tap((action: EffectErrorOccurredAction) => {
      this.errorHandlerService.handleHttpError(action.payload.httpError);
    })
  );

  @Effect()
  sessionExpired: Observable<Action> = this.actions$.pipe(
    ofType(SESSION_EXPIRED),
    tap(() => {
      this.notificationsService.info('portal.authentication.notification.expired', true);
      this.router.navigate(['/home']);
    }),
    map(() => {
      return new LogoutUserAction({});
    })
  );

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private router: Router,
              private store: Store<CoreState>,
              private notificationsService: NotificationsService,
              private errorHandlerService: ErrorHandlerService,
              private sessionManagerService: SessionManagerService) {

  }

}


