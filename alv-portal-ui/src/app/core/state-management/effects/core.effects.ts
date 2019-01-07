import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, throwError } from 'rxjs';
import { Action, select, Store } from '@ngrx/store';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import {
  ACCOUNTABILITIES_LOADED,
  AcountabilitiesLoaded,
  AccountabilitySelectedAction,
  CURRENT_USER_LOADED,
  CurrentUserLoadedAction,
  EFFECT_ERROR_OCCURRED,
  EffectErrorOccurredAction,
  LOAD_ACCOUNTABILITIES,
  LOAD_CURRENT_USER,
  LoadAccountabilities,
  LoadCurrentUserAction,
  LOGOUT_USER,
  LogoutUserAction,
  SELECT_ACCOUNTABILITY,
  SelectAccountabilityAction,
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
import { CoreState, getCurrentUser } from '../state/core.state.ts';
import { UserInfoRepository } from '../../../shared/backend-services/user-info/user-info-repository';
import { CompanyRepository } from '../../../shared/backend-services/company/company-repository';
import {
  Accountability,
  CompanyContactTemplate
} from '../../../shared/backend-services/user-info/user-info.types';

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
        catchError<any, Action>((err) => {
          if (err.status === 401) {
            return of(new CurrentUserLoadedAction({ currentUser: null }));
          } else {
            return of(new EffectErrorOccurredAction({ httpError: err }));
          }
        })
      );
    }),
  );

  @Effect()
  currentUserLoaded: Observable<Action> = this.actions$.pipe(
    ofType(CURRENT_USER_LOADED),
    map(action => <CurrentUserLoadedAction>action),
    switchMap((action) => {
      const actions: Action[] = [new ToggleMainNavigationAction({ expanded: true })];
      if (action.payload.currentUser) {
        actions.push(new LoadAccountabilities({ userId: action.payload.currentUser.id }));
      }
      return actions;
    })
  );

  @Effect()
  loadAccountabilities: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_ACCOUNTABILITIES),
    map(action => <LoadAccountabilities>action),
    switchMap((action) => {
      return this.userInfoRepository.findAccountabilities(action.payload.userId);
    }),
    map(accountabilities => {
      return new AcountabilitiesLoaded({ accountabilities: accountabilities });
    }),
    catchError((errorResponse) => of(new EffectErrorOccurredAction({ httpError: errorResponse })))
  );

  @Effect()
  accountabilitiesLoaded: Observable<Action> = this.actions$.pipe(
    ofType(ACCOUNTABILITIES_LOADED),
    map(action => <AcountabilitiesLoaded>action),
    map(action => {
      const accountability = action.payload.accountabilities[0];
      if (accountability) {
        return new SelectAccountabilityAction({ accountability: accountability });
      }
      return { type: 'nothing' };
    })
  );

  @Effect()
  selectAccountability: Observable<Action> = this.actions$.pipe(
    ofType(SELECT_ACCOUNTABILITY),
    map(action => <SelectAccountabilityAction>action),
    withLatestFrom(this.store.pipe(select(getCurrentUser))),
    switchMap(([action, user]) => {
      return this.loadCompanyContactTemplate(user, action.payload.accountability);
    }),
    map(companyContactTemplate => new AccountabilitySelectedAction({ company: companyContactTemplate })),
    catchError<any, Action>((err) => of(new EffectErrorOccurredAction({ httpError: err })))
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
              private companyRepository: CompanyRepository,
              private router: Router,
              private store: Store<CoreState>,
              private userInfoRepository: UserInfoRepository,
              private notificationsService: NotificationsService,
              private errorHandlerService: ErrorHandlerService,
              private sessionManagerService: SessionManagerService) {

  }

  private loadCompanyContactTemplate(user: User, accountability: Accountability): Observable<CompanyContactTemplate> {
    return this.userInfoRepository.findCompanyContactTemplate(user.id, accountability.companyId).pipe(
      catchError((err) => {
        if (err.status !== 404) {
          return throwError(err);
        }
        return this.companyRepository.findByExternalId(accountability.companyExternalId).pipe(
          map(company => {
            return {
              companyId: company.id,
              companyName: company.name,
              companyStreet: company.street,
              companyZipCode: company.zipCode,
              companyCity: company.city,
              email: user.email
            };
          })
        );
      })
    );
  }

}


