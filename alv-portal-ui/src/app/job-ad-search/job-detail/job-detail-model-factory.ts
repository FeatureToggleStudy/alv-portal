import { Injectable } from '@angular/core';
import {
  JobAdvertisement,
  JobDescription
} from '../../shared/backend-services/job-advertisement/job-advertisement.types';
import { combineLatest, Observable, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { JobAdvertisementUtils } from '../../shared/backend-services/job-advertisement/job-advertisement.utils';
import { I18nService } from '../../core/i18n.service';
import { ReferenceServiceRepository } from '../../shared/backend-services/reference-service/reference-service.repository';
import { JobCenter } from '../../shared/backend-services/reference-service/reference-service.types';
import {
  hasImmediately,
  hasStartDate,
  isPermanent,
  isShortEmployment,
  isTemporary
} from '../job-ad-rules';

export class JobDetailModel {

  constructor(public jobDescription: JobDescription, public jobCenter: JobCenter, public jobAdvertisement: JobAdvertisement) {
  }

  hasStartDate() {
    return hasStartDate(this.jobAdvertisement);
  }

  hasImmediately() {
    return hasImmediately(this.jobAdvertisement);
  }

  isTemporary() {
    return isTemporary(this.jobAdvertisement);
  }

  isPermanent() {
    return isPermanent(this.jobAdvertisement);
  }

  isShortEmployment() {
    return isShortEmployment(this.jobAdvertisement);
  }

  get firstOccupation() {
    const occupation = this.jobAdvertisement.jobContent.occupations[0];
    if (occupation.workExperience && occupation.educationCode) {
      return occupation;
    }
    return null;
  }

  get jobContent() {
    return this.jobAdvertisement.jobContent;
  }

  get employment() {
    return this.jobContent.employment;
  }

  get applyChannel() {
    return this.jobContent.applyChannel;
  }

  get publication() {
    return this.jobAdvertisement.publication;
  }

  get id() {
    return this.jobAdvertisement.id;
  }

  get stellennummerAvam() {
    return this.jobAdvertisement.stellennummerAvam;
  }

  get stellennummerEgov() {
    return this.jobAdvertisement.stellennummerEgov;
  }

}

@Injectable()
export class JobDetailModelFactory {

  constructor(private i18nService: I18nService, private referenceServiceRepository: ReferenceServiceRepository) {
  }

  public create(job$: Observable<JobAdvertisement>): Observable<JobDetailModel> {

    const jobCenter$ = combineLatest(job$, this.i18nService.currentLanguage$)
      .pipe(
        flatMap(([job, currentLanguage]) => {
          if (job.jobCenterCode) {
            return this.referenceServiceRepository.resolveJobCenter(job.jobCenterCode, currentLanguage);
          }
          return of(null);
        })
      );


    return combineLatest(job$, this.i18nService.currentLanguage$, jobCenter$)
      .pipe(
        map(([job, currentLanguage, jobCenter]) => {
          const jobDescription = JobAdvertisementUtils.getJobDescription(job, currentLanguage);
          return new JobDetailModel(jobDescription, jobCenter, job);
        })
      );

  }

}

