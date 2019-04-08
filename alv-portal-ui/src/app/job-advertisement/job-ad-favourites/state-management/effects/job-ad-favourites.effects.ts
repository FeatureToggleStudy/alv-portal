import {Inject, Injectable, InjectionToken, Optional} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {JobAdvertisementRepository} from '../../../../shared/backend-services/job-advertisement/job-advertisement.repository';
import {AsyncScheduler} from 'rxjs/internal/scheduler/AsyncScheduler';
import {
  catchError,
  concatMap,
  debounceTime,
  map,
  skipUntil,
  switchMap,
  take,
  takeUntil,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import {Action, select, Store} from '@ngrx/store';
import {asyncScheduler, Observable, of} from 'rxjs';
import {
  EffectErrorOccurredAction,
  JOB_ADVERTISEMENT_CHANGED,
  JobAdvertisementUpdatedAction
} from '../../../../core/state-management/actions/core.actions';
import {
  getJobAdFavouritesSearchFilter,
  getJobAdFavouritesState,
  getNextId,
  getPrevId,
  JobAdFavouritesState
} from '../state';
import {
  APPLY_FILTER,
  ApplyFilterAction,
  FILTER_APPLIED,
  FilterAppliedAction,
  INIT_RESULT_LIST,
  LOAD_NEXT_JOB_ADVERTISEMENT_DETAIL,
  LOAD_NEXT_PAGE,
  LOAD_PREVIOUS_JOB_ADVERTISEMENT_DETAIL,
  LoadNextPageAction,
  NEXT_PAGE_LOADED,
  NextPageLoadedAction
} from '../actions';
import {getCurrentCompanyContactTemplateModel} from '../../../../core/state-management/state/core.state.ts';
import {JobAdvertisementSearchResponse} from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';
import {SchedulerLike} from 'rxjs/src/internal/types';
import {Router} from '@angular/router';
import {JobAdFavouritesRepository} from '../../../../shared/backend-services/favourites/job-ad-favourites.repository';
import {JobAdFavouritesSearchRequestMapper} from '../../job-ad-favourites/job-ad-favourites-search-request.mapper';
import { AuthenticationService } from '../../../../core/auth/authentication.service';

export const JOB_AD_FAVOURITES_EFFECTS_DEBOUNCE = new InjectionToken<number>('JOB_AD_FAVOURITES_EFFECTS_DEBOUNCE');
export const JOB_AD_FAVOURITES_EFFECTS_SCHEDULER = new InjectionToken<SchedulerLike>('JOB_AD_FAVOURITES_EFFECTS_SCHEDULER');

@Injectable()
export class JobAdFavouritesEffects {

  @Effect()
  initJobSearch$ = this.actions$.pipe(
    ofType(INIT_RESULT_LIST),
    withLatestFrom(this.store.pipe(select(getJobAdFavouritesState)), this.authenticationService.getCurrentUser()),
    switchMap(([action, state, user]) => {
      return this.jobAdFavouritesRepository.getFavouritesForUser(JobAdFavouritesSearchRequestMapper.mapToRequest(state.filter, state.page), user.id).pipe(
        map((response) => new FilterAppliedAction({
          page: response.result,
          totalCount: response.totalCount
        })),
        catchError((errorResponse) => of(new EffectErrorOccurredAction({httpError: errorResponse})))
      );
    }),
    // unsubscribe the initJobSearch$ once we have applied a filter
    takeUntil(this.actions$.pipe(ofType(FILTER_APPLIED))),
  );

  @Effect()
  applyFilter$: Observable<Action> = this.actions$.pipe(
    ofType(APPLY_FILTER),
    map((action: ApplyFilterAction) => action.payload),
    debounceTime(this.debounce || 300, this.scheduler || asyncScheduler),
    withLatestFrom(this.store.pipe(select(getJobAdFavouritesState))),
    switchMap(([JobAdFavouritesSearchFilter, state]) => {
      return this.jobAdFavouritesRepository.getFavouritesForUser(JobAdFavouritesSearchRequestMapper.mapToRequest(JobAdFavouritesSearchFilter, state.page)).pipe(
        map((response) => new FilterAppliedAction({
          page: response.result,
          totalCount: response.totalCount
        })),
        catchError((errorResponse) => of(new EffectErrorOccurredAction({httpError: errorResponse})))
      );
    })
  );

  @Effect()
  loadNextPage$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_NEXT_PAGE),
    debounceTime(this.debounce || 300, this.scheduler || asyncScheduler),
    withLatestFrom(this.store.pipe(select(getJobAdFavouritesState))),
    concatMap(([action, state]) => this.jobAdFavouritesRepository.getFavouritesForUser(JobAdFavouritesSearchRequestMapper.mapToRequest(state.filter, state.page + 1)).pipe(
      map((response: JobAdvertisementSearchResponse) => new NextPageLoadedAction({page: response.result})),
      catchError((errorResponse) => of(new EffectErrorOccurredAction({httpError: errorResponse})))
    )),
  );

  @Effect()
  loadPreviousJobAdvertisementDetail$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_PREVIOUS_JOB_ADVERTISEMENT_DETAIL),
    withLatestFrom(this.store.pipe(select(getPrevId))),
    map(([action, id]) => id),
    tap((id) => {
      this.router.navigate(['/job-favourites', id]);
    }),
    map(() => {
      return {type: 'nothing'};
    })
  );

  @Effect()
  loadNextJobAdvertisementDetail$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_NEXT_JOB_ADVERTISEMENT_DETAIL),
    withLatestFrom(this.store.pipe(select(getNextId))),
    switchMap(([action, id]) => {
      if (id) {
        return of(id);
      } else {
        this.store.dispatch(new LoadNextPageAction());
        return this.actions$.pipe(
          ofType(NEXT_PAGE_LOADED),
          take(1),
          map((nextPageLoadedAction: NextPageLoadedAction) => {
            return nextPageLoadedAction.payload.page[0].jobAdvertisement.id;
          })
        );
      }
    }),
    tap((id) => {
      this.router.navigate(['/job-favourites', id]);
    }),
    map(() => {
      return {type: 'nothing'};
    })
  );

  constructor(private actions$: Actions,
              private store: Store<JobAdFavouritesState>,
              private jobAdvertisementRepository: JobAdvertisementRepository,
              private jobAdFavouritesRepository: JobAdFavouritesRepository,
              private router: Router,
              @Optional()
              @Inject(JOB_AD_FAVOURITES_EFFECTS_DEBOUNCE)
              private debounce,
              @Optional()
              @Inject(JOB_AD_FAVOURITES_EFFECTS_SCHEDULER)
              private scheduler: AsyncScheduler,
              private authenticationService: AuthenticationService) {
  }
}
