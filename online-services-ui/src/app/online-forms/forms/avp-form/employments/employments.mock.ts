import { mockAddress1, mockAddress2, mockDocument1, mockFile2, mockPeriod1 } from '../../forms.mock';
import { Employment, EmploymentsModel, SelfEmployment } from './employments.model';

export const mockEmployment1: Employment = {
  period: mockPeriod1,
  employer: 'Mimacom',
  address: mockAddress1,
  docs: [mockDocument1]
};

export const mockEmployment2: Employment = {
  period: mockPeriod1,
  employer: 'Blue Brain Project',
  address: mockAddress2
};

export const mockSelfEmployment1: SelfEmployment = {
  period: mockPeriod1,
  docs: [mockFile2]
};

export const mockMonthlyEmployments: EmploymentsModel = {
  worked: {
    answer: true
  },
  employments: mockEmployment1,
  selfEmployed: true,
  selfEmployment: mockSelfEmployment1,
  labourMarketMeasures: true
};
