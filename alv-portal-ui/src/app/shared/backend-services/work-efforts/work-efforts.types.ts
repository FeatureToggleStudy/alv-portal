import { Company } from '../shared.types';

export interface WorkEffort {
  id?: string;
  date: string;
  applicationForms: WorkEffortApplyChannel[];
  company: WorkEffortCompany;
  occupation: string;
  appliedThroughRav: boolean;
  fullTimeJob: boolean;
  results: WorkEffortResult[];
  rejectionReason?: string;
  submittedAt?: string; // if null, then edit is possible
  updatedAt?: string;
}

export interface WorkEffortsReport {
  id?: string;
  controlPeriod: string; // e.g 2019-05
  documentId: string;
  workEfforts: WorkEffort[];
  status: WorkEffortsReportStatus;
  type: WorkEffortType;
  forecastSubmissionDate: string;
  submittedAt?: string;
  updatedAt?: string;
}

export enum WorkEffortsReportStatus {
  CHANGED = 'CHANGED',
  SUBMITTED = 'SUBMITTED',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED' // TODO: no add/edit button for work efforts
}

export enum WorkEffortType {
  DURING_UNEMPLOYMENT = 'DURING_UNEMPLOYMENT',
  BEFORE_UNEMPLOYMENT = 'BEFORE_UNEMPLOYMENT'
}

export enum WorkEffortApplyChannel {
  ELECTRONIC = 'ELECTRONIC',
  PERSONAL = 'PERSONAL',
  PHONE = 'PHONE',
  MAIL = 'MAIL'
}

export enum WorkEffortResult {
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
  ALL_PAST_MONTHS = 'ALL_PAST_MONTHS'
}

export interface WorkEffortCompany extends Company {
  email: string;
  applyFormUrl: string;
  phone: string;
}

export const mockedWorkEffort: WorkEffort = {
  id: 'some-id',
  date: '2019-05-13',
  company: {
    name: 'SRF - Schweizer Radio und Fernsehen ',
    city: 'Zurich',
    contactPerson: 'Some Dude',
    country: 'CH',
    email: 'mail@address.com',
    houseNumber: '22b',
    phone: '+41 33 322 34 41',
    street: 'Evergreen Terrace',
    applyFormUrl: 'www.example-company.com',
    zipCode: '8098'
  },
  applicationForms: [WorkEffortApplyChannel.PHONE],
  occupation: 'Systemadministrator Informatiker',
  appliedThroughRav: false,
  results: [WorkEffortResult.REJECTED],
  fullTimeJob: true,
  submittedAt: null,
  updatedAt: '2019-05-17T13:17:41.981'
};

export const mockedControlPeriods: WorkEffortsReport[] = [
  {
    controlPeriod: '2019-05',
    documentId: 'some-pdf-document-id',
    status: WorkEffortsReportStatus.CHANGED,
    type: WorkEffortType.DURING_UNEMPLOYMENT,
    forecastSubmissionDate: '2019-06-05',
    submittedAt: null,
    updatedAt: '2019-05-17T13:17:41.981',
    workEfforts: [
      {
        id: 'some-id',
        company: {
          name: 'SRF - Schweizer Radio und Fernsehen ',
          city: 'Zurich',
          contactPerson: 'Some Dude',
          country: 'CH',
          email: 'mail@address.com',
          houseNumber: '22b',
          phone: '+41 33 322 34 41',
          street: 'Evergreen Terrace',
          applyFormUrl: 'www.example-company.com',
          zipCode: '8098'
        },
        date: '2019-05-10',
        applicationForms: [WorkEffortApplyChannel.PHONE],
        occupation: 'Systemadministrator Informatiker',
        appliedThroughRav: false,
        results: [WorkEffortResult.REJECTED],
        fullTimeJob: true,
        submittedAt: null,
        updatedAt: '2019-05-17T13:17:41.981'
      },
      {
        id: 'some-id',
        company: {
          name: 'SRF - Schweizer Radio und Fernsehen ',
          city: 'Zurich',
          contactPerson: 'Some Dude',
          country: 'CH',
          email: 'mail@address.com',
          houseNumber: '22b',
          phone: '+41 33 322 34 41',
          street: 'Evergreen Terrace',
          applyFormUrl: 'www.example-company.com',
          zipCode: '8098'
        },
        date: '2019-05-10',
        applicationForms: [WorkEffortApplyChannel.PHONE],
        occupation: 'Systemadministrator Informatiker',
        appliedThroughRav: false,
        results: [WorkEffortResult.REJECTED],
        fullTimeJob: true,
        submittedAt: null,
        updatedAt: '2019-05-17T13:17:41.981'
      },
      {
        id: 'some-id',
        company: {
          name: 'SRF - Schweizer Radio und Fernsehen ',
          city: 'Zurich',
          contactPerson: 'Some Dude',
          country: 'CH',
          email: 'mail@address.com',
          houseNumber: '22b',
          phone: '+41 33 322 34 41',
          street: 'Evergreen Terrace',
          applyFormUrl: 'www.example-company.com',
          zipCode: '8098'
        },
        date: '2019-05-10',
        applicationForms: [WorkEffortApplyChannel.PHONE],
        occupation: 'Systemadministrator Informatiker',
        appliedThroughRav: false,
        results: [WorkEffortResult.REJECTED],
        fullTimeJob: true,
        submittedAt: null,
        updatedAt: '2019-05-17T13:17:41.981'
      }
    ]
  }
];
