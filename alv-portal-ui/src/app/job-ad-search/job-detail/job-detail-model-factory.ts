import { Injectable } from '@angular/core';
import { JobAdvertisement } from '../../shared/backend-services/job-advertisement/job-advertisement.types';
import { combineLatest, Observable, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { JobAdvertisementUtils } from '../../shared/backend-services/job-advertisement/job-advertisement.utils';
import { I18nService } from '../../core/i18n.service';
import { ReferenceServiceRepository } from '../../shared/backend-services/reference-service/reference-service.repository';
import { JobDetailModel } from './job-detail-model';


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

