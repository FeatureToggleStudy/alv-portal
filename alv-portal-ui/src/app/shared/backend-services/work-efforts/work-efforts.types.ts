import { Company } from '../shared.types';

export interface WorkEffort {
  id?: string;
  date: string;
  form: WorkEffortForm;
  company: WorkEffortCompany;
  occupation: string;
  ravJob: boolean;
  workload: WorkEffortWorkload;
  results: WorkEffortResult[];
}

export interface ControlPeriod {
  id?: string;
  date: string;
  filePath: string;
  workEfforts: WorkEffort[];
  status: WorkEffortStatus;
  type: WorkEffortType;
}

export enum WorkEffortStatus {
  EDITED = 'EDITED',
  SENT = 'SENT',
  NEW = 'NEW'
}

export enum WorkEffortType {
  DURING_UNEMPLOYMENT = 'DURING_UNEMPLOYMENT',
  BEFORE_UNEMPLOYMENT = 'BEFORE_UNEMPLOYMENT'
}

export enum WorkEffortForm {
  ELECTRONIC = 'ELECTRONIC',
  PERSONAL = 'PERSONAL',
  TELEPHONE = 'TELEPHONE',
  MAIL = 'MAIL'
}

export enum WorkEffortWorkload {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME'
}

export enum WorkEffortResult {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  EMPLOYED = 'EMPLOYED',
  INTERVIEW = 'INTERVIEW'
}


export interface WorkEffortCompany extends Company {
  email: string;
  url: string;
  phone: string;
}
