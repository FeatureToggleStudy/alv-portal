import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApplyFilterAction,
  CandidateSearchFilter,
  CandidateSearchResult,
  CandidateSearchState,
  getCandidateSearchFilter,
  getCandidateSearchResults,
  getResultsAreLoading,
  getTotalCount,
  InitResultListAction,
  LoadNextPageAction
} from '../state-management';
import { select, Store } from '@ngrx/store';


@Component({
  selector: 'alv-candidate-search',
  templateUrl: './candidate-search.component.html',
  styleUrls: ['./candidate-search.component.scss']
})
export class CandidateSearchComponent implements OnInit {

  totalCount$: Observable<number>;

  candidateSearchFilter$: Observable<CandidateSearchFilter>;

  resultsAreLoading$: Observable<boolean>;

  candidateSearchResults$: Observable<CandidateSearchResult[]>;

  constructor(private store: Store<CandidateSearchState>) {
  }

  ngOnInit() {

    this.store.dispatch(new InitResultListAction());

    this.totalCount$ = this.store.pipe(select(getTotalCount));

    this.candidateSearchFilter$ = this.store.pipe(select(getCandidateSearchFilter));

    this.candidateSearchResults$ = this.store.pipe(select(getCandidateSearchResults));

    this.resultsAreLoading$ = this.store.pipe(select(getResultsAreLoading));

  }

  onScroll() {
    this.store.dispatch(new LoadNextPageAction());
  }

  onFiltersChange(candidateSearchFilter: CandidateSearchFilter) {
    this.store.dispatch(new ApplyFilterAction(candidateSearchFilter));
  }
}
