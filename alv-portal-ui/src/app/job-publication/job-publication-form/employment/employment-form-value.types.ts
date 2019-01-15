import {
  EmploymentDuration,
  WorkForm
} from '../../../shared/backend-services/shared.types';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export interface EmploymentFormValue {
  workloadPercentageMin: number;
  workloadPercentageMax: number;
  immediately: boolean;
  duration: EmploymentDuration;
  startDate: NgbDate;
  endDate: NgbDate;
  workForms: {[p: string]: boolean};
}

export const emptyEmploymentFormValue: EmploymentFormValue = {
  workloadPercentageMin: 100,
  workloadPercentageMax: 100,
  immediately: true,
  duration: EmploymentDuration.PERMANENT,
  startDate: null,
  endDate: null,
  workForms: Object.keys(WorkForm).reduce((acc, curr) => {
    acc[curr] = false;
    return acc;
  }, {})
};
