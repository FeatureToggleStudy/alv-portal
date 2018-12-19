import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { AsyncScheduler } from 'rxjs/internal/scheduler/AsyncScheduler';
import { SchedulerLike } from 'rxjs/src/internal/types';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  switchMap,
  take,
  takeUntil,
  withLatestFrom
} from 'rxjs/internal/operators';
import { select, Store } from '@ngrx/store';
import { CandidateRepository } from '../../../shared/backend-services/candidate/candidate.repository';
import { of } from 'rxjs/index';
import { EffectErrorOccurredAction } from '../../../core/state-management/actions/core.actions';
import {
  APPLY_FILTER,
  ApplyFilterAction,
  CandidateSearchRequestMapper,
  CandidateSearchState,
  FilterAppliedAction,
  getCandidateSearchState,
  INIT_RESULT_LIST
} from '..';

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

  constructor(
    private actions$: Actions,
    private store: Store<CandidateSearchState>,
    private candidateRepository: CandidateRepository,
    @Optional() @Inject(CANDIDATE_SEARCH_EFFECTS_DEBOUNCE) private debounce,
    @Optional() @Inject(CANDIDATE_SEARCH_EFFECTS_SCHEDULER) private scheduler: AsyncScheduler
  ) {
  }
}
