import { Document, Period } from '../../forms.model';

export enum AbsenceReason {
  VACATION = 'VACATION',
  MILITARY = 'MILITARY',
  OTHER = 'OTHER'

}
export interface AbsencePeriod {
  period: Period;
  reason: AbsenceReason;
  scans?: Document[];
  note?: string;
}

export interface AbsencesModel {
  away: boolean;
  absences?: Array<AbsencePeriod>;
}
