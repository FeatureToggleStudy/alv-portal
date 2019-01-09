import { Inject, Injectable, Optional } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { JobAdvertisementRepository } from '../../../shared/backend-services/job-advertisement/job-advertisement.repository';
import {
  JOB_AD_SEARCH_EFFECTS_DEBOUNCE,
  JOB_AD_SEARCH_EFFECTS_SCHEDULER
} from '../../../job-ad-search/state-management/effects';
import { AsyncScheduler } from 'rxjs/internal/scheduler/AsyncScheduler';
import {
  catchError,
  concatMap,
  debounceTime,
  map,
  switchMap,
  takeUntil,
  withLatestFrom
} from 'rxjs/operators';
import { Action, select, Store } from '@ngrx/store';
import { asyncScheduler, Observable, of } from 'rxjs';
import { EffectErrorOccurredAction } from '../../../core/state-management/actions/core.actions';
import { getManageJobAdsState, ManageJobAdsState } from '../state';
import {
  APPLY_FILTER,
  ApplyFilterAction,
  FILTER_APPLIED,
  FilterAppliedAction,
  INIT_RESULT_LIST,
  LOAD_NEXT_PAGE,
  NextPageLoadedAction
} from '../actions/manage-job-ads.actions';
import { ManagedJobAdsSearchRequestMapper } from './managed-job-ads-search-request.mapper';
import { getCurrentCompanyContactTemplateModel } from '../../../core/state-management/state/core.state.ts';
import { JobAdvertisementSearchResponse } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';


@Injectable()
export class ManageJobAdsEffects {

  @Effect()
  initJobSearch$ = this.actions$.pipe(
    ofType(INIT_RESULT_LIST),
    withLatestFrom(this.store.pipe(select(getManageJobAdsState)), this.store.pipe(select(getCurrentCompanyContactTemplateModel))),
    switchMap(([action, state, company]) => {
      return this.jobAdvertisementRepository.findManagedJobAds(ManagedJobAdsSearchRequestMapper.mapToRequest(state.filter, state.page, company.companyExternalId)).pipe(
        map((response) => new FilterAppliedAction({
          page: response.result,
          totalCount: response.totalCount
        })),
        catchError((errorResponse) => of(new EffectErrorOccurredAction({ httpError: errorResponse })))
      );
    }),
    takeUntil(this.actions$.pipe(ofType(FILTER_APPLIED))),
  );

  @Effect()
  applyFilter$: Observable<Action> = this.actions$.pipe(
    ofType(APPLY_FILTER),
    map((action: ApplyFilterAction) => action.payload),
    debounceTime(this.debounce || 300, this.scheduler || asyncScheduler),
    withLatestFrom(this.store.pipe(select(getManageJobAdsState)), this.store.pipe(select(getCurrentCompanyContactTemplateModel))),
    switchMap(([managedJobAdsSearchFilter, state, company]) => this.jobAdvertisementRepository.findManagedJobAds(ManagedJobAdsSearchRequestMapper.mapToRequest(managedJobAdsSearchFilter, state.page, company.companyExternalId)).pipe(
      map((response) => new FilterAppliedAction({
        page: response.result,
        totalCount: response.totalCount
      })),
      catchError((errorResponse) => of(new EffectErrorOccurredAction({ httpError: errorResponse })))
    ))
  );

  @Effect()
  loadNextPage$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_NEXT_PAGE),
    debounceTime(this.debounce || 300, this.scheduler || asyncScheduler),
    withLatestFrom(this.store.pipe(select(getManageJobAdsState)), this.store.pipe(select(getCurrentCompanyContactTemplateModel))),
    concatMap(([action, state, company]) => this.jobAdvertisementRepository.findManagedJobAds(ManagedJobAdsSearchRequestMapper.mapToRequest(state.filter, state.page + 1, company.companyExternalId)).pipe(
      map((response: JobAdvertisementSearchResponse) => new NextPageLoadedAction({ page: response.result })),
      catchError((errorResponse) => of(new EffectErrorOccurredAction({ httpError: errorResponse })))
    )),
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
