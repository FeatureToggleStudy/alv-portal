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
import { Observable } from 'rxjs';
import {
  ApplyFilterValuesAction,
  ApplyQueryValuesAction,
  CandidateSearchFilter,
  CandidateSearchResult,
  CandidateSearchState,
  FILTER_APPLIED,
  getCandidateSearchFilter,
  getCandidateSearchResults,
  getResultsAreLoading,
  getSelectedCandidateProfile,
  getSelectedOccupations,
  getTotalCount,
  LoadNextPageAction,
  ResetFilterAction
} from '../state-management';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { distinctUntilChanged, map, take, takeUntil, tap } from 'rxjs/operators';
import { ScrollService } from '../../core/scroll.service';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { composeResultListItemId } from '../../shared/layout/result-list-item/result-list-item.component';
import { CandidateSearchFilterParameterService } from './candidate-search-filter-parameter.service';
import { FilterPanelValues } from './filter-panel/filter-panel.component';
import { CandidateQueryPanelValues } from '../../widgets/candidate-search-widget/candidate-query-panel/candidate-query-panel-values';
import { OccupationCode } from '../../shared/backend-services/reference-service/occupation-label.types';
import { LayoutConstants } from '../../shared/layout/layout-constants.enum';
import { WINDOW } from '../../core/window.service';
import { filter } from 'rxjs/internal/operators/filter';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'alv-candidate-search',
  templateUrl: './candidate-search.component.html',
  styleUrls: ['./candidate-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateSearchComponent extends AbstractSubscriber implements OnInit, AfterViewInit, OnDestroy {

  layoutConstants = LayoutConstants;

  resultCount$: Observable<number>;

  filter$: Observable<CandidateSearchFilter>;

  resultsAreLoading$: Observable<boolean>;

  results$: Observable<CandidateSearchResult[]>;

  searchMailToLink$: Observable<string>;

  selectedOccupationCodes$: Observable<OccupationCode[]>;

  detectSearchPanelHeightFn = this.detectSearchPanelHeight.bind(this);

  searchPanelHeight = 0;

  @ViewChild('searchPanel') searchPanelElement: ElementRef<Element>;

  @BlockUI() blockUI: NgBlockUI;

  constructor(private store: Store<CandidateSearchState>,
              private candidateSearchFilterParameterService: CandidateSearchFilterParameterService,
              private actionsSubject: ActionsSubject,
              private scrollService: ScrollService,
              private cdRef: ChangeDetectorRef,
              @Inject(WINDOW) private window: Window) {
    super();
  }

  ngOnInit() {
    this.resultCount$ = this.store.pipe(select(getTotalCount));

    this.filter$ = this.store.pipe(select(getCandidateSearchFilter));

    this.results$ = this.store.pipe(select(getCandidateSearchResults)).pipe(
      filter(value => !!value)
    );

    this.resultsAreLoading$ = this.store.pipe(select(getResultsAreLoading)).pipe(
      distinctUntilChanged(),
      tap(loading => {
        if (loading) {
          this.blockUI.start();
        } else {
          this.blockUI.stop();
        }
      })
    );

    this.selectedOccupationCodes$ = this.store.pipe(select(getSelectedOccupations)).pipe(
      map((occupations) => occupations.map((b) => b.payload))
    );

    this.searchMailToLink$ = this.filter$.pipe(
      map((candidateSearchFilter: CandidateSearchFilter) => this.candidateSearchFilterParameterService.encode(candidateSearchFilter)),
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
    this.detectSearchPanelHeight();
    // Add resize listener to recalculate UI on window resize
    this.window.addEventListener('resize', this.detectSearchPanelHeightFn);
    this.store.pipe(select(getSelectedCandidateProfile))
      .pipe(take(1))
      .subscribe(candidateProfile => {
        if (candidateProfile && this.scrollService.scrollIntoView(composeResultListItemId(candidateProfile.id))) {
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

  onScroll() {
    this.store.dispatch(new LoadNextPageAction());
  }

  onFiltersChange(filterPanelValues: FilterPanelValues) {
    this.store.dispatch(new ApplyFilterValuesAction(filterPanelValues));
  }

  onResetFilter() {
    this.store.dispatch(new ResetFilterAction({}));
    setTimeout(() => {
      this.detectSearchPanelHeight();
    });
  }

  onQueryChange(queryValues: CandidateQueryPanelValues) {
    this.store.dispatch(new ApplyQueryValuesAction(queryValues));
    this.detectSearchPanelHeight();
  }

  detectSearchPanelHeight() {
    const newSearchPanelHeight = this.searchPanelElement.nativeElement.clientHeight;
    if (newSearchPanelHeight !== this.searchPanelHeight) {
      this.searchPanelHeight = newSearchPanelHeight;
      this.cdRef.detectChanges();
    }
  }
}
