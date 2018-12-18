import { Component, Input, OnInit } from '@angular/core';
import { ResultListItem } from '../../../shared/layout/result-list-item/result-list-item.model';
import { JobAdvertisementUtils } from '../../../shared/backend-services/job-advertisement/job-advertisement.utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { I18nService } from '../../../core/i18n.service';
import { JobSearchResult } from '../../../job-ad-search/state-management/state/job-ad-search.state';
import {
  JobBadgesMapperService,
  JobBadgeType
} from '../../../job-ad-search/job-badges-mapper.service';
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

  constructor(private i18nService: I18nService,
              private jobBadgesMapperService: JobBadgesMapperService) {
  }

  ngOnInit() {
    this.resultListItem$ = this.candidateSearchResultToResultListItemMapper(this.candidateSearchResult);
  }

  private candidateSearchResultToResultListItemMapper(candidateSearchResult: CandidateSearchResult): Observable<ResultListItem> {
    const candidate = candidateSearchResult.candidateProfile;
    return this.i18nService.currentLanguage$.pipe(
      map(lang => {
        const jobDescription = JobAdvertisementUtils.getJobDescription(candidate, lang);
        return {
          title: jobDescription.title,
          description: jobDescription.description,
          header: candidate.publication.startDate,
          badges: this.jobBadgesMapperService.map(candidate, [
            JobBadgeType.WORKPLACE,
            JobBadgeType.WORKLOAD,
            JobBadgeType.AVAILABILITY
          ]),
          routerLink: ['/candidate-search', candidate.id],
          subtitle: candidate.jobContent.company.name,
          visited: candidateSearchResult.visited
        };
      })
    );
  }

}



