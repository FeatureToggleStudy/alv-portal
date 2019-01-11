import { Injectable } from '@angular/core';
import { JobAdvertisement } from '../../shared/backend-services/job-advertisement/job-advertisement.types';
import { Observable, of } from 'rxjs';
import { flatMap, map, withLatestFrom } from 'rxjs/operators';
import { JobAdvertisementUtils } from '../../shared/backend-services/job-advertisement/job-advertisement.utils';
import { I18nService } from '../../core/i18n.service';
import { JobCenterRepository } from '../../shared/backend-services/reference-service/job-center.repository';
import { JobDetailModel } from './job-detail-model';


@Injectable()
export class JobDetailModelFactory {

  constructor(private i18nService: I18nService, private referenceServiceRepository: JobCenterRepository) {
  }

  public create(job: JobAdvertisement): Observable<JobDetailModel> {

    const jobCenter$ = this.i18nService.currentLanguage$.pipe(
      flatMap((currentLanguage) => {
        if (job.jobCenterCode) {
          return this.referenceServiceRepository.resolveJobCenter(job.jobCenterCode, currentLanguage);
        }
        return of(null);
      })
    );


    return jobCenter$
      .pipe(
        withLatestFrom(this.i18nService.currentLanguage$),
        map(([jobCenter, currentLanguage]) => {
          const jobDescription = JobAdvertisementUtils.getJobDescription(job, currentLanguage);
          return new JobDetailModel(jobDescription, jobCenter, job);
        })
      );

  }

}

