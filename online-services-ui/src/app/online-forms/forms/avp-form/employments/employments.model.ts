import { Address, Document, File, Period } from '../../forms.model';

export interface Employment {
  period: Period;
  employer: string;
  address: Address;
  docs?: Document[];
}

export interface SelfEmployment {
  period: Period;
  docs: File[];
}

export interface YesNoQuestion {
  answer: boolean;
}

export interface EmploymentsModel {
  worked: YesNoQuestion;
  employments: Employment;
  selfEmployed: boolean;
  selfEmployment: SelfEmployment;
  labourMarketMeasures: boolean;
}


