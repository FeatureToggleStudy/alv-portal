import { Injectable } from '@angular/core';
import {
  JobAdvertisement,
  Location
} from '../shared/backend-services/job-advertisement/job-advertisement.types';
import { formatTimeRange } from '../shared/layout/pipes/working-time-range.pipe';
import { LocaleAwareDatePipe } from '../shared/pipes/locale-aware-date.pipe';
import { InlineBadge } from '../shared/layout/inline-badges/inline-badge.types';

@Injectable({
  providedIn: 'root'
})
export class JobBadgesMapperService {

  constructor(private localeAwareDatePipe: LocaleAwareDatePipe) {
  }

  public map(job: JobAdvertisement, badgeTypes: JobBadgeType[]): JobBadge[] {
    let badges: JobBadge[] = [];
    badges.push({
      badgeType: JobBadgeType.WORKLOAD,
      label: formatTimeRange([job.jobContent.employment.workloadPercentageMin, job.jobContent.employment.workloadPercentageMax]),
      cssClass: 'badge-workload',
    });

    if (job.jobContent.location) {
      badges.push({
        badgeType: JobBadgeType.WORKPLACE,
        label: this.locationLabel(job.jobContent.location),
        cssClass: 'badge-job-workplace',
      })
    }
    if (job.jobContent.employment.startDate) {
      badges.push({
        badgeType: JobBadgeType.AVAILABILITY,
        label: 'job-detail.startDate',
        labelParams: { date: this.startDateLabel(job) },
        cssClass: 'badge-availability',
      })
    }
    if (job.jobContent.employment.immediately != null && !job.jobContent.employment.startDate) {
      badges.push({
        badgeType: JobBadgeType.AVAILABILITY,
        label: `job-detail.startsImmediately.false`,
        cssClass: 'badge-availability',
      })
    }
    if (!job.jobContent.employment.permanent && !!job.jobContent.employment.endDate && !job.jobContent.employment.shortEmployment) {
      badges.push({
        badgeType: JobBadgeType.AVAILABILITY,
        label: 'job-detail.endDate',
        labelParams: { date: this.endDateLabel(job) },
        cssClass: 'badge-availability',
      })
    }
    if (!!job.jobContent.employment.shortEmployment && !job.jobContent.employment.permanent) {
      badges.push({
        badgeType: JobBadgeType.AVAILABILITY,
        label: 'job-search.job-search-list-item.badge.shortEmployment',
        cssClass: 'badge-availability',
      })
    }
    if (!job.jobContent.employment.permanent && !job.jobContent.employment.endDate) {
      badges.push({
        badgeType: JobBadgeType.AVAILABILITY,
        label: 'job-search.job-search-list-item.badge.temporary',
        cssClass: 'badge-availability',
      })
    }
    if (job.jobContent.employment.permanent) {
      badges.push({
        badgeType: JobBadgeType.CONTRACT_TYPE,
        label: 'job-search.job-search-list-item.badge.permanent',
        cssClass: 'badge-contract-type',
      })
    }
    if (job.reportingObligation) {
      badges.push({
        badgeType: JobBadgeType.REPORTING_OBLIGATION,
        label: 'job-search.job-search-list-item.badge.restricted',
        cssClass: 'badge-danger',
      })
    }

    //


    return badges.filter((b) => badgeTypes.includes(b.badgeType));
  }

  private endDateLabel(job: JobAdvertisement) {
    return this.localeAwareDatePipe.transform(job.jobContent.employment.endDate);
  }

  private startDateLabel(job: JobAdvertisement) {
    return this.localeAwareDatePipe.transform(job.jobContent.employment.startDate);
  }

  private locationLabel(location: Location) {
    let result = `${location.postalCode} ${location.city}`;
    if (location.cantonCode || location.countryIsoCode) {
      result += `(${location.cantonCode || location.countryIsoCode})`;
    }
    return result;
  }

}

export enum JobBadgeType {
  WORKLOAD, WORKPLACE, AVAILABILITY, REPORTING_OBLIGATION, CONTRACT_TYPE
}

export interface JobBadge extends InlineBadge {

  badgeType: JobBadgeType;

}
