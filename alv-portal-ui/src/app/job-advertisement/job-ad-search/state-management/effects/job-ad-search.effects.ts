import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { asyncScheduler, Observable, of } from 'rxjs/index';
import { Action, select, Store } from '@ngrx/store';
import {
  APPLY_FILTER,
  APPLY_FILTER_VALUES,
  APPLY_QUERY_VALUES,
  ApplyFilterAction,
  FILTER_APPLIED,
  FilterAppliedAction,
  FilterResetAction,
  INIT_RESULT_LIST,
  LOAD_NEXT_JOB_ADVERTISEMENT_DETAIL,
  LOAD_NEXT_PAGE,
  LOAD_PREVIOUS_JOB_ADVERTISEMENT_DETAIL,
  LoadNextPageAction,
  NEXT_PAGE_LOADED,
  NextPageLoadedAction,
  OccupationLanguageChangedAction,
  RESET_FILTER
} from '../actions';
import { JobAdvertisementRepository } from '../../../../shared/backend-services/job-advertisement/job-advertisement.repository';
import {
  catchError,
  concatMap,
  debounceTime,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import {
  getJobAdSearchState,
  getJobSearchFilter,
  getNextId,
  getPrevId,
  JobAdSearchState
} from '../state';
import { JobSearchRequestMapper } from './job-search-request.mapper';
import { Router } from '@angular/router';
import { JobAdvertisementSearchResponse } from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { SchedulerLike } from 'rxjs/src/internal/types';
import { AsyncScheduler } from 'rxjs/internal/scheduler/AsyncScheduler';
import {
  EffectErrorOccurredAction,
  JOB_ADVERTISEMENT_CHANGED,
  JobAdvertisementUpdatedAction,
  LANGUAGE_CHANGED,
  LanguageChangedAction
} from '../../../../core/state-management/actions/core.actions';
import { OccupationSuggestionService } from '../../../../shared/occupations/occupation-suggestion.service';

export const JOB_AD_SEARCH_EFFECTS_DEBOUNCE = new InjectionToken<number>('JOB_AD_SEARCH_EFFECTS_DEBOUNCE');
export const JOB_AD_SEARCH_EFFECTS_SCHEDULER = new InjectionToken<SchedulerLike>('JOB_AD_SEARCH_EFFECTS_SCHEDULER');

@Injectable()
export class JobAdSearchEffects {

  @Effect()
  jobAdvertisementChanged$: Observable<Action> = this.actions$.pipe(
    ofType(JOB_ADVERTISEMENT_CHANGED),
    map((action: JobAdvertisementUpdatedAction) => action.payload),
    withLatestFrom(this.store.pipe(select(getJobSearchFilter))),
    map(([action, searchFilter]) => {
      return new ApplyFilterAction(searchFilter);
    })
  );

  @Effect()
  initJobSearch$ = this.actions$.pipe(
    ofType(INIT_RESULT_LIST),
    withLatestFrom(this.store.pipe(select(getJobAdSearchState))),
    switchMap(([action, state]) => this.jobAdvertisementRepository.search(JobSearchRequestMapper.mapToRequest(state.jobSearchFilter, state.page)).pipe(
      map((response) => new FilterAppliedAction({
        page: response.result,
        totalCount: response.totalCount
      })),
      catchError((errorResponse) => of(new EffectErrorOccurredAction({ httpError: errorResponse })))
    )),
    takeUntil(this.actions$.pipe(ofType(FILTER_APPLIED))),
  );

  @Effect()
  applyFilter$: Observable<Action> = this.actions$.pipe(
    ofType(APPLY_FILTER),
    map((action: ApplyFilterAction) => action.payload),
    debounceTime(this.debounce || 300, this.scheduler || asyncScheduler),
    withLatestFrom(this.store.pipe(select(getJobAdSearchState))),
    switchMap(([jobSearchFilter, state]) => this.jobAdvertisementRepository.search(JobSearchRequestMapper.mapToRequest(jobSearchFilter, state.page)).pipe(
      map((response) => new FilterAppliedAction({
        page: response.result,
        totalCount: response.totalCount
      })),
      catchError((errorResponse) => of(new EffectErrorOccurredAction({ httpError: errorResponse })))
    ))
  );

  @Effect()
  resetFilter$: Observable<Action> = this.actions$.pipe(
    ofType(RESET_FILTER),
    withLatestFrom(this.store.pipe(select(getJobSearchFilter))),
    switchMap(([action, jobSearchFilter]) => {
      return [
        new ApplyFilterAction(jobSearchFilter),
        new FilterResetAction(jobSearchFilter)
      ];
    })
  );

  @Effect()
  applyQueryValues$: Observable<Action> = this.actions$.pipe(
    ofType(APPLY_QUERY_VALUES),
    withLatestFrom(this.store.pipe(select(getJobAdSearchState))),
    map(([action, state]) => new ApplyFilterAction(state.jobSearchFilter))
  );

  @Effect()
  applyFilterValues$: Observable<Action> = this.actions$.pipe(
    ofType(APPLY_FILTER_VALUES),
    withLatestFrom(this.store.pipe(select(getJobAdSearchState))),
    map(([action, state]) => new ApplyFilterAction(state.jobSearchFilter))
  );

  @Effect()
  loadNextPage$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_NEXT_PAGE),
    debounceTime(this.debounce || 300, this.scheduler || asyncScheduler),
    withLatestFrom(this.store.pipe(select(getJobAdSearchState))),
    concatMap(([action, state]) => this.jobAdvertisementRepository.search(JobSearchRequestMapper.mapToRequest(state.jobSearchFilter, state.page + 1)).pipe(
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
  translateOccupationsOnLanguageChanged$: Observable<Action> = this.actions$.pipe(
    ofType(LANGUAGE_CHANGED),
    map((a: LanguageChangedAction) => a),
    withLatestFrom(this.store.pipe(select(getJobSearchFilter))),
    filter(([action, jobSearchFilter]) => !!jobSearchFilter.occupations),
    filter(([action, jobSearchFilter]) => jobSearchFilter.occupations.length > 0),
    switchMap(([action, jobSearchFilter]) => {
      return this.occupationSuggestionService.translateAll(jobSearchFilter.occupations, action.payload.language);
    }),
    map((updatedOccupations) => {
      return new OccupationLanguageChangedAction({ occupations: updatedOccupations });
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
      this.router.navigate(['/job-search', id]);
    }),
    map(() => {
      return { type: 'nothing' };
    })
  );

  constructor(private actions$: Actions,
              private occupationSuggestionService: OccupationSuggestionService,
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
