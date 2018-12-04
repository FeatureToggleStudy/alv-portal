import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs/index';
import { Action, select, Store } from '@ngrx/store';
import {
  APPLY_FILTER,
  ApplyFilterAction,
  FilterAppliedAction,
  INIT_JOB_SEARCH,
  InitJobSearchAction,
  JobAdvertisementDetailLoadedAction,
  LOAD_JOB_ADVERTISEMENT_DETAIL,
  LOAD_NEXT_JOB_ADVERTISEMENT_DETAIL,
  LOAD_NEXT_PAGE,
  LOAD_PREVIOUS_JOB_ADVERTISEMENT_DETAIL,
  LoadJobAdvertisementDetailAction,
  LoadNextPageAction,
  NEXT_PAGE_LOADED,
  NextPageLoadedAction
} from '../actions/job-ad-search.actions';
import { JobAdvertisementRepository } from '../../../shared/backend-services/job-advertisement/job-advertisement.repository';
import {
  debounceTime,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom
} from 'rxjs/internal/operators';
import {
  getJobAdSearchState,
  getNextId,
  getPrevId,
  initialState,
  JobAdSearchState
} from '../state/job-ad-search.state';
import { JobSearchRequestMapper } from '../../job-search-request.mapper';
import { Router } from '@angular/router';
import { JobAdvertisementSearchResponse } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';

@Injectable()
export class JobAdSearchEffects {

  @Effect()
  initJobSearch$: Observable<Action> = this.actions$.pipe(
    ofType(INIT_JOB_SEARCH),
    take(1),
    map((action: InitJobSearchAction) => new ApplyFilterAction({
      ...initialState.jobSearchFilter, onlineSince: action.payload.onlineSince
    }))
    //withLatestFrom(this.store.pipe(select(getJobAdSearchState))),
    //switchMap(([action, state]) => this.jobAdsService.search(JobSearchRequestMapper.mapToRequest(state.jobSearchFilter, state.page))),
    //map((response: JobAdvertisementSearchResponse) => new FilterAppliedAction({
    //  jobList: response.result,
    //  totalCount: response.totalCount
    //}))
  );

  @Effect()
  applyFilter$: Observable<Action> = this.actions$.pipe(
    ofType(APPLY_FILTER),
    map((action: ApplyFilterAction) => action.payload),
    debounceTime(300),
    withLatestFrom(this.store.pipe(select(getJobAdSearchState))),
    switchMap(([filter, state]) => this.jobAdsService.search(JobSearchRequestMapper.mapToRequest(filter, state.page))),
    map((response: JobAdvertisementSearchResponse) => new FilterAppliedAction({
      page: response.result,
      totalCount: response.totalCount
    }))
  );

  @Effect()
  loadNextPage$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_NEXT_PAGE),
    debounceTime(300),
    withLatestFrom(this.store.pipe(select(getJobAdSearchState))),
    switchMap(([action, state]) => this.jobAdsService.search(JobSearchRequestMapper.mapToRequest(state.jobSearchFilter, state.page + 1))),
    map((response: JobAdvertisementSearchResponse) => new NextPageLoadedAction({ page: response.result }))
  );

  @Effect()
  public loadJobAdvertisementDetail$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_JOB_ADVERTISEMENT_DETAIL),
    map((action: LoadJobAdvertisementDetailAction) => action.payload.id),
    switchMap((id) => this.jobAdsService.findById(id)),
    map((jobAdvertisement) => new JobAdvertisementDetailLoadedAction({ jobAdvertisement }))
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
      return { type: 'nothing' }
    })
  );

  @Effect()
  loadNextJobAdvertisementDetail$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_NEXT_JOB_ADVERTISEMENT_DETAIL),
    withLatestFrom(this.store.pipe(select(getNextId))),
    switchMap(([action, id]) => {
      if (id) {
        return of(id)
      } else {
        this.store.dispatch(new LoadNextPageAction());

        return this.actions$.pipe(
          ofType(NEXT_PAGE_LOADED),
          map((nextPageLoadedAction: NextPageLoadedAction) => {
            return nextPageLoadedAction.payload.page[0].id
          }),
          take(1)
        )
      }
    }),
    tap((id) => {
      this.router.navigate(['/job-search', id])
    }),
    map(() => {
      return { type: 'nothing' }
    })
  );

  constructor(private actions$: Actions,
              private jobAdsService: JobAdvertisementRepository,
              private store: Store<JobAdSearchState>,
              private router: Router) {
  }

}
