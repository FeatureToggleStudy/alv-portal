import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { JobAdvertisementRepository } from '../../../../shared/backend-services/job-advertisement/job-advertisement.repository';
import { AsyncScheduler } from 'rxjs/internal/scheduler/AsyncScheduler';
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
import { Action, select, Store } from '@ngrx/store';
import { asyncScheduler, Observable, of } from 'rxjs';
import {
  EffectErrorOccurredAction,
  JOB_ADVERTISEMENT_CHANGED,
  JobAdvertisementUpdatedAction
} from '../../../../core/state-management/actions/core.actions';
import {
  getManagedJobAdsSearchFilter,
  getManageJobAdsState,
  getNextId,
  getPrevId,
  ManageJobAdsState
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
import { getCurrentCompanyContactTemplateModel } from '../../../../core/state-management/state/core.state.ts';
import {
  JobAdvertisementSearchResponse,
  ManagedJobAdsSearchResponse
} from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { SchedulerLike } from 'rxjs/src/internal/types';
import { ManagedJobAdsSearchRequestMapper } from '../../../../widgets/manage-job-ads-widget/managed-job-ads-search-request.mapper';
import { Router } from '@angular/router';

export const MANAGE_JOB_ADS_EFFECTS_DEBOUNCE = new InjectionToken<number>('MANAGE_JOB_ADS_EFFECTS_DEBOUNCE');
export const MANAGE_JOB_ADS_EFFECTS_SCHEDULER = new InjectionToken<SchedulerLike>('MANAGE_JOB_ADS_EFFECTS_SCHEDULER');

@Injectable()
export class ManageJobAdsEffects {

  @Effect()
  jobAdvertisementChanged$: Observable<Action> = this.actions$.pipe(
    ofType(JOB_ADVERTISEMENT_CHANGED),
    // only apply the filter action if it has been applied before
    skipUntil(this.actions$.pipe(ofType(FILTER_APPLIED))),
    map((action: JobAdvertisementUpdatedAction) => action.payload),
    withLatestFrom(this.store.pipe(select(getManagedJobAdsSearchFilter))),
    map(([action, filter]) => {
      return new ApplyFilterAction(filter);
    })
  );

  @Effect()
  initJobSearch$ = this.actions$.pipe(
    ofType(INIT_RESULT_LIST),
    withLatestFrom(this.store.pipe(select(getManageJobAdsState)), this.store.pipe(select(getCurrentCompanyContactTemplateModel))),
    switchMap(([action, state, company]) => {
      return this.jobAdvertisementRepository.searchManagedJobAds(ManagedJobAdsSearchRequestMapper.mapToRequest(state.filter, state.page, company.companyExternalId)).pipe(
        map((response) => new FilterAppliedAction({
          page: response.result,
          totalCount: response.totalCount
        })),
        catchError((errorResponse) => of(new EffectErrorOccurredAction({ httpError: errorResponse })))
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
    withLatestFrom(this.store.pipe(select(getManageJobAdsState)), this.store.pipe(select(getCurrentCompanyContactTemplateModel))),
    switchMap(([managedJobAdsSearchFilter, state, company]) => {
      return this.jobAdvertisementRepository.searchManagedJobAds(ManagedJobAdsSearchRequestMapper.mapToRequest(managedJobAdsSearchFilter, state.page, company.companyExternalId)).pipe(
        map((response) => new FilterAppliedAction({
          page: response.result,
          totalCount: response.totalCount
        })),
        catchError((errorResponse) => of(new EffectErrorOccurredAction({ httpError: errorResponse })))
      );
    })
  );

  @Effect()
  loadNextPage$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_NEXT_PAGE),
    debounceTime(this.debounce || 300, this.scheduler || asyncScheduler),
    withLatestFrom(this.store.pipe(select(getManageJobAdsState)), this.store.pipe(select(getCurrentCompanyContactTemplateModel))),
    concatMap(([action, state, company]) => this.jobAdvertisementRepository.searchManagedJobAds(ManagedJobAdsSearchRequestMapper.mapToRequest(state.filter, state.page + 1, company.companyExternalId)).pipe(
      map((response: ManagedJobAdsSearchResponse) => new NextPageLoadedAction({ page: response.result })),
      catchError((errorResponse) => of(new EffectErrorOccurredAction({ httpError: errorResponse })))
    )),
  );

  @Effect()
  loadPreviousJobAdvertisementDetail$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_PREVIOUS_JOB_ADVERTISEMENT_DETAIL),
    withLatestFrom(this.store.pipe(select(getPrevId))),
    map(([action, id]) => id),
    tap((id) => {
      this.router.navigate(['/manage-job-ads', id]);
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
          take(1),
          map((nextPageLoadedAction: NextPageLoadedAction) => {
            return nextPageLoadedAction.payload.page[0].id;
          })
        );
      }
    }),
    tap((id) => {
      this.router.navigate(['/manage-job-ads', id]);
    }),
    map(() => {
      return { type: 'nothing' };
    })
  );

  constructor(private actions$: Actions,
              private store: Store<ManageJobAdsState>,
              private jobAdvertisementRepository: JobAdvertisementRepository,
              private router: Router,
              @Optional()
              @Inject(MANAGE_JOB_ADS_EFFECTS_DEBOUNCE)
              private debounce,
              @Optional()
              @Inject(MANAGE_JOB_ADS_EFFECTS_SCHEDULER)
              private scheduler: AsyncScheduler) {
  }
}
