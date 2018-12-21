import { Component, Input, OnInit } from '@angular/core';
import { ResultListItem } from '../../../shared/layout/result-list-item/result-list-item.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { I18nService } from '../../../core/i18n.service';
import { JobExperience } from '../../../shared/backend-services/candidate/candidate.types';
import { CandidateSearchResult } from '../../state-management';

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
    const candidateProfile = candidateSearchResult.candidateProfile;

    //todo: calculate the relevant jobExperience
    const jobExperience: JobExperience = candidateProfile.jobExperiences[0];

    return this.i18nService.currentLanguage$.pipe(
      map(lang => {
        return {
          id: candidateProfile.id,
          title: jobExperience ? String(jobExperience.occupation.avamCode) : '',
          description: jobExperience ? jobExperience.remark : '',
          header: null,
          badges: [],
          routerLink: ['/candidate-search', candidateProfile.id],
          subtitle: null, // not needed for candidate
          visited: candidateSearchResult.visited
        };
      })
    );
  }

}



