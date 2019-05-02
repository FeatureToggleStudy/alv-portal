import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, throwError } from 'rxjs';
import { Action, select, Store } from '@ngrx/store';
import { catchError, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import {
  ACCOUNTABILITIES_LOADED,
  ACCOUNTABILITY_SELECTED,
  AccountabilitySelectedAction,
  AcountabilitiesLoaded,
  ADD_JOB_AD_FAVOURITE,
  AddedJobAdFavouriteAction,
  AddJobAdFavouriteAction,
  CompanySelectedAction,
  CompanySelection,
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
  REMOVE_JOB_AD_FAVOURITE,
  RemovedJobAdFavouriteAction,
  RemoveJobAdFavouriteAction,
  SELECT_COMPANY,
  SelectCompanyAction,
  SESSION_EXPIRED
} from '../actions/core.actions';
import { HttpClient } from '@angular/common/http';
import { SessionManagerService } from '../../auth/session-manager/session-manager.service';
import { UserDto } from '../../auth/authentication.service';
import { isAuthenticatedUser, User } from '../../auth/user.model';
import { ErrorHandlerService } from '../../error-handler/error-handler.service';
import { NotificationsService } from '../../notifications.service';
import { Router } from '@angular/router';
import { CoreState, getCurrentUser } from '../state/core.state.ts';
import { UserInfoRepository } from '../../../shared/backend-services/user-info/user-info-repository';
import { CompanyRepository } from '../../../shared/backend-services/company/company-repository';
import { CompanyContactTemplate } from '../../../shared/backend-services/user-info/user-info.types';
import { FavouriteItem } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { JobAdFavouritesRepository } from '../../../shared/backend-services/favourites/job-ad-favourites.repository';

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
        catchError<any, Observable<Action>>((err) => {
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
    map((action) => {
      if (action.payload.currentUser) {
        return new LoadAccountabilities({ userId: action.payload.currentUser.id });
      } else {
        return { type: 'nothing' };
      }
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
        return new AccountabilitySelectedAction({ accountability: accountability });
      } else {
        return new AccountabilitySelectedAction({ accountability: null });
      }
    })
  );

  @Effect()
  accountabilitySelected: Observable<Action> = this.actions$.pipe(
    ofType(ACCOUNTABILITY_SELECTED),
    map(action => <AccountabilitySelectedAction>action),
    map(action => action.payload.accountability),
    map((accountability) => {
      if (!accountability) {
        return new SelectCompanyAction({ companySelection: null });
      }
      return new SelectCompanyAction({
        companySelection: {
          companyId: accountability.companyId,
          companyExternalId: accountability.companyExternalId
        }
      });
    }));

  @Effect()
  selectCompany$: Observable<Action> = this.actions$.pipe(
    ofType(SELECT_COMPANY),
    map(action => <SelectCompanyAction>action),
    map(action => action.payload.companySelection),
    withLatestFrom(this.store.pipe(select(getCurrentUser))),
    switchMap(([companySelection, user]) => {
      if (!companySelection) {
        return of(new CompanySelectedAction({ company: null }));
      }
      return this.loadCompanyContactTemplate(user, companySelection).pipe(
        map(companyContactTemplate => new CompanySelectedAction({ company: companyContactTemplate })),
      );
    }),
    catchError<any, Observable<Action>>((err) => of(new EffectErrorOccurredAction({ httpError: err })))
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

  @Effect()
  addJobAdFavourite$: Observable<Action> = this.actions$.pipe(
    ofType(ADD_JOB_AD_FAVOURITE),
    map((action: AddJobAdFavouriteAction) => action.payload),
    withLatestFrom(this.store.pipe(select(getCurrentUser))),
    filter(([action, currentUser]) => isAuthenticatedUser(currentUser)),
    switchMap(([action, currentUser]) => {
        return this.jobAdFavouritesRepository.addFavourite(action.jobAdvertisementId, currentUser.id).pipe(
          map((favouriteItem: FavouriteItem) => new AddedJobAdFavouriteAction({ favouriteItem: favouriteItem })),
          tap(() => this.notificationsService.success('portal.job-ad-favourites.notification.favourite-added')),
          catchError((errorResponse) => of(new EffectErrorOccurredAction({ httpError: errorResponse })))
        );
      }
    )
  );

  @Effect() removeJobAdFavourite$: Observable<Action> = this.actions$.pipe(ofType(REMOVE_JOB_AD_FAVOURITE), map((action: RemoveJobAdFavouriteAction) => action.payload), withLatestFrom(this.store.pipe(select(getCurrentUser))), filter(([action, currentUser]) => isAuthenticatedUser(currentUser)), switchMap(([action]) => {
    return this.jobAdFavouritesRepository.removeFavourite(action.favouriteItem.id).pipe(map(() => new RemovedJobAdFavouriteAction({ removedFavouriteItem: action.favouriteItem })),
      tap(() => {
      if (action.favouriteItem.note) {
        return this.notificationsService.success('portal.job-ad-favourites.notification.favourite-and-note-removed');
      } else {
        return this.notificationsService.success('portal.job-ad-favourites.notification.favourite-removed');
      }
    }), catchError((errorResponse) => of(new EffectErrorOccurredAction({ httpError: errorResponse }))));
  }));

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private companyRepository: CompanyRepository,
              private router: Router,
              private store: Store<CoreState>,
              private userInfoRepository: UserInfoRepository,
              private notificationsService: NotificationsService,
              private errorHandlerService: ErrorHandlerService,
              private sessionManagerService: SessionManagerService,
              private jobAdFavouritesRepository: JobAdFavouritesRepository
  ) {

  }

  private loadCompanyContactTemplate(user: User, companySelection: CompanySelection): Observable<CompanyContactTemplate> {
    return this.userInfoRepository.findCompanyContactTemplate(user.id, companySelection.companyId).pipe(
      catchError((err) => {
        if (err.status !== 404) {
          return throwError(err);
        }
        return this.companyRepository.findByExternalId(companySelection.companyExternalId).pipe(
          map(company => {
            return {
              companyId: company.id,
              companyName: company.name,
              companyStreet: company.street,
              companyHouseNr: null,
              companyZipCode: company.zipCode,
              companyCity: company.city,
              phone: null,
              email: user.email,
              salutation: null,
            };
          })
        );
      })
    );
  }
}

