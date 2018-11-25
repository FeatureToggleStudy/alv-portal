import { Component, OnInit } from '@angular/core';
import { JobAdvertisementService } from '../../services/job-advertisement/job-advertisement.service';
import { Observable } from 'rxjs';
import {
  JobAdvertisementSearchRequest,
  JobAdvertisementSearchRequestBody
} from '../../services/job-advertisement/job-advertisement-search-request';
import { JobSearchFilter } from './job-search.model';
import { JobSearchRequestMapperService } from './job-search-request-mapper.service';
import { JobAdvertisement } from '../../services/job-advertisement/job-advertisement.model';

export const ITEMS_PER_PAGE = 10;
@Component({
  selector: 'alv-job-search-page',
  templateUrl: './job-search-page.component.html',
  styleUrls: ['./job-search-page.component.scss']
})
export class JobSearchPageComponent implements OnInit {

  resultList$: Observable<JobAdvertisement[]>;

  constructor(private jobAdsService: JobAdvertisementService,
              private mapper: JobSearchRequestMapperService) {
  }

  ngOnInit() {
  }

  onFiltersChange(filtersValues: JobSearchFilter) {

    //we don't do any manipulations with the data that comes from the autocompletion yet
    const body: JobAdvertisementSearchRequestBody = {
      workloadPercentageMin: filtersValues.workloadPercentageMin,
      workloadPercentageMax: filtersValues.workloadPercentageMax,
      permanent: this.mapper.mapContractType(filtersValues.contractType),
      companyName: filtersValues.company,
      onlineSince: 50,
      displayRestricted: false
    };

    const searchRequest: JobAdvertisementSearchRequest = {
      page: 0,
      size: ITEMS_PER_PAGE,
      sort: this.mapper.mapSort(filtersValues.sort),
      body: body
    };
    this.resultList$ = this.jobAdsService.search(searchRequest);
  }

}
