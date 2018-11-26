import { Component, OnInit } from '@angular/core';
import { JobSearchFilter, JobSearchModel } from '../job-search.model';
import { AbstractSubscriber } from '../../core/abstract-subscriber';


@Component({
  selector: 'alv-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent extends AbstractSubscriber implements OnInit {

  constructor(private jobSearchModel: JobSearchModel) {
    super();
  }

  ngOnInit() {

  }

  get resultList$() {
    return this.jobSearchModel.resultList$;
  }

  onFiltersChange(jobSearchFilter: JobSearchFilter) {
    this.jobSearchModel.filter(jobSearchFilter);

  }

  onScroll() {
    this.jobSearchModel.loadNextPage();
  }


}
