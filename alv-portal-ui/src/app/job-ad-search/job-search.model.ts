import { Injectable } from '@angular/core';
import { JobSearchRequestMapperService } from './job-search-request-mapper.service';
import { JobAdvertisementService } from '../shared/backend-services/job-advertisement/job-advertisement.service';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, switchAll } from 'rxjs/operators';
import {
  JobAdvertisementSearchRequest,
  JobAdvertisementSearchRequestBody
} from '../shared/backend-services/job-advertisement/job-advertisement-search-request';
import { JobAdvertisement } from '../shared/backend-services/job-advertisement/job-advertisement.model';
import { ITEMS_PER_PAGE } from './job-search/job-search.component';

@Injectable({
  providedIn: 'root'
})
export class JobSearchModel {

  private scroll$: BehaviorSubject<number> = new BehaviorSubject(0);
  private filtersChange$: Subject<JobSearchFilter> = new Subject();

  constructor(private mapper: JobSearchRequestMapperService,
              private jobAdsService: JobAdvertisementService) {
    combineLatest(this.filtersChange$, this.scroll$).pipe(
      map(([filtersValues, page]) => {
        const body: JobAdvertisementSearchRequestBody = {
          workloadPercentageMin: filtersValues.workloadPercentageMin,
          workloadPercentageMax: filtersValues.workloadPercentageMax,
          permanent: this.mapper.mapContractType(filtersValues.contractType),
          companyName: filtersValues.company,
          onlineSince: 50,
          displayRestricted: false
        };

        const searchRequest: JobAdvertisementSearchRequest = {
          page: page,
          size: ITEMS_PER_PAGE,
          sort: this.mapper.mapSort(filtersValues.sort),
          body: body
        };
        return this.jobAdsService.search(searchRequest);
      }),
      switchAll()
    )
      .subscribe((resultsFromServer: JobAdvertisement[]) => {
        this.resultList.push(...resultsFromServer);
      })

  }

  private _resultList: JobAdvertisement[] = [];

  get resultList() {
    return this._resultList;
  }

  filter(jobSearchFilter: JobSearchFilter) {
    this.clearResults();
    this.resetScroll();
    this.filtersChange$.next(jobSearchFilter);
  }

  loadNextPage() {
    this.scroll$.next(this.scroll$.getValue() + 1);
  }

  private resetScroll() {
    this.scroll$.next(0);
  }

  private clearResults() {
    this.resultList.length = 0;
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

