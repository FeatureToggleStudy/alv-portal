import { Injectable } from '@angular/core';
import {
  WorkEffortApplyStatusFilter,
  WorkEffortsFilter,
  WorkEffortsFilterPeriod
} from './work-efforts-overview-filter.types';
import { FilterBadge } from '../../../shared/layout/inline-badges/inline-badge.types';

@Injectable({
  providedIn: 'root'
})
export class WorkEffortsOverviewFilterBadgesMapper {

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

        if (workEffortsFilter[key] === WorkEffortApplyStatusFilter.INTERVIEW) {
          badges.push({
            cssClass: 'badge-work-effort-result-interview',
            label: 'portal.work-efforts.work-effort-result.' + WorkEffortApplyStatusFilter.INTERVIEW,
            key
          });
        }

        if (workEffortsFilter[key] === WorkEffortApplyStatusFilter.EMPLOYED) {
          badges.push({
            cssClass: 'badge-work-effort-result-employed',
            label: 'portal.work-efforts.work-effort-result.' + WorkEffortApplyStatusFilter.EMPLOYED,
            key
          });
        }

        if (workEffortsFilter[key] === WorkEffortApplyStatusFilter.PENDING) {
          badges.push({
            cssClass: 'badge-work-effort-result-pending',
            label: 'portal.work-efforts.work-effort-result.' + WorkEffortApplyStatusFilter.PENDING,
            key
          });
        }

        if (workEffortsFilter[key] === WorkEffortApplyStatusFilter.REJECTED) {
          badges.push({
            cssClass: 'badge-work-effort-result-rejected',
            label: 'portal.work-efforts.work-effort-result.' + WorkEffortApplyStatusFilter.REJECTED,
            key
          });
        }
      }
    }

    return badges;
  }
}
