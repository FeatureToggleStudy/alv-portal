import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { JobSearchFilter } from '../state-management/state/job-search-filter.types';
import { select, Store } from '@ngrx/store';
import {
  getJobSearchFilter,
  getJobSearchResults,
  getResultsAreLoading,
  getSelectedJobAdvertisement,
  getTotalCount,
  JobAdSearchState,
  JobSearchResult
} from '../state-management/state/job-ad-search.state';
import { Observable } from 'rxjs';
import {
  APPLY_FILTER,
  ApplyFilterAction,
  InitResultListAction,
  LoadNextPageAction,
  ResetFilterAction,
} from '../state-management/actions/job-ad-search.actions';
import { map, take } from 'rxjs/operators';
import { JobSearchFilterParameterService } from './job-search-filter-parameter.service';
import { JobQueryPanelValues } from '../../widgets/job-search-widget/job-query-panel/job-query-panel-values';
import { composeResultListItemId } from './result-list-item/result-list-item.component';
import { ScrollService } from '../../core/scroll.service';
import { FilterPanelValues } from './filter-panel/filter-panel.component';
import { JobAdSearchEffects } from '../state-management/effects/job-ad-search.effects';
import { ofType } from '@ngrx/effects';


@Component({
  selector: 'alv-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobSearchComponent extends AbstractSubscriber implements OnInit, AfterViewInit {

  totalCount$: Observable<number>;

  jobSearchFilter$: Observable<JobSearchFilter>;

  resultsAreLoading$: Observable<boolean>;

  jobSearchResults$: Observable<JobSearchResult[]>;

  jobSearchMailToLink$: Observable<string>;

  applyFilterReset$: Observable<JobSearchFilter>;

  constructor(private store: Store<JobAdSearchState>,
              private jobAdSearchEffects: JobAdSearchEffects,
              private jobSearchFilterParameterService: JobSearchFilterParameterService,
              private scrollService: ScrollService) {
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

    this.applyFilterReset$ = this.jobAdSearchEffects.resetFilter$.pipe(
      ofType(APPLY_FILTER),
      map((a: ApplyFilterAction) => {
        return a.payload;
      })
    );

  }

  ngAfterViewInit() {
    this.store.pipe(select(getSelectedJobAdvertisement))
      .pipe(take(1))
      .subscribe(job => {
        if (job) {
          this.scrollService.scrollIntoView(composeResultListItemId(job.id));
          this.scrollService.scrollBy(0, -100);
        }
      });
  }

  onQueryChange(queryPanelValues
                  :
                  JobQueryPanelValues
  ) {
    // TODO DF-410 Maybe create dedicated ApplyQueryAction with payload of type: QueryPanelValues
    this.jobSearchFilter$.pipe(
      map((currentFilter) => Object.assign({}, currentFilter, queryPanelValues)),
      take(1))
      .subscribe((jobSearchFilter) => {
        this.store.dispatch(new ApplyFilterAction(jobSearchFilter));
      });
  }

  onFiltersChange(filterPanelData: FilterPanelValues) {
    this.jobSearchFilter$.pipe(
      map((currentFilter) => Object.assign({}, currentFilter, filterPanelData)),
      take(1))
      .subscribe((jobSearchFilter) => {
        this.store.dispatch(new ApplyFilterAction(jobSearchFilter));
      });
  }

  onResetFilter() {
    this.store.dispatch(new ResetFilterAction({}));
  }

  onScroll() {
    this.store.dispatch(new LoadNextPageAction());
  }

}


