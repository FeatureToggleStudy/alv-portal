import {
  EmploymentDuration,
  WorkForm
} from '../../../shared/backend-services/shared.types';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface EmploymentFormValue {
  workloadPercentageMin: number;
  workloadPercentageMax: number;
  immediately: boolean;
  duration: EmploymentDuration;
  startDate?: NgbDateStruct;
  endDate?: NgbDateStruct;
  workForms: { [p: string]: boolean };
}

export function emptyEmploymentFormValue(): EmploymentFormValue {
  return {
    workloadPercentageMin: 100,
    workloadPercentageMax: 100,
    immediately: true,
    duration: EmploymentDuration.PERMANENT,
    workForms: Object.keys(WorkForm).reduce((acc, curr) => {
      acc[curr] = false;
      return acc;
    }, {})
  };
}
