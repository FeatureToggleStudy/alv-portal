import { Injectable } from '@angular/core';
import {
  JobAdvertisement,
  JobDescription, Occupation
} from '../../shared/backend-services/job-advertisement/job-advertisement.types';
import { combineLatest, Observable } from 'rxjs';
import { filter, flatMap, map } from 'rxjs/operators';
import { JobAdvertisementUtils } from '../../shared/backend-services/job-advertisement/job-advertisement.utils';
import { I18nService } from '../../core/i18n.service';
import { ReferenceServiceRepository } from '../../shared/backend-services/reference-service/reference-service.repository';
import { JobCenter } from '../../shared/backend-services/reference-service/reference-service.types';

@Injectable({
  providedIn: 'root'
})
export class JobDetailModelFactoryService {

  constructor(private i18nService: I18nService, private referenceServiceRepository: ReferenceServiceRepository) {
  }

  public create(job$: Observable<JobAdvertisement>): Observable<JobDetailModel> {

    const jobCenterCode$ = job$
      .pipe(
        filter((job) => !!job),
        map((job) => job.jobCenterCode),
        filter((jobCenterCode) => !!jobCenterCode));

    let jobCenter$ = combineLatest(jobCenterCode$, this.i18nService.currentLanguage$)
      .pipe(
        flatMap(([jobCenterCode, currentLanguage]) => this.referenceServiceRepository.resolveJobCenter(jobCenterCode, currentLanguage))
      );


    return combineLatest(job$, this.i18nService.currentLanguage$, jobCenter$)
      .pipe(
        map(([job, currentLanguage, jobCenter]) => {
          let jobDescription = JobAdvertisementUtils.getJobDescription(job, currentLanguage);
          return new JobDetailModel(jobDescription, jobCenter, job);
        })
      );

  }

}


export class JobDetailModel {

  public jobDescription: JobDescription;

  public jobCenter: JobCenter;

  private jobAdvertisement: JobAdvertisement;

  // maybe
  private firstOccupation:Occupation;

  constructor(jobDescription: JobDescription, jobCenter: JobCenter, jobAdvertisement: JobAdvertisement) {
    this.jobDescription = jobDescription;
    this.jobCenter = jobCenter;
    this.jobAdvertisement = jobAdvertisement;
  }

  /*  get jobContent() {
    return this.jobAdvertisement.jobContent;
  }

  isShortEmployment() {
    return isShortEmployment(this.jobAdvertisement);
  }*/

}
