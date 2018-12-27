import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import {
  CandidateProfile,
  JobExperience
} from '../../shared/backend-services/candidate/candidate.types';
import { flatMap, map } from 'rxjs/operators';
import {
  OccupationLabelRepository,
  OccupationTypes
} from '../../shared/backend-services/reference-service/occupation-label.repository';
import { I18nService } from '../../core/i18n.service';
import { OccupationLabelData } from '../../shared/backend-services/reference-service/occupation-label.types';
import { CandidateDetailModel } from './candidate-detail-model';

@Injectable()
export class CandidateDetailModelFactory {

  constructor(private occupationLabelRepository: OccupationLabelRepository,
              private i18nService: I18nService) {

  }

  private static getLastJob(candidateProfile: CandidateProfile) {
    return candidateProfile.jobExperiences[0];
  }

  public create(candidateProfile$: Observable<CandidateProfile>): Observable<CandidateDetailModel> {

    const lastJob$ = candidateProfile$.pipe(map(CandidateDetailModelFactory.getLastJob));
    const lastJobOccupationLabel$: Observable<OccupationLabelData> = combineLatest(lastJob$, this.i18nService.currentLanguage$).pipe(
      flatMap((jobExperienceAndLang: [JobExperience, string]) => {
          const avamCode = String(jobExperienceAndLang[0].occupation.avamCode);
          const language = jobExperienceAndLang[1];
          return this.occupationLabelRepository.getOccupationLabelsByKey(OccupationTypes.AVAM, avamCode, language);
        }
      ));
    return combineLatest(candidateProfile$, lastJobOccupationLabel$).pipe(
      map((both) => new CandidateDetailModel(both[0], both[1]))
    )
  }

}
