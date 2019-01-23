import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
import { map, take, takeUntil } from 'rxjs/operators';
import { ScrollService } from '../../core/scroll.service';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { composeResultListItemId } from '../../shared/layout/result-list-item/result-list-item.component';
import { CandidateSearchFilterParameterService } from './candidate-search-filter-parameter.service';
import { FilterPanelValues } from './filter-panel/filter-panel.component';
import { CandidateQueryPanelValues } from '../../widgets/candidate-search-widget/candidate-query-panel/candidate-query-panel-values';
import { OccupationCode } from '../../shared/backend-services/reference-service/occupation-label.types';
import { LayoutConstants } from '../../shared/layout/layout-constants.enum';

@Component({
  selector: 'alv-candidate-search',
  templateUrl: './candidate-search.component.html',
  styleUrls: ['./candidate-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateSearchComponent extends AbstractSubscriber implements OnInit, AfterViewInit {

  layoutConstants = LayoutConstants;

  totalCount$: Observable<number>;

  candidateSearchFilter$: Observable<CandidateSearchFilter>;

  resultsAreLoading$: Observable<boolean>;

  candidateSearchResults$: Observable<CandidateSearchResult[]>;

  searchMailToLink$: Observable<string>;

  selectedOccupationCodes: Observable<OccupationCode[]>;

  constructor(private store: Store<CandidateSearchState>,
              private candidateSearchFilterParameterService: CandidateSearchFilterParameterService,
              private actionsSubject: ActionsSubject,
              private scrollService: ScrollService) {
    super();
  }

  ngOnInit() {
    this.totalCount$ = this.store.pipe(select(getTotalCount));

    this.candidateSearchFilter$ = this.store.pipe(select(getCandidateSearchFilter));

    this.candidateSearchResults$ = this.store.pipe(select(getCandidateSearchResults));

    this.resultsAreLoading$ = this.store.pipe(select(getResultsAreLoading));

    this.selectedOccupationCodes = this.store.pipe(select(getSelectedOccupations)).pipe(
      map((occupations) => occupations.map((b) => b.payload))
    );

    this.searchMailToLink$ = this.candidateSearchFilter$.pipe(
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
    this.store.pipe(select(getSelectedCandidateProfile))
      .pipe(take(1))
      .subscribe(candidateProfile => {
        if (candidateProfile && this.scrollService.scrollIntoView(composeResultListItemId(candidateProfile.id))) {
          this.scrollService.scrollBy(0, LayoutConstants.SCROLL_Y_SEARCH);
        } else {
          this.scrollService.scrollToTop();
        }
      });
  }

  onScroll() {
    this.store.dispatch(new LoadNextPageAction());
  }

  onFiltersChange(filterPanelValues: FilterPanelValues) {
    this.store.dispatch(new ApplyFilterValuesAction(filterPanelValues));
  }

  onResetFilter() {
    this.store.dispatch(new ResetFilterAction({}));
  }

  onQueryChange(queryValues: CandidateQueryPanelValues) {
    this.store.dispatch(new ApplyQueryValuesAction(queryValues));
  }
}
