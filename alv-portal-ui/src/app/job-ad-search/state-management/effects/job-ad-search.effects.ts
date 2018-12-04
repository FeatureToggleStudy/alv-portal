import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs/index';
import { Action, select, Store } from '@ngrx/store';
import {
  CurrentLoadedAction,
  FILTER_CHANGED,
  FilterChangedAction,
  INIT_JOB_SEARCH,
  InitJobSearchAction,
  JobListLoadedAction,
  LOAD_CURRENT,
  LOAD_NEXT,
  LOAD_NEXT_PAGE,
  LOAD_PREV,
  LoadCurrentAction,
  LoadNextAction,
  LoadNextPageAction,
  NEXT_PAGE_LOADED,
  NextPageLoadedAction
} from '../actions/job-ad-search.actions';
import { JobAdvertisementService } from '../../../shared/backend-services/job-advertisement/job-advertisement.service';
import {
  debounceTime,
  map,
  switchMap,
  take, tap,
  withLatestFrom
} from 'rxjs/internal/operators';
import {
  getJobAdSearchState, getNextId, getPrevId,
  initialState,
  JobAdSearchState
} from '../state/job-ad-search.state';
import { JobSearchRequestMapper } from '../../job-search-request.mapper';
import { JobAdvertisementSearchResponse } from '../../../shared/backend-services/job-advertisement/job-advertisement-search-response';
import { Router } from '@angular/router';

@Injectable()
export class JobAdSearchEffects {
  @Effect()
  initJobSearch$: Observable<Action> = this.actions$.pipe(
    ofType(INIT_JOB_SEARCH),
    take(1),
    map((action: InitJobSearchAction) => new FilterChangedAction({
      ...initialState.jobSearchFilter, onlineSince: action.payload.onlineSince
    }))
    //withLatestFrom(this.store.pipe(select(getJobAdSearchState))),
    //switchMap(([action, state]) => this.jobAdsService.search(JobSearchRequestMapper.mapToRequest(state.jobSearchFilter, state.page))),
    //map((response: JobAdvertisementSearchResponse) => new JobListLoadedAction({
    //  jobList: response.result,
    //  totalCount: response.totalCount
    //}))
  );

  @Effect()
  loadJobList$: Observable<Action> = this.actions$.pipe(
    ofType(FILTER_CHANGED),
    map((action: FilterChangedAction) => action.payload),
    debounceTime(300),
    withLatestFrom(this.store.pipe(select(getJobAdSearchState))),
    switchMap(([filter, state]) => this.jobAdsService.search(JobSearchRequestMapper.mapToRequest(filter, state.page))),
    map((response: JobAdvertisementSearchResponse) => new JobListLoadedAction({
      jobList: response.result,
      totalCount: response.totalCount
    }))
  );

  @Effect()
  loadNextPage$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_NEXT_PAGE),
    debounceTime(300),
    withLatestFrom(this.store.pipe(select(getJobAdSearchState))),
    switchMap(([action, state]) => this.jobAdsService.search(JobSearchRequestMapper.mapToRequest(state.jobSearchFilter, state.page + 1))),
    map((response: JobAdvertisementSearchResponse) => new NextPageLoadedAction(response.result))
  );

  @Effect()
  loadCurrentJobAd$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_CURRENT),
    map((action: LoadCurrentAction) => action.payload.id),
    switchMap((id) => this.jobAdsService.findById(id)),
    map((jobAdvertisement) => new CurrentLoadedAction({ jobAdvertisement }))
  );


  @Effect()
  loadPrevJobAd$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_PREV),
    withLatestFrom(this.store.pipe(select(getPrevId))),
    map(([action, id]) => id),
    tap((id) => {
      this.router.navigate(['/job-search', id])
    }),
    map((id) => new LoadCurrentAction({ id }))
  );

  @Effect()
  loadNextJobAd$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_NEXT),
    withLatestFrom(this.store.pipe(select(getNextId))),
    switchMap(([action, id]) => {
      if (id) {
        return of(id)
      } else {
        this.store.dispatch(new LoadNextPageAction());

        return this.actions$.pipe(
          ofType(NEXT_PAGE_LOADED),
          map((nextPageLoadedAction: NextPageLoadedAction) => {
            return nextPageLoadedAction.payload[0].id
          }),
          take(1)
        )
      }
    }),
    tap((id) => {
      this.router.navigate(['/job-search', id])
    }),
    map((id) => new LoadCurrentAction({ id }))
  );

  constructor(private actions$: Actions,
              private jobAdsService: JobAdvertisementService,
              private store: Store<JobAdSearchState>,
              private router: Router) {
  }

}
