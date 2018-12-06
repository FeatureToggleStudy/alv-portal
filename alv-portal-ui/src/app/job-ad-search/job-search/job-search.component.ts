import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { JobSearchFilter } from '../job-search-filter.types';
import { select, Store } from '@ngrx/store';
import {
  getJobSearchFilter,
  getJobSearchResults,
  getResultsAreLoading,
  getTotalCount,
  JobAdSearchState,
  JobSearchResult
} from '../state-management/state/job-ad-search.state';
import { Observable } from 'rxjs/index';
import {
  ApplyFilterAction,
  InitResultListAction,
  LoadNextPageAction
} from '../state-management/actions/job-ad-search.actions';


@Component({
  selector: 'alv-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobSearchComponent extends AbstractSubscriber implements OnInit {

  totalCount$: Observable<number>;

  jobSearchFilter$: Observable<JobSearchFilter>;

  resultsAreLoading$: Observable<boolean>;

  jobSearchResults: Observable<JobSearchResult[]>;

  constructor(private store: Store<JobAdSearchState>) {
    super();
  }

  ngOnInit() {
    this.store.dispatch(new InitResultListAction());

    this.totalCount$ = this.store.pipe(select(getTotalCount));

    this.jobSearchResults = this.store.pipe(select(getJobSearchResults));

    this.jobSearchFilter$ = this.store.pipe(select(getJobSearchFilter));

    this.resultsAreLoading$ = this.store.pipe(select(getResultsAreLoading));
  }

  onFiltersChange(jobSearchFilter: JobSearchFilter) {
    this.store.dispatch(new ApplyFilterAction(jobSearchFilter));
  }

  onScroll() {
    this.store.dispatch(new LoadNextPageAction());
  }

}


