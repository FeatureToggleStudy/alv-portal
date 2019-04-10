import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import {
  ApplyFilterValuesAction,
  ApplyQueryValuesAction,
  FILTER_APPLIED,
  getJobSearchFilter,
  getJobSearchResults,
  getLastVisitedJobAdId,
  getResultsAreLoading,
  getTotalCount, hasResults, isLoading,
  JobAdSearchState,
  JobSearchFilter,
  LoadNextPageAction,
  ResetFilterAction
} from '../state-management';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  take,
  takeUntil,
  tap
} from 'rxjs/operators';
import { JobSearchFilterParameterService } from './job-search-filter-parameter.service';
import { JobQueryPanelValues } from '../../../widgets/job-search-widget/job-query-panel/job-query-panel-values';
import { ScrollService } from '../../../core/scroll.service';
import { FilterPanelValues } from './filter-panel/filter-panel.component';
import { ofType } from '@ngrx/effects';
import { composeResultListItemId } from '../../../shared/layout/result-list-item/result-list-item.component';
import { LayoutConstants } from '../../../shared/layout/layout-constants.enum';
import { WINDOW } from '../../../core/window.service';
import { JobSearchResult } from '../../shared/job-search-result/job-search-result.component';
import { I18nService } from '../../../core/i18n.service';
import {
  AddJobAdFavouriteAction,
  RemoveJobAdFavouriteAction,
  UpdatedJobAdFavouriteAction
} from '../../../core/state-management/actions/core.actions';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { User } from '../../../core/auth/user.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'alv-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobSearchComponent extends AbstractSubscriber implements OnInit, AfterViewInit, OnDestroy {

  layoutConstants = LayoutConstants;

  totalCount$: Observable<number>;

  jobSearchFilter$: Observable<JobSearchFilter>;

  resultsAreLoading$: Observable<boolean>;

  jobSearchResults$: Observable<JobSearchResult[]>;

  jobSearchMailToLink$: Observable<string>;

  searchPanelHeight = 0;

  detectSearchPanelHeightFn = this.detectSearchPanelHeight.bind(this);

  currentUser$: Observable<User>;

  currentLanguage$: Observable<string>;

  hasFoundResults$: Observable<boolean>;

  @ViewChild('searchPanel') searchPanelElement: ElementRef<Element>;

  @BlockUI() blockUI: NgBlockUI;

  constructor(private store: Store<JobAdSearchState>,
              private actionsSubject: ActionsSubject,
              private jobSearchFilterParameterService: JobSearchFilterParameterService,
              private scrollService: ScrollService,
              private cdRef: ChangeDetectorRef,
              private i18nService: I18nService,
              private authenticationService: AuthenticationService,
              @Inject(WINDOW) private window: Window) {
    super();
  }

  ngOnInit() {
    this.totalCount$ = this.store.pipe(select(getTotalCount));

    this.jobSearchResults$ = this.store.pipe(select(getJobSearchResults), debounceTime(100));

    this.jobSearchFilter$ = this.store.pipe(select(getJobSearchFilter));

    this.resultsAreLoading$ = this.store.pipe(select(getResultsAreLoading));

    this.hasFoundResults$ = this.store.pipe(select(hasResults));

    this.store.pipe(select(isLoading))
      .pipe(
        distinctUntilChanged(),
        tap(loading => {
          if (loading) {
            this.blockUI.start();
          } else {
            this.blockUI.stop();
          }
        }),
        takeUntil(this.ngUnsubscribe)
      ).subscribe();

    this.jobSearchMailToLink$ = this.jobSearchFilter$.pipe(
      map((jobSearchFilter: JobSearchFilter) => this.jobSearchFilterParameterService.encode(jobSearchFilter)),
      map((filterParam) => `${window.location.href}?filter=${filterParam}`),
      map((link) => `mailto:?body=${link}`)
    );

    this.currentUser$ = this.authenticationService.getCurrentUser();

    this.currentLanguage$ = this.i18nService.currentLanguage$;

    this.actionsSubject.pipe(
      ofType(FILTER_APPLIED),
      takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.scrollService.scrollToTop();
      });
  }

  ngAfterViewInit() {
    this.detectSearchPanelHeight();
    // Add resize listener to recalculate UI on window resize
    this.window.addEventListener('resize', this.detectSearchPanelHeightFn);
    this.store.pipe(select(getLastVisitedJobAdId))
      .pipe(take(1))
      .subscribe(lastVisitedJobAdId => {
        if (lastVisitedJobAdId && this.scrollService.scrollIntoView(composeResultListItemId(lastVisitedJobAdId))) {
          this.scrollService.scrollBy(0, LayoutConstants.SCROLL_Y_SEARCH - this.searchPanelHeight);
        } else {
          this.scrollService.scrollToTop();
        }
      });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.window.removeEventListener('resize', this.detectSearchPanelHeightFn);
  }

  onQueryChange(queryPanelValues: JobQueryPanelValues) {
    this.store.dispatch(new ApplyQueryValuesAction(queryPanelValues));
    this.detectSearchPanelHeight();
  }

  onFiltersChange(filterPanelData: FilterPanelValues) {
    this.store.dispatch(new ApplyFilterValuesAction(filterPanelData));
  }

  onResetFilter() {
    this.store.dispatch(new ResetFilterAction({}));
    // Give the search panel some time to adjust
    setTimeout(() => {
      this.detectSearchPanelHeight();
    });
  }

  onScroll() {
    this.store.dispatch(new LoadNextPageAction());
  }

  detectSearchPanelHeight() {
    const newSearchPanelHeight = this.searchPanelElement.nativeElement.clientHeight;
    if (newSearchPanelHeight !== this.searchPanelHeight) {
      this.searchPanelHeight = newSearchPanelHeight;
      this.cdRef.detectChanges();
    }
  }

  addFavourite(jobSearchResult: JobSearchResult) {
    this.store.dispatch(new AddJobAdFavouriteAction({ jobAdvertisementId: jobSearchResult.jobAdvertisement.id }));
  }

  removeFavourite(jobSearchResult: JobSearchResult) {
    this.store.dispatch(new RemoveJobAdFavouriteAction({ favouriteItem: jobSearchResult.favouriteItem }));
  }

  updatedFavourite(jobSearchResult: JobSearchResult) {
    this.store.dispatch(new UpdatedJobAdFavouriteAction({ favouriteItem: jobSearchResult.favouriteItem }));
  }

}


