import { AbsenceReason, AbsencesModel } from './absences.model';
import { mockDocument1, mockPeriod1, mockPeriod2, mockPeriod3 } from '../../forms.mock';


export const mockAbsences: AbsencesModel = {
  away: false,
  absences: [
    {
      period: mockPeriod1,
      reason: AbsenceReason.VACATION,
      scans: [mockDocument1]
    },
    {
      period: mockPeriod2,
      reason: AbsenceReason.MILITARY,

    },
    {
      period: mockPeriod3,
      reason: AbsenceReason.OTHER,
      note: 'I was feeding whales in Antarctica'
    }
  ]
};
