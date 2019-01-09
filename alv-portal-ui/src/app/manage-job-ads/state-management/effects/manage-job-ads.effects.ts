import { Inject, Injectable, Optional } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { JobAdvertisementRepository } from '../../../shared/backend-services/job-advertisement/job-advertisement.repository';
import {
  JOB_AD_SEARCH_EFFECTS_DEBOUNCE,
  JOB_AD_SEARCH_EFFECTS_SCHEDULER
} from '../../../job-ad-search/state-management/effects';
import { AsyncScheduler } from 'rxjs/internal/scheduler/AsyncScheduler';
import { catchError, map, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { EffectErrorOccurredAction } from '../../../core/state-management/actions/core.actions';
import { getManageJobAdsState, ManageJobAdsState } from '../state';
import {
  FILTER_APPLIED,
  FilterAppliedAction,
  INIT_RESULT_LIST
} from '../actions/manage-job-ads.actions';
import { ManagedJobAdsSearchRequestMapper } from './managed-job-ads-search-request.mapper';

@Injectable()
export class ManageJobAdsEffects {

  @Effect()
  initJobSearch$ = this.actions$.pipe(
    ofType(INIT_RESULT_LIST),
    withLatestFrom(this.store.pipe(select(getManageJobAdsState))),
    switchMap(([action, state]) => {
      return this.jobAdvertisementRepository.findManagedJobAds(ManagedJobAdsSearchRequestMapper.mapToRequest(state.filter, state.page)).pipe(
        map((response) => new FilterAppliedAction({
          page: response.result,
          totalCount: response.totalCount
        })),
        catchError((errorResponse) => of(new EffectErrorOccurredAction({ httpError: errorResponse })))
      );
    }),
    takeUntil(this.actions$.pipe(ofType(FILTER_APPLIED))),
  );


  constructor(private actions$: Actions,
              private store: Store<ManageJobAdsState>,
              private jobAdvertisementRepository: JobAdvertisementRepository,
              @Optional()
              @Inject(JOB_AD_SEARCH_EFFECTS_DEBOUNCE)
              private debounce,
              @Optional()
              @Inject(JOB_AD_SEARCH_EFFECTS_SCHEDULER)
              private scheduler: AsyncScheduler) {
  }
}
