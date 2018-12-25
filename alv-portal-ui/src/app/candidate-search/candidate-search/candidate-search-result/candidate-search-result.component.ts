import { Component, Input, OnInit } from '@angular/core';
import { ResultListItem } from '../../../shared/layout/result-list-item/result-list-item.model';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { I18nService } from '../../../core/i18n.service';
import { JobExperience } from '../../../shared/backend-services/candidate/candidate.types';
import { CandidateSearchResult } from '../../state-management';
import {
  GenderAwareOccupationLabel,
  OccupationService
} from '../../../shared/occupations/occupation.service';
import { Gender } from '../../../shared/backend-services/shared.types';
import { findRelevantJobExperience } from '../../candidate-rules';

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
              private occupationService: OccupationService) {
  }

  ngOnInit() {
    this.resultListItem$ = this.candidateSearchResultToResultListItemMapper(this.candidateSearchResult);
  }

  private candidateSearchResultToResultListItemMapper(candidateSearchResult: CandidateSearchResult): Observable<ResultListItem> {
    const candidateProfile = candidateSearchResult.candidateProfile;
    const jobExperience = findRelevantJobExperience(candidateProfile);
    return this.i18nService.currentLanguage$.pipe(
      switchMap((lang) => this.resolveOccupation(jobExperience, lang)),
      map(occupation => this.map(candidateSearchResult, occupation, jobExperience)),
      shareReplay()
    );
  }

  private map(candidateSearchResult: CandidateSearchResult, occupationLabel: GenderAwareOccupationLabel, jobExperience: JobExperience): ResultListItem {
    const candidateProfile = candidateSearchResult.candidateProfile;
    return {
      id: candidateProfile.id,
      title: this.extractGenderAwareTitle(occupationLabel, candidateProfile),
      description: jobExperience ? jobExperience.remark : '',
      header: null,
      badges: [],
      routerLink: ['/candidate-search', candidateProfile.id],
      subtitle: null, // not needed for candidate
      visited: candidateSearchResult.visited
    };
  }

  private extractGenderAwareTitle(occupationLabel: GenderAwareOccupationLabel, candidateProfile) {
    if (candidateProfile.gender === Gender.MALE && occupationLabel.male) {
      return occupationLabel.male;
    } else if (candidateProfile.gender === Gender.FEMALE && occupationLabel.female) {
      return occupationLabel.female;
    }
    return occupationLabel.default;
  }

  private resolveOccupation(jobExperience: JobExperience, lang: string): Observable<GenderAwareOccupationLabel> {
    const extractProfessionCode = this.extractProfessionCode(jobExperience);
    return this.occupationService.findLabel(extractProfessionCode, lang);
  }

  private extractProfessionCode(jobExperience: JobExperience) {
    return {
      value: String(jobExperience.occupation.avamCode),
      type: 'AVAM'
    };
  }

}



