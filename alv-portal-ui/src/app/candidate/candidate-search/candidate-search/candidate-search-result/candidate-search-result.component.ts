import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ResultListItem } from '../../../../shared/layout/result-list-item/result-list-item.model';
import { EMPTY, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { I18nService } from '../../../../core/i18n.service';
import { JobExperience } from '../../../../shared/backend-services/candidate/candidate.types';
import { CandidateClickedAction, CandidateSearchResult, CandidateSearchState } from '../../state-management';
import { GenderAwareOccupationLabel, OccupationService } from '../../../../shared/occupations/occupation.service';
import { extractGenderNeutralTitle } from '../../candidate-rules';
import { CandidateProfileBadgesMapperService } from '../../candidate-profile-badges-mapper.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'alv-candidate-search-result',
  templateUrl: './candidate-search-result.component.html',
  styleUrls: ['./candidate-search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateSearchResultComponent implements OnInit {

  @Input()
  candidateSearchResult: CandidateSearchResult;

  resultListItem$: Observable<ResultListItem>;

  constructor(private i18nService: I18nService,
              private store: Store<CandidateSearchState>,
              private candidateProfileBadgesMapperService: CandidateProfileBadgesMapperService,
              ) {
  }

  ngOnInit() {
    this.resultListItem$ = this.candidateSearchResultToResultListItemMapper(this.candidateSearchResult);
  }

  logClick() {
    this.store.dispatch(new CandidateClickedAction({candidateProfile: this.candidateSearchResult.candidateProfile}));
  }

  private candidateSearchResultToResultListItemMapper(candidateSearchResult: CandidateSearchResult): Observable<ResultListItem> {
    const candidateProfile = candidateSearchResult.candidateProfile;
    if (!candidateSearchResult.relevantJobExperience) {
      console.warn('Could not find a relevantJobExperience for candidate profile: ', candidateProfile.id);
      return EMPTY;
    }
    return this.i18nService.currentLanguage$.pipe(
      map(occupationLabel => this.map(candidateSearchResult, candidateSearchResult.relevantJobExperience, candidateSearchResult.occupationLabel))
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

}
