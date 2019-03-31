import { Injectable } from '@angular/core';
import { JobAdvertisement } from '../../shared/backend-services/job-advertisement/job-advertisement.types';
import { LocaleAwareDatePipe } from '../../shared/pipes/locale-aware-date.pipe';
import { InlineBadge } from '../../shared/layout/inline-badges/inline-badge.types';
import { WorkingTimeRangePipe } from '../../shared/pipes/working-time-range.pipe';
import {
  hasEndDate,
  hasImmediately,
  hasLocation,
  hasStartDate,
  isPermanent,
  isReportingObligation,
  isShortEmployment,
  isTemporary
} from '../../job-advertisement/shared/job-ad-rules';
import { JobLocationPipe } from '../../shared/pipes/job-location.pipe';

export enum JobBadgeType {
  WORKLOAD,
  WORKPLACE,
  AVAILABILITY,
  REPORTING_OBLIGATION,
  CONTRACT_TYPE
}

export interface JobBadge extends InlineBadge {
  badgeType: JobBadgeType;
}

export const ALL_JOB_BADGES = [
  JobBadgeType.CONTRACT_TYPE,
  JobBadgeType.AVAILABILITY,
  JobBadgeType.WORKPLACE,
  JobBadgeType.WORKLOAD,
  JobBadgeType.REPORTING_OBLIGATION
];

@Injectable(
  // {
  // providedIn: 'root',
// }
)
export class JobBadgesMapperService {

  constructor(private localeAwareDatePipe: LocaleAwareDatePipe,
              private workingTimeRangePipe: WorkingTimeRangePipe,
              private jobLocationPipe: JobLocationPipe) {
  }

  public map(job: JobAdvertisement, badgeTypes: JobBadgeType[] = ALL_JOB_BADGES): JobBadge[] {
    const badges: JobBadge[] = [];

    if (hasLocation(job)) {
      badges.push({
        badgeType: JobBadgeType.WORKPLACE,
        label: this.jobLocationPipe.transform(job.jobContent.location),
        cssClass: 'badge-job-workplace',
      });
    }

    badges.push({
      badgeType: JobBadgeType.WORKLOAD,
      label: this.workingTimeRangePipe.transform([job.jobContent.employment.workloadPercentageMin, job.jobContent.employment.workloadPercentageMax]),
      cssClass: 'badge-workload',
    });

    if (hasStartDate(job)) {
      badges.push({
        badgeType: JobBadgeType.AVAILABILITY,
        label: 'job-detail.startDate',
        labelParams: { date: this.startDateLabel(job) },
        cssClass: 'badge-availability',
      });
    }
    if (hasImmediately(job)) {
      badges.push({
        badgeType: JobBadgeType.AVAILABILITY,
        label: `job-detail.startsImmediately.${job.jobContent.employment.immediately}`,
        cssClass: 'badge-availability',
      });
    }
    if (hasEndDate(job)) {
      badges.push({
        badgeType: JobBadgeType.AVAILABILITY,
        label: 'job-detail.endDate',
        labelParams: { date: this.endDateLabel(job) },
        cssClass: 'badge-availability',
      });
    }
    if (isShortEmployment(job)) {
      badges.push({
        badgeType: JobBadgeType.AVAILABILITY,
        label: 'job-search.job-search-list-item.badge.shortEmployment',
        cssClass: 'badge-availability',
      });
    }
    if (isTemporary(job)) {
      badges.push({
        badgeType: JobBadgeType.CONTRACT_TYPE,
        label: 'job-search.job-search-list-item.badge.temporary',
        cssClass: 'badge-availability',
      });
    }
    if (isPermanent(job)) {
      badges.push({
        badgeType: JobBadgeType.CONTRACT_TYPE,
        label: 'job-search.job-search-list-item.badge.permanent',
        cssClass: 'badge-contract-type',
      });
    }
    if (isReportingObligation(job)) {
      badges.push({
        badgeType: JobBadgeType.REPORTING_OBLIGATION,
        label: 'job-search.job-search-list-item.badge.restricted',
        cssClass: 'badge-danger',
      });
    }

    return badges.filter((b) => badgeTypes.includes(b.badgeType));
  }

  private endDateLabel(job: JobAdvertisement) {
    return this.localeAwareDatePipe.transform(job.jobContent.employment.endDate);
  }

  private startDateLabel(job: JobAdvertisement) {
    return this.localeAwareDatePipe.transform(job.jobContent.employment.startDate);
  }

}
