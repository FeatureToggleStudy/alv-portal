import {
  WorkEffortApplyStatus
} from '../../../shared/backend-services/work-efforts/proof-of-work-efforts.types';

export enum WorkEffortsFilterPeriod {
  CURRENT_MONTH = 'CURRENT_MONTH',
  LAST_3_MONTHS = 'LAST_3_MONTHS',
  LAST_6_MONTHS = 'LAST_6_MONTHS',
  LAST_12_MONTHS = 'LAST_12_MONTHS',
  ALL_MONTHS = 'ALL_MONTHS'
}

export interface WorkEffortsFilterValues {
  period: WorkEffortsFilterPeriod;
  workEffortResult: WorkEffortApplyStatus;
}

export interface WorkEffortsFilter extends WorkEffortsFilterValues {
  query: string;
  period: WorkEffortsFilterPeriod;
  workEffortResult: WorkEffortApplyStatus;
}

export const initialWorkEffortsFilter = {
  query: null,
  period: WorkEffortsFilterPeriod.LAST_3_MONTHS,
  workEffortResult: WorkEffortApplyStatus.ALL
};
