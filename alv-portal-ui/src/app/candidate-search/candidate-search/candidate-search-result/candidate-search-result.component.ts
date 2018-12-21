import { Component, Input, OnInit } from '@angular/core';
import { ResultListItem } from '../../../shared/layout/result-list-item/result-list-item.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { I18nService } from '../../../core/i18n.service';
import { CandidateSearchResult } from '../candidate-search.component';

@Component({
  selector: 'alv-candidate-search-result',
  templateUrl: './candidate-search-result.component.html',
  styleUrls: ['./candidate-search-result.component.scss']
})
export class CandidateSearchResultComponent implements OnInit {

  @Input()
  candidateSearchResult: CandidateSearchResult;

  resultListItem$: Observable<ResultListItem>;

  constructor(private i18nService: I18nService) {
  }

  ngOnInit() {
    this.resultListItem$ = this.candidateSearchResultToResultListItemMapper(this.candidateSearchResult);
  }

  private candidateSearchResultToResultListItemMapper(candidateSearchResult: CandidateSearchResult): Observable<ResultListItem> {
    const candidate = candidateSearchResult.candidate;
    return this.i18nService.currentLanguage$.pipe(
      map(lang => {
        return {
          id: 'id',
          title: 'Job experience label',
          description: 'Job experience description',
          header: 'date, e.g. 15.12.2018',
          badges: [],
          routerLink: ['/candidate-search', candidate.id],
          subtitle: null, // not needed for candidate
          visited: candidateSearchResult.visited
        };
      })
    );
  }

}



