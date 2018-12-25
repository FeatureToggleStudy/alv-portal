import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApplyFilterAction,
  CandidateSearchFilter,
  CandidateSearchResult,
  CandidateSearchState,
  FILTER_APPLIED,
  getCandidateSearchFilter,
  getCandidateSearchResults,
  getResultsAreLoading,
  getSelectedCandidateProfile,
  getTotalCount,
  LoadNextPageAction
} from '../state-management';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { take, takeUntil } from 'rxjs/operators';
import { ScrollService } from '../../core/scroll.service';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { composeResultListItemId } from '../../shared/layout/result-list-item/result-list-item.component';

@Component({
  selector: 'alv-candidate-search',
  templateUrl: './candidate-search.component.html',
  styleUrls: ['./candidate-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateSearchComponent extends AbstractSubscriber implements OnInit, AfterViewInit {

  totalCount$: Observable<number>;

  candidateSearchFilter$: Observable<CandidateSearchFilter>;

  resultsAreLoading$: Observable<boolean>;

  candidateSearchResults$: Observable<CandidateSearchResult[]>;

  constructor(private store: Store<CandidateSearchState>,
              private actionsSubject: ActionsSubject,
              private scrollService: ScrollService) {
    super();
  }

  ngOnInit() {
    this.totalCount$ = this.store.pipe(select(getTotalCount));

    this.candidateSearchFilter$ = this.store.pipe(select(getCandidateSearchFilter));

    this.candidateSearchResults$ = this.store.pipe(select(getCandidateSearchResults));

    this.resultsAreLoading$ = this.store.pipe(select(getResultsAreLoading));

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
        if (candidateProfile) {
          this.scrollService.scrollIntoView(composeResultListItemId(candidateProfile.id));
          this.scrollService.scrollBy(0, -100);
        }
      });
  }

  onScroll() {
    this.store.dispatch(new LoadNextPageAction());
  }

  onFiltersChange(candidateSearchFilter: CandidateSearchFilter) {
    this.store.dispatch(new ApplyFilterAction(candidateSearchFilter));
  }
}
