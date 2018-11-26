import { Component, OnInit } from '@angular/core';
import { JobAdvertisementService } from '../../services/job-advertisement/job-advertisement.service';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import {
  JobAdvertisementSearchRequest,
  JobAdvertisementSearchRequestBody
} from '../../services/job-advertisement/job-advertisement-search-request';
import { JobSearchFilter } from './job-search.model';
import { JobSearchRequestMapperService } from './job-search-request-mapper.service';
import { JobAdvertisement } from '../../services/job-advertisement/job-advertisement.model';
import { map, switchAll, takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';

export const ITEMS_PER_PAGE = 10;

@Component({
  selector: 'alv-job-search-page',
  templateUrl: './job-search-page.component.html',
  styleUrls: ['./job-search-page.component.scss']
})
export class JobSearchPageComponent extends AbstractSubscriber implements OnInit {

  resultList: JobAdvertisement[] = [];
  private scroll$: BehaviorSubject<number> = new BehaviorSubject(0);
  private filtersChange$: Subject<JobSearchFilter> = new Subject();

  constructor(private jobAdsService: JobAdvertisementService,
              private mapper: JobSearchRequestMapperService) {
    super();
  }

  ngOnInit() {
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
      switchAll(),
      takeUntil(this.ngUnsubscribe)
    )
      .subscribe((resultsFromServer: JobAdvertisement[]) => {
        this.resultList.push(...resultsFromServer);
      })
  }

  onFiltersChange(filtersValues: JobSearchFilter, page = 0) {
    this.clearResults();
    this.resetScroll();
    this.filtersChange$.next(filtersValues);
  }

  onScroll(e) {
    this.scroll$.next(this.scroll$.getValue() + 1);
  }

  resetScroll() {
    this.scroll$.next(0);
  }

  clearResults() {
    this.resultList.length = 0;
  }
}
