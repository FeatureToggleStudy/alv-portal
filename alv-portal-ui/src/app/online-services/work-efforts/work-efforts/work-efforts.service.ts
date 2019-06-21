import { Injectable } from '@angular/core';
import { WorkEffortsFilter } from './work-efforts-filter.types';
import {
  FilterBadge,
  InlineBadge
} from '../../../shared/layout/inline-badges/inline-badge.types';
import {
  WorkEffortApplyStatus,
  WorkEffortsFilterPeriod
} from '../../../shared/backend-services/work-efforts/proof-of-work-efforts.types';

@Injectable({
  providedIn: 'root'
})
export class WorkEffortsService {

  constructor() { }

  mapFilterBadges(workEffortsFilter: WorkEffortsFilter): FilterBadge[] {
    const badges: FilterBadge[] = [];
    for (const key in workEffortsFilter) {
      if (key === 'period' && workEffortsFilter[key] && workEffortsFilter[key] !== WorkEffortsFilterPeriod.ALL_MONTHS) {
        badges.push({
          label: 'portal.work-efforts.filter.period.' + workEffortsFilter[key],
          cssClass: 'badge-work-effort-period',
          key: key
        });
      } else if (key === 'workEffortResult' && workEffortsFilter[key]) {

        if (workEffortsFilter[key] === WorkEffortApplyStatus.INTERVIEW) {
          badges.push({
            cssClass: 'badge-work-effort-result-interview',
            label: 'portal.work-efforts.work-effort-result.' + WorkEffortApplyStatus.INTERVIEW,
            key
          });
        }

        if (workEffortsFilter[key] === WorkEffortApplyStatus.EMPLOYED) {
          badges.push({
            cssClass: 'badge-work-effort-result-employed',
            label: 'portal.work-efforts.work-effort-result.' + WorkEffortApplyStatus.EMPLOYED,
            key
          });
        }

        if (workEffortsFilter[key] === WorkEffortApplyStatus.PENDING) {
          badges.push({
            cssClass: 'badge-work-effort-result-pending',
            label: 'portal.work-efforts.work-effort-result.' + WorkEffortApplyStatus.PENDING,
            key
          });
        }

        if (workEffortsFilter[key] === WorkEffortApplyStatus.REJECTED) {
          badges.push({
            cssClass: 'badge-work-effort-result-rejected',
            label: 'portal.work-efforts.work-effort-result.' + WorkEffortApplyStatus.REJECTED,
            key
          });
        }
      }
    }

    return badges;
  }

  mapResultBadges(workEffortResults: WorkEffortApplyStatus[]): InlineBadge[] {
    const badges: InlineBadge[] = [];
    if (workEffortResults.includes(WorkEffortApplyStatus.INTERVIEW)) {
      badges.push({
        cssClass: 'badge-work-effort-result-interview',
        label: 'portal.work-efforts.work-effort-result.' + WorkEffortApplyStatus.INTERVIEW
      });
    }

    if (workEffortResults.includes(WorkEffortApplyStatus.EMPLOYED)) {
      badges.push({
        cssClass: 'badge-work-effort-result-employed',
        label: 'portal.work-efforts.work-effort-result.' + WorkEffortApplyStatus.EMPLOYED
      });
    }

    if (workEffortResults.includes(WorkEffortApplyStatus.PENDING)) {
      badges.push({
        cssClass: 'badge-work-effort-result-pending',
        label: 'portal.work-efforts.work-effort-result.' + WorkEffortApplyStatus.PENDING
      });
    }

    if (workEffortResults.includes(WorkEffortApplyStatus.REJECTED)) {
      badges.push({
        cssClass: 'badge-work-effort-result-rejected',
        label: 'portal.work-efforts.work-effort-result.' + WorkEffortApplyStatus.REJECTED
      });
    }
    return badges;
  }
}
