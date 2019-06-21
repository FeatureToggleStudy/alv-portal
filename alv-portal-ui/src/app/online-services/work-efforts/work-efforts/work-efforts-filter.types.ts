import {
  WorkEffortsFilterPeriod,
  WorkEffortApplyStatus
} from '../../../shared/backend-services/work-efforts/proof-of-work-efforts.types';

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
