import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import {
  ApplyFilterValuesAction,
  ApplyQueryValuesAction,
  FILTER_APPLIED,
  getJobSearchFilter,
  getJobSearchResults,
  getResultsAreLoading,
  getSelectedJobAdvertisement,
  getTotalCount,
  JobAdSearchState,
  JobSearchFilter,
  JobSearchResult,
  LoadNextPageAction,
  ResetFilterAction
} from '../state-management';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { JobSearchFilterParameterService } from './job-search-filter-parameter.service';
import { JobQueryPanelValues } from '../../widgets/job-search-widget/job-query-panel/job-query-panel-values';
import { ScrollService } from '../../core/scroll.service';
import { FilterPanelValues } from './filter-panel/filter-panel.component';
import { ofType } from '@ngrx/effects';
import { composeResultListItemId } from '../../shared/layout/result-list-item/result-list-item.component';

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

  constructor(private store: Store<JobAdSearchState>,
              private actionsSubject: ActionsSubject,
              private jobSearchFilterParameterService: JobSearchFilterParameterService,
              private scrollService: ScrollService) {
    super();
  }

  ngOnInit() {
    this.totalCount$ = this.store.pipe(select(getTotalCount));

    this.jobSearchResults$ = this.store.pipe(select(getJobSearchResults));

    this.jobSearchFilter$ = this.store.pipe(select(getJobSearchFilter));

    this.resultsAreLoading$ = this.store.pipe(select(getResultsAreLoading));

    this.jobSearchMailToLink$ = this.jobSearchFilter$.pipe(
      map((jobSearchFilter: JobSearchFilter) => this.jobSearchFilterParameterService.encode(jobSearchFilter)),
      map((filterParam) => `${window.location.href}?filter=${filterParam}`),
      map((link) => `mailto:?body=${link}`)
    );

    this.actionsSubject.pipe(
      ofType(FILTER_APPLIED),
      takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.scrollService.scrollToTop();
      });
  }

  ngAfterViewInit() {
    this.store.pipe(select(getSelectedJobAdvertisement))
      .pipe(take(1))
      .subscribe(job => {
        if (job && this.scrollService.scrollIntoView(composeResultListItemId(job.id))) {
          this.scrollService.scrollBy(0, -100);
        } else {
          this.scrollService.scrollToTop();
        }
      });
  }

  onQueryChange(queryPanelValues: JobQueryPanelValues) {
    this.store.dispatch(new ApplyQueryValuesAction(queryPanelValues));
  }

  onFiltersChange(filterPanelData: FilterPanelValues) {
    this.store.dispatch(new ApplyFilterValuesAction(filterPanelData));
  }

  onResetFilter() {
    this.store.dispatch(new ResetFilterAction({}));
  }

  onScroll() {
    this.store.dispatch(new LoadNextPageAction());
  }

}


