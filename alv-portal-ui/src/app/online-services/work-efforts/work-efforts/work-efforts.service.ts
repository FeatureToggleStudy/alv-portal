import { Injectable } from '@angular/core';
import { WorkEffortsFilter } from './work-efforts-filter.types';
import {
  FilterBadge,
  InlineBadge
} from '../../../shared/layout/inline-badges/inline-badge.types';
import {
  WorkEffortResult,
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

        if (workEffortsFilter[key] === WorkEffortResult.INTERVIEW) {
          badges.push({
            cssClass: 'badge-work-effort-result-interview',
            label: 'portal.work-efforts.work-effort-result.' + WorkEffortResult.INTERVIEW,
            key
          });
        }

        if (workEffortsFilter[key] === WorkEffortResult.EMPLOYED) {
          badges.push({
            cssClass: 'badge-work-effort-result-employed',
            label: 'portal.work-efforts.work-effort-result.' + WorkEffortResult.EMPLOYED,
            key
          });
        }

        if (workEffortsFilter[key] === WorkEffortResult.PENDING) {
          badges.push({
            cssClass: 'badge-work-effort-result-pending',
            label: 'portal.work-efforts.work-effort-result.' + WorkEffortResult.PENDING,
            key
          });
        }

        if (workEffortsFilter[key] === WorkEffortResult.REJECTED) {
          badges.push({
            cssClass: 'badge-work-effort-result-rejected',
            label: 'portal.work-efforts.work-effort-result.' + WorkEffortResult.REJECTED,
            key
          });
        }
      }
    }

    return badges;
  }

  mapResultBadges(workEffortResults: WorkEffortResult[]): InlineBadge[] {
    const badges: InlineBadge[] = [];
    if (workEffortResults.includes(WorkEffortResult.INTERVIEW)) {
      badges.push({
        cssClass: 'badge-work-effort-result-interview',
        label: 'portal.work-efforts.work-effort-result.' + WorkEffortResult.INTERVIEW
      });
    }

    if (workEffortResults.includes(WorkEffortResult.EMPLOYED)) {
      badges.push({
        cssClass: 'badge-work-effort-result-employed',
        label: 'portal.work-efforts.work-effort-result.' + WorkEffortResult.EMPLOYED
      });
    }

    if (workEffortResults.includes(WorkEffortResult.PENDING)) {
      badges.push({
        cssClass: 'badge-work-effort-result-pending',
        label: 'portal.work-efforts.work-effort-result.' + WorkEffortResult.PENDING
      });
    }

    if (workEffortResults.includes(WorkEffortResult.REJECTED)) {
      badges.push({
        cssClass: 'badge-work-effort-result-rejected',
        label: 'portal.work-efforts.work-effort-result.' + WorkEffortResult.REJECTED
      });
    }
    return badges;
  }
}
