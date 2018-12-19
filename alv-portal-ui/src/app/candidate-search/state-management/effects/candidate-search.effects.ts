import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { AsyncScheduler } from 'rxjs/internal/scheduler/AsyncScheduler';
import { SchedulerLike } from 'rxjs/src/internal/types';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { take, takeUntil, withLatestFrom } from 'rxjs/internal/operators';

import { select, Store } from '@ngrx/store';
import {
  CandidateSearchState,
  getCandidateSearchState
} from '../state/candidate-search.state';
import { APPLY_FILTER, INIT_RESULT_LIST } from '../actions/candidate-search.actions';

export const CANDIDATE_SEARCH_EFFECTS_DEBOUNCE = new InjectionToken<number>('CANDIDATE_SEARCH_EFFECTS_DEBOUNCE');
export const CANDIDATE_SEARCH_EFFECTS_SCHEDULER = new InjectionToken<SchedulerLike>('CANDIDATE_SEARCH_EFFECTS_SCHEDULER');

@Injectable()
export class CandidateSearchEffects {

  @Effect()
  initCandidateSearch$ = this.actions$.pipe(
    ofType(INIT_RESULT_LIST),
    take(1),
    withLatestFrom(this.store.pipe(select(getCandidateSearchState))),
    takeUntil(this.actions$.pipe(ofType(APPLY_FILTER))),
  );

  constructor(
    private actions$: Actions,
    private store: Store<CandidateSearchState>,
    @Optional() @Inject(CANDIDATE_SEARCH_EFFECTS_DEBOUNCE) private debounce,
    @Optional() @Inject(CANDIDATE_SEARCH_EFFECTS_SCHEDULER) private scheduler: AsyncScheduler
  ) {
  }
}
