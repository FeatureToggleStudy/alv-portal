import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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
  candidateProfile: CandidateProfile;
  visited: boolean;
}
