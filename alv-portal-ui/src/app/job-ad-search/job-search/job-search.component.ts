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
import { Observable } from 'rxjs';
import {
  ApplyFilterAction,
  InitResultListAction,
  LoadNextPageAction
} from '../state-management/actions/job-ad-search.actions';
import { map } from 'rxjs/operators';
import { JobSearchFilterParameterService } from './job-search-filter-parameter.service';


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

  jobSearchResults$: Observable<JobSearchResult[]>;

  jobSearchMailToLink$: Observable<string>;

  constructor(private store: Store<JobAdSearchState>,
              private jobSearchFilterParameterService: JobSearchFilterParameterService) {
    super();
  }

  ngOnInit() {

    this.store.dispatch(new InitResultListAction());

    this.totalCount$ = this.store.pipe(select(getTotalCount));

    this.jobSearchResults$ = this.store.pipe(select(getJobSearchResults));

    this.jobSearchFilter$ = this.store.pipe(select(getJobSearchFilter));

    this.resultsAreLoading$ = this.store.pipe(select(getResultsAreLoading));

    this.jobSearchMailToLink$ = this.jobSearchFilter$.pipe(
      map((jobSearchFilter: JobSearchFilter) => this.jobSearchFilterParameterService.encode(jobSearchFilter)),
      map((filterParam) => `${window.location.href}?filter=${filterParam}`),
      map((link) => `mailto:?body=${link}`)
    );
  }

  onFiltersChange(jobSearchFilter: JobSearchFilter) {
    this.store.dispatch(new ApplyFilterAction(jobSearchFilter));
  }

  onScroll() {
    this.store.dispatch(new LoadNextPageAction());
  }

}


