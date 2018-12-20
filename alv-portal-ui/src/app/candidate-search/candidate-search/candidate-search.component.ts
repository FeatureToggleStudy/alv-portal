import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '../../shared/backend-services/candidate/candidate.types';
import { Degree } from '../../shared/backend-services/shared.types';

@Component({
  selector: 'alv-candidate-search',
  templateUrl: './candidate-search.component.html',
  styleUrls: ['./candidate-search.component.scss']
})
export class CandidateSearchComponent implements OnInit {

  candidateSearchResults: Observable<CandidateSearchResult[]>;

  constructor() { }

  ngOnInit() {
  }

  onScroll() {
  }

}

export interface CandidateSearchResult {
  candidate: Candidate;
  visited: boolean;
}
