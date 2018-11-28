import { Injectable } from '@angular/core';
import { JobAdvertisementService } from '../shared/backend-services/job-advertisement/job-advertisement.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  concatMap,
  debounceTime,
  map,
  mergeMap,
  scan,
  switchMapTo,
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

  private scroll$: BehaviorSubject<number> = new BehaviorSubject(0);

  private filtersChange$: Subject<JobSearchFilter> = new Subject();

  private _resultList: JobAdvertisement[] = [];

  get resultList() {
    return this._resultList;
  }

  constructor(private jobAdsService: JobAdvertisementService) {

    const scrollStartsOnFiltersChange$ = this.filtersChange$.pipe(
      debounceTime(500),
      switchMapTo(this.scroll$),
    );

    const scrollCounter$ = scrollStartsOnFiltersChange$.pipe(
      scan(x => x + 1, 0)
    );

    this.filtersChange$.pipe(
      debounceTime(500),
      mergeMap(filters => this.request(filters))
    )
      .subscribe(newList => this._resultList = newList);


    scrollCounter$.pipe(
      withLatestFrom(this.filtersChange$),
      concatMap(([page, filters]) => this.request(filters, page))
    )
      .subscribe(newResults => this._resultList.push(...newResults))
  }

  request(filtersValues: JobSearchFilter, page: number = 0): Observable<JobAdvertisement[]> {
    console.log(filtersValues);
    const jobAdvertisementSearchRequest: JobAdvertisementSearchRequest = JobSearchRequestMapper.mapToRequest(filtersValues, page);
    console.log(jobAdvertisementSearchRequest);
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

