import { Component, OnInit } from '@angular/core';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { JobSearchFilter } from '../job-search-filter.types';
import { select, Store } from '@ngrx/store';
import {
  getJobSearchFilter,
  getResultList, getResultsAreLoading,
  getTotalCount,
  JobAdSearchState
} from '../state-management/state/job-ad-search.state';
import { Observable } from 'rxjs/index';
import { JobAdvertisement } from '../../shared/backend-services/job-advertisement/job-advertisement.model';
import {
  ApplyFilterAction,
  InitJobSearchAction, LoadNextPageAction
} from '../state-management/actions/job-ad-search.actions';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'alv-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent extends AbstractSubscriber implements OnInit {
  totalCount$: Observable<number>;
  resultList$: Observable<JobAdvertisement[]>;
  jobSearchFilter$: Observable<JobSearchFilter>;
  resultsAreLoading$: Observable<boolean>;

  constructor(private store: Store<JobAdSearchState>,
              private activatedRoute: ActivatedRoute) {
    super();

    //Deserialize parameters
    const onlineSince = +(this.activatedRoute.snapshot.queryParams['onlineSince']) || 11;

    this.store.dispatch(new InitJobSearchAction({ onlineSince }));


    this.totalCount$ = this.store.pipe(select(getTotalCount));
    this.resultList$ = this.store.pipe(select(getResultList));
    this.jobSearchFilter$ = this.store.pipe(select(getJobSearchFilter));

    this.resultsAreLoading$ = this.store.pipe(select(getResultsAreLoading));
  }

  ngOnInit() {
  }

  onFiltersChange(jobSearchFilter: JobSearchFilter) {
    this.store.dispatch(new ApplyFilterAction(jobSearchFilter))
  }

  onScroll() {
    this.store.dispatch(new LoadNextPageAction())
  }


}
