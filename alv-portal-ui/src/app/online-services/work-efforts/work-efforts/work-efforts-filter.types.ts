import {
  WorkEffortsFilterPeriod,
  WorkEffortResult
} from '../../../shared/backend-services/work-efforts/work-efforts.types';

export interface WorkEffortsFilterValues {
  period: WorkEffortsFilterPeriod;
  workEffortResult: WorkEffortResult;
}

export interface WorkEffortsFilter extends WorkEffortsFilterValues {
  query: string;
  period: WorkEffortsFilterPeriod;
  workEffortResult: WorkEffortResult;
}

export const initialWorkEffortsFilter = {
  query: null,
  period: WorkEffortsFilterPeriod.LAST_3_MONTHS,
  workEffortResult: WorkEffortResult.ALL
};
