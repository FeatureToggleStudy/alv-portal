import { Injectable } from '@angular/core';
import { JobAdvertisementService } from '../shared/backend-services/job-advertisement/job-advertisement.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  concatMap,
  map,
  mergeMap,
  scan,
  switchMapTo,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { JobAdvertisement } from '../shared/backend-services/job-advertisement/job-advertisement.model';
import { JobSearchRequestMapper } from './job-search-request.mapper';
import { JobSearchFilter } from './job-search-filter.types';
import { JobAdvertisementSearchResponse } from '../shared/backend-services/job-advertisement/job-advertisement-search-response';
import { JobAdvertisementSearchRequest } from '../shared/backend-services/job-advertisement/job-advertisement-search-request';


@Injectable({
  providedIn: 'root'
})
export class JobSearchModel {

  constructor(private jobAdsService: JobAdvertisementService) {

    const scrollStartsOnFiltersChange$ = this.filtersChange$.pipe(
      switchMapTo(this.scroll$),
    );

    const scrollCounter$ = scrollStartsOnFiltersChange$.pipe(
      tap(x => console.log('scrollCounter$', x)),
      scan(x => x + 1, 0)
    );

    this.filtersChange$.pipe(
      mergeMap(filters => this.request(filters))
    )
      .subscribe(newList => this._resultList = newList);


    scrollCounter$.pipe(
      withLatestFrom(this.filtersChange$),
      concatMap(([page, filters]) => this.request(filters, page))
    )
      .subscribe(newResults => this._resultList.push(...newResults))
  }

  private scroll$: BehaviorSubject<number> = new BehaviorSubject(0);

  private filtersChange$: Subject<JobSearchFilter> = new Subject();

  private _resultList: JobAdvertisement[] = [];

  get resultList() {
    return this._resultList;
  }

  request(filtersValues: JobSearchFilter, page: number = 0): Observable<JobAdvertisement[]> {
    const jobAdvertisementSearchRequest: JobAdvertisementSearchRequest = JobSearchRequestMapper.mapToRequest(filtersValues, 0);
    return this.jobAdsService.search(jobAdvertisementSearchRequest).pipe(
      map((jobAdvertisementSearchResponse: JobAdvertisementSearchResponse) => jobAdvertisementSearchResponse.result)
    )
  }

  filter(jobSearchFilter: JobSearchFilter) {
    this.filtersChange$.next(jobSearchFilter);
  }

  loadNextPage() {
    this.scroll$.next(this.scroll$.getValue() + 1);
  }

}

