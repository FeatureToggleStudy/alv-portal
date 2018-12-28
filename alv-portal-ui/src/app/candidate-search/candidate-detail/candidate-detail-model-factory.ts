import { Injectable } from '@angular/core';
import { combineLatest, from, Observable, of } from 'rxjs';
import {
  CandidateProfile,
  JobExperience
} from '../../shared/backend-services/candidate/candidate.types';
import {
  catchError,
  concatMap, first,
  flatMap,
  map,
  switchMap,
  take,
  toArray
} from 'rxjs/operators';
import { OccupationLabelRepository, } from '../../shared/backend-services/reference-service/occupation-label.repository';
import { I18nService } from '../../core/i18n.service';
import { CandidateDetailModel, JobExperienceModel } from './candidate-detail-model';
import { extractGenderAwareTitle, findRelevantJobExperience } from '../candidate-rules';
import {
  GenderAwareOccupationLabel,
  OccupationService
} from '../../shared/occupations/occupation.service';
import { JobCenter } from '../../shared/backend-services/reference-service/job-center.types';
import { JobCenterRepository } from '../../shared/backend-services/reference-service/job-center.repository';

@Injectable()
export class CandidateDetailModelFactory {

  constructor(private occupationLabelRepository: OccupationLabelRepository,
              private i18nService: I18nService,
              private occupationService: OccupationService,
              private referenceServiceRepository: JobCenterRepository) {

  }


  create(candidateProfile$: Observable<CandidateProfile>): Observable<CandidateDetailModel> {

    const jobCenter$ = this.getJobCenter(candidateProfile$);

    const lastJobExperience$ = candidateProfile$.pipe(map(candidateProfile => findRelevantJobExperience(candidateProfile)));
    const lastJobOccupationLabel$: Observable<GenderAwareOccupationLabel> = lastJobExperience$.pipe(
      flatMap(jobExperience => this.resolveOccupationLabel(jobExperience))
    );

    const jobExperiences$ = candidateProfile$.pipe(map(candidateProfile => candidateProfile.jobExperiences));

    const jobExperiencesModels$: Observable<JobExperienceModel[]> = jobExperiences$.pipe(
      flatMap((jobExperiences) => {
        return from(jobExperiences).pipe(
          concatMap(jobExperience => this.resolveJobExperience(jobExperience))
        );
      }),
      first(),
      toArray()
    );

    return combineLatest(candidateProfile$, lastJobOccupationLabel$, jobCenter$, jobExperiencesModels$).pipe(
      map(([candidateProfile, genderAwareOccupationLabel, jobCenter, jobExperiencesModels]) => {
        return new CandidateDetailModel(candidateProfile,
          extractGenderAwareTitle(candidateProfile, genderAwareOccupationLabel),
          jobCenter,
          jobExperiencesModels);
      })
    );
  }

  private resolveJobExperience(jobExperience: JobExperience): Observable<JobExperienceModel> {
    return this.i18nService.currentLanguage$.pipe(
      map((language) => {
          const professionCode = CandidateDetailModelFactory.extractProfessionCode(jobExperience);
          return {
            jobExperience: jobExperience,
            occupationLabel: this.occupationService.findLabel(professionCode, language)
          };
        }
      ),
      first());
  }

  private getJobCenter(candidateProfile$: Observable<CandidateProfile>) {
    const jobCenterCode$ = candidateProfile$.pipe(map((candidateProfile) => candidateProfile.jobCenterCode));
    const jobCenter$: Observable<JobCenter> = combineLatest(jobCenterCode$, this.i18nService.currentLanguage$).pipe(
      switchMap(([jobCenterCode, lang]) => {
        if (!jobCenterCode) {
          return of(null as JobCenter)
        }
        return this.referenceServiceRepository.resolveJobCenter(jobCenterCode, lang)
      }),
      catchError(() => of(null as JobCenter))
    );
    return jobCenter$;
  }


  private resolveOccupationLabel(jobExperience: JobExperience): Observable<GenderAwareOccupationLabel> {
    return this.resolveJobExperience(jobExperience).pipe(flatMap(j => j.occupationLabel))
  }

  private static extractProfessionCode(jobExperience: JobExperience) {
    return {
      value: String(jobExperience.occupation.avamCode),
      type: 'AVAM'
    };
  }
}
