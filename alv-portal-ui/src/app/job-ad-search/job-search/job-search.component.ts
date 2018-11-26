import { Component, OnInit } from '@angular/core';
import { JobSearchFilter, JobSearchModel } from '../job-search.model';
import { JobAdvertisement } from '../../shared/backend-services/job-advertisement/job-advertisement.model';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { Subject } from 'rxjs';

export const ITEMS_PER_PAGE = 10;

@Component({
  selector: 'alv-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent extends AbstractSubscriber implements OnInit {
  resultList$: Subject<JobAdvertisement[]> = this.jobSearchModel.resultList$;


  constructor(private jobSearchModel: JobSearchModel) {
    super();
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
