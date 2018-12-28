import { Injectable } from '@angular/core';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import {
  CandidateProfile,
  JobExperience
} from '../../shared/backend-services/candidate/candidate.types';
import {
  catchError,
  first,
  flatMap,
  map,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';
import { OccupationLabelRepository, } from '../../shared/backend-services/reference-service/occupation-label.repository';
import { I18nService } from '../../core/i18n.service';
import { CandidateDetailModel, JobExperienceModel } from './candidate-detail-model';
import { extractGenderAwareTitle } from '../candidate-rules';
import { OccupationService } from '../../shared/occupations/occupation.service';
import { JobCenter } from '../../shared/backend-services/reference-service/job-center.types';
import { JobCenterRepository } from '../../shared/backend-services/reference-service/job-center.repository';

@Injectable()
export class CandidateDetailModelFactory {

  constructor(private occupationLabelRepository: OccupationLabelRepository,
              private i18nService: I18nService,
              private occupationService: OccupationService,
              private referenceServiceRepository: JobCenterRepository) {

  }

  candidateProfile$: Observable<CandidateProfile>;

  create(candidateProfile$: Observable<CandidateProfile>): Observable<CandidateDetailModel> {

    this.candidateProfile$ = candidateProfile$;
    const jobCenter$ = this.getJobCenter();
    const jobExperiencesModels$ = this.getJobExperiencesModels();
    return combineLatest(this.candidateProfile$, jobCenter$, jobExperiencesModels$).pipe(
      map(([candidateProfile, jobCenter, jobExperiencesModels]) => {
        return new CandidateDetailModel(candidateProfile,
          jobCenter,
          jobExperiencesModels);
      })
    );
  }

  private static sortLastJobFirst(experiences) {
    return experiences.sort((a, b) => +b.jobExperience.lastJob - +a.jobExperience.lastJob)
  }

  private resolveJobExperience(jobExperience: JobExperience): Observable<JobExperienceModel> {
    return this.i18nService.currentLanguage$.pipe(
      first(),
      withLatestFrom(this.candidateProfile$),
      flatMap(([language, candidateProfile]) => {
        const professionCode = CandidateDetailModelFactory.extractProfessionCode(jobExperience);
        return this.occupationService.findLabel(professionCode, language).pipe(
          map(label => ({
            jobExperience: jobExperience,
            occupationLabel: extractGenderAwareTitle(candidateProfile, label)
          }))
        );
      }),
    );
  }

  private getJobCenter() {
    const jobCenterCode$ = this.candidateProfile$.pipe(map((candidateProfile) => candidateProfile.jobCenterCode));
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

  private static extractProfessionCode(jobExperience: JobExperience) {
    return {
      value: String(jobExperience.occupation.avamCode),
      type: 'AVAM'
    };
  }

  private getJobExperiencesModels(): Observable<JobExperienceModel[]> {
    const jobExperiences$ = this.candidateProfile$.pipe(map(candidateProfile => candidateProfile.jobExperiences));

    const jobExperiencesModels$: Observable<JobExperienceModel[]> = jobExperiences$.pipe(
      flatMap(jobExperiences => {
        const jobExperiencesModelsObservables = jobExperiences.map(x => this.resolveJobExperience(x));
        return forkJoin(jobExperiencesModelsObservables)
      }),
      map(CandidateDetailModelFactory.sortLastJobFirst)
    );
    return jobExperiencesModels$;
  }
}
