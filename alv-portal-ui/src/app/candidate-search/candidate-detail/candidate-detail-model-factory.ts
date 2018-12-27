import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import {
  CandidateProfile,
  JobExperience
} from '../../shared/backend-services/candidate/candidate.types';
import { flatMap, map } from 'rxjs/operators';
import { OccupationLabelRepository, } from '../../shared/backend-services/reference-service/occupation-label.repository';
import { I18nService } from '../../core/i18n.service';
import { CandidateDetailModel } from './candidate-detail-model';
import { extractGenderAwareTitle, findRelevantJobExperience } from '../candidate-rules';
import {
  GenderAwareOccupationLabel,
  OccupationService
} from '../../shared/occupations/occupation.service';

@Injectable()
export class CandidateDetailModelFactory {

  constructor(private occupationLabelRepository: OccupationLabelRepository,
              private i18nService: I18nService,
              private occupationService: OccupationService) {

  }


  public create(candidateProfile$: Observable<CandidateProfile>): Observable<CandidateDetailModel> {

    const lastJob$ = candidateProfile$.pipe(map(c => findRelevantJobExperience(c)));
    const lastJobOccupationLabel$: Observable<GenderAwareOccupationLabel> = combineLatest(lastJob$, this.i18nService.currentLanguage$).pipe(
      flatMap((jobExperienceAndLang: [JobExperience, string]) => {
          const language: string = jobExperienceAndLang[1];
          const jobExperience: JobExperience = jobExperienceAndLang[0];
          const professionCode = CandidateDetailModelFactory.extractProfessionCode(jobExperience);
          return this.occupationService.findLabel(professionCode, language);
        }
      ));
    return combineLatest(candidateProfile$, lastJobOccupationLabel$).pipe(
      map((both: [CandidateProfile, GenderAwareOccupationLabel]) => {
        return new CandidateDetailModel(both[0], extractGenderAwareTitle(both[0], both[1]));
      })
    );
  }

  private static extractProfessionCode(jobExperience: JobExperience) {
    return {
      value: String(jobExperience.occupation.avamCode),
      type: 'AVAM'
    };
  }
}
