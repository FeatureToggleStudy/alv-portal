import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { AsyncScheduler } from 'rxjs/internal/scheduler/AsyncScheduler';
import { SchedulerLike } from 'rxjs/src/internal/types';
import { Actions, Effect, ofType } from '@ngrx/effects';
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
import { Action, select, Store } from '@ngrx/store';
import { CandidateRepository } from '../../../shared/backend-services/candidate/candidate.repository';
import { asyncScheduler, Observable, of } from 'rxjs/index';
import { EffectErrorOccurredAction } from '../../../core/state-management/actions/core.actions';
import {
  APPLY_FILTER,
  ApplyFilterAction,
  CandidateSearchRequestMapper,
  CandidateSearchState,
  FilterAppliedAction,
  getCandidateSearchState,
  getNextId,
  getPrevId,
  INIT_RESULT_LIST,
  LOAD_NEXT_CANDIDATE_PROFILE_DETAIL,
  LOAD_NEXT_PAGE,
  LOAD_PREVIOUS_CANDIDATE_PROFILE_DETAIL,
  LoadNextPageAction,
  NEXT_PAGE_LOADED,
  NextPageLoadedAction
} from '..';
import { Router } from '@angular/router';

export const CANDIDATE_SEARCH_EFFECTS_DEBOUNCE = new InjectionToken<number>('CANDIDATE_SEARCH_EFFECTS_DEBOUNCE');
export const CANDIDATE_SEARCH_EFFECTS_SCHEDULER = new InjectionToken<SchedulerLike>('CANDIDATE_SEARCH_EFFECTS_SCHEDULER');

@Injectable()
export class CandidateSearchEffects {

  @Effect()
  initCandidateSearch$ = this.actions$.pipe(
    ofType(INIT_RESULT_LIST),
    take(1),
    withLatestFrom(this.store.pipe(select(getCandidateSearchState))),
    switchMap(([filter, state]) => this.candidateRepository.searchCandidateProfiles(CandidateSearchRequestMapper.mapToRequest(state.candidateSearchFilter, state.page))
      .pipe(
        map((response) => new FilterAppliedAction({
          page: response.result,
          totalCount: response.totalCount
        })),
        catchError((errorResponse) => of(new EffectErrorOccurredAction({ httpError: errorResponse })))
      )
    ),
    takeUntil(this.actions$.pipe(ofType(APPLY_FILTER)))
  );

  @Effect()
  applyFilter$: Observable<Action> = this.actions$.pipe(
    ofType(APPLY_FILTER),
    map((action: ApplyFilterAction) => action.payload),
    debounceTime(this.debounce || 300, this.scheduler || asyncScheduler),
    withLatestFrom(this.store.pipe(select(getCandidateSearchState))),
    switchMap(([filter, state]) => this.candidateRepository.searchCandidateProfiles(CandidateSearchRequestMapper.mapToRequest(filter, state.page)).pipe(
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
    withLatestFrom(this.store.pipe(select(getCandidateSearchState))),
    switchMap(([action, state]) => this.candidateRepository.searchCandidateProfiles(CandidateSearchRequestMapper.mapToRequest(state.candidateSearchFilter, state.page + 1))
      .pipe(
        map((response) => new NextPageLoadedAction({ page: response.result })),
        catchError((errorResponse) => of(new EffectErrorOccurredAction({ httpError: errorResponse })))
      )),
    takeUntil(this.actions$.pipe(ofType(APPLY_FILTER))),
    // todo: implement
  );

  @Effect()
  loadPreviousCandidateProfileDetail$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_PREVIOUS_CANDIDATE_PROFILE_DETAIL),
    withLatestFrom(this.store.pipe(select(getPrevId))),
    map(([action, id]) => id),
    tap((id) => {
      this.router.navigate(['/candidate-search', id]);
    }),
    map(() => {
      return { type: 'nothing' };
    })
  );

  @Effect()
  loadNextCandidateProfileDetail$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_NEXT_CANDIDATE_PROFILE_DETAIL),
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
      this.router.navigate(['/candidate-search', id]);
    }),
    map(() => {
      return { type: 'nothing' };
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<CandidateSearchState>,
    private candidateRepository: CandidateRepository,
    private router: Router,
    @Optional() @Inject(CANDIDATE_SEARCH_EFFECTS_DEBOUNCE) private debounce,
    @Optional() @Inject(CANDIDATE_SEARCH_EFFECTS_SCHEDULER) private scheduler: AsyncScheduler
  ) {
  }
}
