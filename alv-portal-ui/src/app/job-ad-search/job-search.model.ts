import { Injectable } from '@angular/core';
import { JobAdvertisementService } from '../shared/backend-services/job-advertisement/job-advertisement.service';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { flatMap, map, switchMap, tap } from 'rxjs/operators';
import { JobAdvertisement } from '../shared/backend-services/job-advertisement/job-advertisement.model';
import { JobSearchRequestMapper } from './job-search-request.mapper';


@Injectable({
  providedIn: 'root'
})
export class JobSearchModel {

  private _resultList$ = new BehaviorSubject<Array<JobAdvertisement>>([]);

  private scroll$: BehaviorSubject<number> = new BehaviorSubject(0);

  private filtersChange$: Subject<JobSearchFilter> = new Subject();

  private totalCount = 0;

  constructor(private jobAdsService: JobAdvertisementService) {
    combineLatest(this.filtersChange$, this.scroll$)
      .pipe(
        map(([filtersValues, page]) => JobSearchRequestMapper.mapToRequest(filtersValues, page)),
        flatMap((jobAdvertisementSearchRequest) => this.jobAdsService.search(jobAdvertisementSearchRequest)),
        tap((jobAdvertisementSearchResponse) => this.totalCount = jobAdvertisementSearchResponse.totalCount),
        map((jobAdvertisementSearchResponse) => jobAdvertisementSearchResponse.result),
        switchMap((jobAdvertisements: JobAdvertisement[]) => {
          this.resultList$.next(this._resultList$.getValue().concat(jobAdvertisements));
          return this.resultList$;
        })
      )
      .subscribe(() => {
      });
  }

  get resultList$() {
    return this._resultList$;
  }

  filter(jobSearchFilter: JobSearchFilter) {
    this.clearResults();
    this.resetPage();
    this.filtersChange$.next(jobSearchFilter);
  }

  loadNextPage() {
    this.scroll$.next(this.scroll$.getValue() + 1);
  }

  hasNextPage() {
    return this._resultList$.getValue().length !== this.totalCount;
  }

  isFirst(jobAdvertisement: JobAdvertisement) {
    return this._resultList$.getValue()[0].id === jobAdvertisement.id;
  }

  isLast(jobAdvertisement: JobAdvertisement) {
    return !this.hasNextPage()
      && this._resultList$.getValue()[this._resultList$.getValue().length - 1].id === jobAdvertisement.id;
  }

  private resetPage() {
    this.scroll$.next(0);
  }

  private clearResults() {
    this._resultList$.next([]);
  }
}

export enum Sort {
  RELEVANCE_DESC = 'RELEVANCE_DESC',
  DATE_DESC = 'DATE_DESC',
  DATE_ASC = 'DATE_ASC'
}

export enum ContractType {
  ALL = 'ALL',
  TEMPORARY = 'TEMPORARY',
  PERMANENT = 'PERMANENT',
}

export interface JobSearchFilter {
  sort: Sort;
  displayRestricted: boolean;
  contractType: ContractType;
  workloadPercentageMax: number;
  workloadPercentageMin: number;
  company?: string;
  onlineSince: number;
}

