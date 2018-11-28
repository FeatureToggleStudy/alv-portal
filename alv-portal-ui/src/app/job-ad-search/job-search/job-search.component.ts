import { Component, OnInit } from '@angular/core';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { JobSearchModel } from '../job-search.model';
import { JobSearchFilter } from '../job-search-filter.types';


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

  get resultList() {
    return this.jobSearchModel.resultList;
  }

  onFiltersChange(jobSearchFilter: JobSearchFilter) {
    this.jobSearchModel.filter(jobSearchFilter);

  }

  onScroll() {
    console.log('scroll!');
    this.jobSearchModel.loadNextPage();
  }


}
