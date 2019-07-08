export interface WorkEffortsReport {
  id?: string;
  businessCaseId: string;
  controlPeriod: ControlPeriod;
  endDate: string;
  startDate: string;
  firstName: string;
  lastName: string;
  ownerUserId: string;
  personNumber: string;
  workEfforts: WorkEffort[];
  status: WorkEffortsReportStatus;
  nextSubmissionDate: string;
  lastSubmittedAt?: string;
  updatedAt?: string;
  createdAt?: string;
  documentId?: string;
}

export interface WorkEffort {
  id?: string;
  occupation: string;
  applyDate: string;
  applyStatus: WorkEffortApplyStatus[];
  applyChannel: WorkEffortApplyChannel;
  ravAssigned: boolean;
  fullTimeJob: boolean;
  rejectionReason?: string;
  submittedAt?: string; // if null, then edit is possible
  createdAt: string;
}

export interface WorkEffortApplyChannel {
  address: WorkEffortApplyChannelAddress;
  contactPerson: string;
  email: string;
  formUrl: string;
  phone: string;
  types: WorkEffortApplyChannelType[];
}

export interface WorkEffortApplyChannelAddress {
  city: string;
  country: string;
  houseNumber: string;
  name: string;
  poBox: string;
  postalCode: string;
  street: string;
}

export interface ControlPeriod {
  type: ControlPeriodType;
  value: string;
}

export enum WorkEffortsReportStatus {
  CHANGED = 'CHANGED',
  SUBMITTED = 'SUBMITTED',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED' // TODO: no add/edit button for work efforts
}

export enum ControlPeriodType {
  DURING_UNEMPLOYMENT = 'DURING_UNEMPLOYMENT',
  BEFORE_UNEMPLOYMENT = 'BEFORE_UNEMPLOYMENT'
}

export enum WorkEffortApplyChannelType {
  ELECTRONIC = 'ELECTRONIC',
  PERSONAL = 'PERSONAL',
  PHONE = 'PHONE',
  MAIL = 'MAIL'
}

export enum WorkEffortApplyStatus {
  ALL = 'ALL',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  EMPLOYED = 'EMPLOYED',
  INTERVIEW = 'INTERVIEW'
}

export enum WorkEffortsFilterPeriod {
  CURRENT_MONTH = 'CURRENT_MONTH',
  LAST_3_MONTHS = 'LAST_3_MONTHS',
  LAST_6_MONTHS = 'LAST_6_MONTHS',
  LAST_12_MONTHS = 'LAST_12_MONTHS',
  ALL_MONTHS = 'ALL_MONTHS'
}
