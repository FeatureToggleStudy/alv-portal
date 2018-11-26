import { Component, OnInit } from '@angular/core';
import { JobAdvertisementService } from '../../shared/backend-services/job-advertisement/job-advertisement.service';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import {
  JobAdvertisementSearchRequest,
  JobAdvertisementSearchRequestBody
} from '../../shared/backend-services/job-advertisement/job-advertisement-search-request';
import { JobSearchFilter } from '../job-search.model';
import { JobSearchRequestMapperService } from '../job-search-request-mapper.service';
import { JobAdvertisement } from '../../shared/backend-services/job-advertisement/job-advertisement.model';
import { map, switchAll, takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../core/abstract-subscriber';

export const ITEMS_PER_PAGE = 10;

@Component({
  selector: 'alv-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent extends AbstractSubscriber implements OnInit {

  // TODO refactor this behaviour stuff to a JobSearchModel (which is basically a angular Service that we can inject)
  resultList: JobAdvertisement[] = [];
  private scroll$: BehaviorSubject<number> = new BehaviorSubject(0);
  private filtersChange$: Subject<JobSearchFilter> = new Subject();

  // TODO the only dependency is the JobSearchModel
  constructor(private jobAdsService: JobAdvertisementService,
              private mapper: JobSearchRequestMapperService) {
    super();
  }

  ngOnInit() {
    // TODO move to the JobSearchModel
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
    ).subscribe((resultsFromServer: JobAdvertisement[]) => {
      this.resultList.push(...resultsFromServer);
    });
  }

  onFiltersChange(jobSearchFilter: JobSearchFilter, page = 0) {
    // call the jobSearchModel.filter(filtersValues:JobSearchFilter);
    this.clearResults();
    this.resetScroll();
    this.filtersChange$.next(jobSearchFilter);
  }

  onScroll(e) {
    // call the jobSearchModel.loadNextPage();
    this.scroll$.next(this.scroll$.getValue() + 1);
  }

  private resetScroll() {
    this.scroll$.next(0);
  }

  private clearResults() {
    this.resultList.length = 0;
  }
}
