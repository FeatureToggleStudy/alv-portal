import { Injectable } from '@angular/core';
import { JobAdvertisement } from '../../shared/backend-services/job-advertisement/job-advertisement.types';
import {
  hasImmediately,
  hasStartDate,
  isPermanent,
  isShortEmployment,
  isTemporary
} from '../job-ad-rules';
import { JobLocationPipe } from '../job-location.pipe';
import { LocaleAwareDatePipe } from '../../shared/pipes/locale-aware-date.pipe';
import { WorkingTimeRangePipe } from '../../shared/pipes/working-time-range.pipe';

@Injectable()
export class JobDetailService {

  constructor(private jobLocationPipe: JobLocationPipe,
              private localAwareDatePipe: LocaleAwareDatePipe,
              private workingTimeRange: WorkingTimeRangePipe) { }

  mapJobAdInfoList(job: JobAdvertisement): AlvListItem[] {
    const infoList = [];
    infoList.push({
      title: 'job-detail.workplace.label',
      content: this.jobLocationPipe.transform(job.jobContent.location)
    });
    if (hasStartDate(job)) {
      infoList.push({
        title: 'job-detail.employmentStartDate.label',
        content: this.jobLocationPipe.transform(job.jobContent.location),
        contentParams: {date: this.localAwareDatePipe.transform(job.jobContent.employment.startDate)}
      });
    }
    if (hasImmediately(job)) {
      infoList.push({
        title: 'job-detail.employmentStartDate.label',
        content: 'job-detail.startsImmediately.' + job.jobContent.employment.immediately
      });
    }
    infoList.push({
      title: 'job-detail.workload.label',
      content: this.workingTimeRange.transform([
        job.jobContent.employment.workloadPercentageMin,
        job.jobContent.employment.workloadPercentageMax
      ])
    });
    if (isTemporary(job)) {
      infoList.push({
        title: 'job-detail.employmentEndDate.label',
        content: 'job-search.job-search-list-item.badge.temporary'
      });
    }
    if (isPermanent(job)) {
      infoList.push({
        title: 'job-detail.employmentEndDate.label',
        content: 'job-search.job-search-list-item.badge.permanent'
      });
    }
    if (isShortEmployment(job)) {
      infoList.push({
        title: 'job-detail.workForm.label',
        content: 'job-search.job-search-list-item.badge.shortEmployment'
      });
    }
    return infoList;
  }
}
