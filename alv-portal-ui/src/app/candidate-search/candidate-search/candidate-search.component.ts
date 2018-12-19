import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CandidateSearchResult,
  CandidateSearchState,
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

  resultsAreLoading$: Observable<boolean>;

  candidateSearchResults$: Observable<CandidateSearchResult[]>;

  constructor(private store: Store<CandidateSearchState>) {
  }

  ngOnInit() {

    this.store.dispatch(new InitResultListAction());

    this.totalCount$ = this.store.pipe(select(getTotalCount));

    this.candidateSearchResults$ = this.store.pipe(select(getCandidateSearchResults));

    this.resultsAreLoading$ = this.store.pipe(select(getResultsAreLoading));

  }

  onScroll() {
    this.store.dispatch(new LoadNextPageAction());
  }

}
