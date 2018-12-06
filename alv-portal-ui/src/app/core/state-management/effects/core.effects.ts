import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  CURRENT_USER_LOADED,
  CurrentUserLoadedAction,
  HttpClientErrorAction,
  LOAD_CURRENT_USER,
  LoadCurrentUserAction,
  LOGOUT_USER,
  ToggleMainNavigationAction
} from '../actions/core.actions';
import { HttpClient } from '@angular/common/http';
import { SessionManagerService } from '../../auth/session-manager/session-manager.service';
import { UserDto } from '../../auth/authentication.service';
import { User } from '../../auth/user.model';

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
            return of(new HttpClientErrorAction({}));
          }
        }),
      )
    }),
  );

  @Effect()
  currentUserLoadedAction: Observable<Action> = this.actions$.pipe(
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

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private sessionManagerService: SessionManagerService) {

  }

}


