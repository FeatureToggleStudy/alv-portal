import { Injectable } from '@angular/core';
import { combineLatest, forkJoin, merge, Observable, of } from 'rxjs';
import {
  CandidateProfile,
  CandidateProtectedData,
  JobExperience
} from '../../shared/backend-services/candidate/candidate.types';
import {
  catchError,
  filter,
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
import { CandidateRepository } from '../../shared/backend-services/candidate/candidate.repository';
import { User, UserRole } from '../../core/auth/user.model';
import { AuthenticationService } from '../../core/auth/authentication.service';

@Injectable()
export class CandidateDetailModelFactory {

  constructor(private occupationLabelRepository: OccupationLabelRepository,
              private i18nService: I18nService,
              private occupationService: OccupationService,
              private referenceServiceRepository: JobCenterRepository,
              private candidateRepository: CandidateRepository,
              private authenticationService: AuthenticationService) {

  }

  candidateProfile$: Observable<CandidateProfile>;

  private static sortLastJobFirst(experiences) {
    return experiences.sort((a, b) => +b.jobExperience.lastJob - +a.jobExperience.lastJob);
  }

  private static extractProfessionCode(jobExperience: JobExperience) {
    return {
      value: String(jobExperience.occupation.avamCode),
      type: 'AVAM'
    };
  }

  create(candidateProfile$: Observable<CandidateProfile>): Observable<CandidateDetailModel> {

    this.candidateProfile$ = candidateProfile$;
    const jobCenter$ = this.getJobCenter();
    const jobExperiencesModels$ = this.getJobExperiencesModels();
    const candidateProtectedData$ = this.getCandidateProtectedData();
    return combineLatest(this.candidateProfile$, jobCenter$, jobExperiencesModels$, candidateProtectedData$).pipe(
      map(([candidateProfile, jobCenter, jobExperiencesModels, candidateProtectedData]) => {
        return new CandidateDetailModel(candidateProfile,
          jobCenter,
          jobExperiencesModels,
          candidateProtectedData);
      })
    );
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

  private getJobCenter(): Observable<JobCenter> {
    const jobCenterCode$ = this.candidateProfile$.pipe(map((candidateProfile) => candidateProfile.jobCenterCode));
    return combineLatest(jobCenterCode$, this.i18nService.currentLanguage$).pipe(
      switchMap(([jobCenterCode, lang]) => {
        if (!jobCenterCode) {
          return of(null as JobCenter);
        }
        return this.referenceServiceRepository.resolveJobCenter(jobCenterCode, lang);
      }),
      catchError(() => of(null as JobCenter))
    );
  }


  private getJobExperiencesModels(): Observable<JobExperienceModel[]> {
    const jobExperiences$ = this.candidateProfile$.pipe(map(candidateProfile => candidateProfile.jobExperiences));

    const jobExperiencesModels$: Observable<JobExperienceModel[]> = jobExperiences$.pipe(
      flatMap(jobExperiences => {
        const jobExperiencesModelsObservables = jobExperiences.map(x => this.resolveJobExperience(x));
        return forkJoin(jobExperiencesModelsObservables);
      }),
      map(CandidateDetailModelFactory.sortLastJobFirst)
    );
    return jobExperiencesModels$;
  }

  private static canViewCandidateProtectedData(candidateProfile: CandidateProfile, currentUser: User): boolean {
    return true; // fixme xxx
    return Boolean(currentUser && currentUser.hasAnyAuthorities([UserRole.ROLE_PAV]) && candidateProfile.showProtectedData);
  }

  private getCandidateProtectedData(): Observable<CandidateProtectedData | null> {
    const dataForEntitled$ = this.candidateProfile$.pipe(
      withLatestFrom(this.authenticationService.getCurrentUser()),
      filter(([candidateProfile, currentUser]) => CandidateDetailModelFactory.canViewCandidateProtectedData(candidateProfile, currentUser)),
      flatMap(([candidateProfile]) => this.candidateRepository.getCandidateProtectedData(candidateProfile.id)),
    );

    const exceptionData = this.candidateProfile$.pipe(
      withLatestFrom(this.authenticationService.getCurrentUser()),
      filter(([candidateProfile, currentUser]) => !CandidateDetailModelFactory.canViewCandidateProtectedData(candidateProfile, currentUser)),
      map(() => null)
    );

    // inspired by https://blog.rangle.io/rxjs-where-is-the-if-else-operator/
    return merge(dataForEntitled$, exceptionData);
  }
}
