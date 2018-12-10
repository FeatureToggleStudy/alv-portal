import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { asyncScheduler, Observable, of } from 'rxjs/index';
import { Action, select, Store } from '@ngrx/store';
import {
  APPLY_FILTER,
  ApplyFilterAction,
  FilterAppliedAction,
  INIT_RESULT_LIST,
  LOAD_NEXT_JOB_ADVERTISEMENT_DETAIL,
  LOAD_NEXT_PAGE,
  LOAD_PREVIOUS_JOB_ADVERTISEMENT_DETAIL,
  LoadNextPageAction,
  NEXT_PAGE_LOADED,
  NextPageLoadedAction
} from '../actions/job-ad-search.actions';
import { JobAdvertisementRepository } from '../../../shared/backend-services/job-advertisement/job-advertisement.repository';
import {
  catchError,
  debounceTime,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
  withLatestFrom
} from 'rxjs/internal/operators';
import {
  getJobAdSearchState,
  getNextId,
  getPrevId,
  JobAdSearchState
} from '../state/job-ad-search.state';
import { JobSearchRequestMapper } from './job-search-request.mapper';
import { Router } from '@angular/router';
import { JobAdvertisementSearchResponse } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { SchedulerLike } from 'rxjs/src/internal/types';
import { AsyncScheduler } from 'rxjs/internal/scheduler/AsyncScheduler';
import { EffectErrorOccurredAction } from '../../../core/state-management/actions/core.actions';

export const JOB_AD_SEARCH_EFFECTS_DEBOUNCE = new InjectionToken<number>('JOB_AD_SEARCH_EFFECTS_DEBOUNCE');
export const JOB_AD_SEARCH_EFFECTS_SCHEDULER = new InjectionToken<SchedulerLike>('JOB_AD_SEARCH_EFFECTS_SCHEDULER');

@Injectable()
export class JobAdSearchEffects {

  @Effect()
  initJobSearch$ = this.actions$.pipe(
    ofType(INIT_RESULT_LIST),
    take(1),
    withLatestFrom(this.store.pipe(select(getJobAdSearchState))),
    switchMap(([filter, state]) => this.jobAdvertisementRepository.search(JobSearchRequestMapper.mapToRequest(state.jobSearchFilter, state.page)).pipe(
      map((response) => new FilterAppliedAction({
        page: response.result,
        totalCount: response.totalCount
      })),
      catchError((errorResponse) => of(new EffectErrorOccurredAction({ httpError: errorResponse })))
    )),
    takeUntil(this.actions$.pipe(ofType(APPLY_FILTER))),
  );

  @Effect()
  applyFilter$: Observable<Action> = this.actions$.pipe(
    ofType(APPLY_FILTER),
    map((action: ApplyFilterAction) => action.payload),
    debounceTime(this.debounce || 300, this.scheduler || asyncScheduler),
    withLatestFrom(this.store.pipe(select(getJobAdSearchState))),
    switchMap(([filter, state]) => this.jobAdvertisementRepository.search(JobSearchRequestMapper.mapToRequest(filter, state.page)).pipe(
      map((response) => new FilterAppliedAction({
        page: response.result,
        totalCount: response.totalCount
      })),
      catchError((errorResponse) => of(new EffectErrorOccurredAction({ httpError: errorResponse })))
    )),
  );

  @Effect()
  loadNextPage$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_NEXT_PAGE),
    debounceTime(this.debounce || 300, this.scheduler || asyncScheduler),
    withLatestFrom(this.store.pipe(select(getJobAdSearchState))),
    switchMap(([action, state]) => this.jobAdvertisementRepository.search(JobSearchRequestMapper.mapToRequest(state.jobSearchFilter, state.page + 1)).pipe(
      map((response: JobAdvertisementSearchResponse) => new NextPageLoadedAction({ page: response.result })),
      catchError((errorResponse) => of(new EffectErrorOccurredAction({ httpError: errorResponse })))
    )),
  );

  @Effect()
  loadPreviousJobAdvertisementDetail$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_PREVIOUS_JOB_ADVERTISEMENT_DETAIL),
    withLatestFrom(this.store.pipe(select(getPrevId))),
    map(([action, id]) => id),
    tap((id) => {
      this.router.navigate(['/job-search', id]);
    }),
    map(() => {
      return { type: 'nothing' };
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
          map((nextPageLoadedAction: NextPageLoadedAction) => {
            return nextPageLoadedAction.payload.page[0].id;
          }),
          take(1)
        );
      }
    }),
    tap((id) => {
      this.router.navigate(['/job-search', id]);
    }),
    map(() => {
      return { type: 'nothing' };
    })
  );

  constructor(private actions$: Actions,
              private jobAdvertisementRepository: JobAdvertisementRepository,
              private store: Store<JobAdSearchState>,
              private router: Router,
              @Optional()
              @Inject(JOB_AD_SEARCH_EFFECTS_DEBOUNCE)
              private debounce,
              @Optional()
              @Inject(JOB_AD_SEARCH_EFFECTS_SCHEDULER)
              private scheduler: AsyncScheduler) {
  }

}
