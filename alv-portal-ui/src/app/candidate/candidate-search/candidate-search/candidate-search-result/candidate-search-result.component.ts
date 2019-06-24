import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ResultListItem } from '../../../../shared/layout/result-list-item/result-list-item.model';
import { EMPTY, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { I18nService } from '../../../../core/i18n.service';
import { JobExperience } from '../../../../shared/backend-services/candidate/candidate.types';
import { CandidateSearchResult } from '../../state-management';
import {
  GenderAwareOccupationLabel,
  OccupationService
} from '../../../../shared/occupations/occupation.service';
import {
  extractGenderNeutralTitle,
  findRelevantJobExperience
} from '../../candidate-rules';
import { CandidateProfileBadgesMapperService } from '../../candidate-profile-badges-mapper.service';
import { OccupationCode } from '../../../../shared/backend-services/reference-service/occupation-label.types';

@Component({
  selector: 'alv-candidate-search-result',
  templateUrl: './candidate-search-result.component.html',
  styleUrls: ['./candidate-search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateSearchResultComponent implements OnInit {

  @Input()
  candidateSearchResult: CandidateSearchResult;

  @Input()
  selectedOccupationCodes: OccupationCode[];

  resultListItem$: Observable<ResultListItem>;

  constructor(private i18nService: I18nService,
              private candidateProfileBadgesMapperService: CandidateProfileBadgesMapperService,
              private occupationService: OccupationService) {
  }

  ngOnInit() {
    this.resultListItem$ = this.candidateSearchResultToResultListItemMapper(this.candidateSearchResult);
  }

  private candidateSearchResultToResultListItemMapper(candidateSearchResult: CandidateSearchResult): Observable<ResultListItem> {
    const candidateProfile = candidateSearchResult.candidateProfile;
    const relevantJobExperience = findRelevantJobExperience(candidateProfile, this.selectedOccupationCodes);
    if (!relevantJobExperience) {
      console.warn('Could not find a relevantJobExperience for candidate profile: ', candidateProfile.id);
      return EMPTY;
    }
    return this.i18nService.currentLanguage$.pipe(
      switchMap((lang) => this.resolveOccupation(relevantJobExperience, lang)),
      map(occupationLabel => this.map(candidateSearchResult, relevantJobExperience, occupationLabel))
    );
  }

  private map(candidateSearchResult: CandidateSearchResult, jobExperience: JobExperience, occupationLabel: GenderAwareOccupationLabel): ResultListItem {
    const candidateProfile = candidateSearchResult.candidateProfile;
    return {
      id: candidateProfile.id,
      title: extractGenderNeutralTitle(occupationLabel),
      description: jobExperience ? jobExperience.remark : '',
      header: null,
      badges: this.candidateProfileBadgesMapperService.map(candidateProfile, jobExperience),
      routerLink: ['/candidate-search', candidateProfile.id],
      subtitle: null, // not needed for candidate
      visited: candidateSearchResult.visited
    };
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



