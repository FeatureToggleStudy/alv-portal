import { Component, OnInit } from '@angular/core';
import { JobSearchFilter, JobSearchModel } from '../job-search.model';
import { JobAdvertisement } from '../../shared/backend-services/job-advertisement/job-advertisement.model';
import { AbstractSubscriber } from '../../core/abstract-subscriber';

export const ITEMS_PER_PAGE = 10;

@Component({
  selector: 'alv-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent extends AbstractSubscriber implements OnInit {
  resultList: JobAdvertisement[] = [];


  constructor(private jobSearchModel: JobSearchModel) {
    super();
    this.resultList = jobSearchModel.resultList;
  }

  ngOnInit() {

  }

  onFiltersChange(jobSearchFilter: JobSearchFilter) {
    this.jobSearchModel.filter(jobSearchFilter);

  }

  onScroll() {
    this.jobSearchModel.loadNextPage();
  }


}
