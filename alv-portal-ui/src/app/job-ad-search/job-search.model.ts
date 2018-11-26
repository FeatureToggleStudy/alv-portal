import { Injectable } from '@angular/core';
import { JobSearchRequestMapperService } from './job-search-request-mapper.service';
import { JobAdvertisementService } from '../shared/backend-services/job-advertisement/job-advertisement.service';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, switchAll } from 'rxjs/operators';
import { JobAdvertisement } from '../shared/backend-services/job-advertisement/job-advertisement.model';


@Injectable({
  providedIn: 'root'
})
export class JobSearchModel {

  private _resultList$ = new BehaviorSubject<JobAdvertisement[]>([]);

  private scroll$: BehaviorSubject<number> = new BehaviorSubject(0);

  private filtersChange$: Subject<JobSearchFilter> = new Subject();

  constructor(private jobAdsService: JobAdvertisementService) {
    combineLatest(this.filtersChange$, this.scroll$).pipe(
      map(([filtersValues, page]) => {
        const searchRequest = JobSearchRequestMapperService.mapToRequest(filtersValues, page);
        return this.jobAdsService.search(searchRequest);
      }),
      switchAll()
    ).subscribe((resultsFromServer: JobAdvertisement[]) => {
      this.resultList$.next(this.resultList$.getValue().concat(...resultsFromServer));
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

  private resetPage() {
    this.scroll$.next(0);
  }

  private clearResults() {
    this.resultList$.next([]);
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

