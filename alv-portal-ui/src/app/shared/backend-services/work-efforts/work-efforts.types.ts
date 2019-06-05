import { Company } from '../job-advertisement/job-advertisement.types';

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
  ALL_MONTHS = 'ALL_MONTHS'
}

export interface WorkEffortCompany extends Company {
  applyFormUrl: string;
  contactPerson: string;
}

export const mockedWorkEffort: WorkEffort = {
  id: 'some-id',
  date: '2019-05-13',
  company: {
    name: 'SRF - Schweizer Radio und Fernsehen ',
    city: 'Zurich',
    contactPerson: 'Some Dude',
    countryIsoCode: 'CH',
    email: 'mail@address.com',
    houseNumber: '22b',
    phone: '+41 33 322 34 41',
    street: 'Evergreen Terrace',
    applyFormUrl: 'www.example-company.com',
    postalCode: '8098'
  },
  applicationForms: [WorkEffortApplyChannel.PHONE],
  occupation: 'Systemadministrator Informatiker',
  appliedThroughRav: false,
  results: [WorkEffortResult.REJECTED],
  fullTimeJob: true,
  submittedAt: null,
  updatedAt: '2019-05-17T13:17:41.981'
};

const forecastSubmissionDate = new Date();
forecastSubmissionDate.setDate(forecastSubmissionDate.getDate() + 1);
forecastSubmissionDate.setHours(23, 59, 59, 0);

export const mockedControlPeriods: WorkEffortsReport[] = [
  {
    controlPeriod: '2019-05',
    documentId: 'some-pdf-document-id',
    status: WorkEffortsReportStatus.CHANGED,
    type: WorkEffortType.DURING_UNEMPLOYMENT,
    forecastSubmissionDate: '2019-06-05T23:59:59.999',
    submittedAt: null,
    updatedAt: '2019-05-17T13:17:41.981',
    workEfforts: [
      {
        id: 'some-id-1',
        company: {
          name: 'SRF - Schweizer Radio und Fernsehen ',
          city: 'Zurich',
          contactPerson: 'Some Dude',
          countryIsoCode: 'CH',
          email: 'mail@address.com',
          houseNumber: '22b',
          phone: '+41 33 322 34 41',
          street: 'Evergreen Terrace',
          applyFormUrl: 'www.example-company.com',
          postalCode: '8098'
        },
        date: '2019-05-10',
        applicationForms: [WorkEffortApplyChannel.PHONE],
        occupation: 'Systemadministrator Informatiker',
        appliedThroughRav: false,
        results: [WorkEffortResult.PENDING],
        fullTimeJob: true,
        submittedAt: null,
        updatedAt: '2019-05-17T13:17:41.981'
      },
      {
        id: 'some-id-2',
        company: {
          name: 'SRF - Schweizer Radio und Fernsehen ',
          city: 'Zurich',
          contactPerson: 'Some Dude',
          countryIsoCode: 'CH',
          email: 'mail@address.com',
          houseNumber: '22b',
          phone: '+41 33 322 34 41',
          street: 'Evergreen Terrace',
          applyFormUrl: 'www.example-company.com',
          postalCode: '8098'
        },
        date: '2019-05-10',
        applicationForms: [WorkEffortApplyChannel.PHONE],
        occupation: 'Systemadministrator Informatiker',
        appliedThroughRav: false,
        results: [WorkEffortResult.INTERVIEW, WorkEffortResult.REJECTED],
        fullTimeJob: true,
        submittedAt: null,
        updatedAt: '2019-05-17T13:17:41.981'
      },
      {
        id: 'some-id-3',
        company: {
          name: 'SRF - Schweizer Radio und Fernsehen ',
          city: 'Zurich',
          contactPerson: 'Some Dude',
          countryIsoCode: 'CH',
          email: 'mail@address.com',
          houseNumber: '22b',
          phone: '+41 33 322 34 41',
          street: 'Evergreen Terrace',
          applyFormUrl: 'www.example-company.com',
          postalCode: '8098'
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
  },
  {
    controlPeriod: '2019-04',
    documentId: 'some-pdf-document-id-2',
    status: WorkEffortsReportStatus.SUBMITTED,
    type: WorkEffortType.DURING_UNEMPLOYMENT,
    forecastSubmissionDate: '2019-06-05T23:59:59.999',
    submittedAt: '2019-05-05T23:59:59.999',
    updatedAt: '2019-05-02T13:17:41.981',
    workEfforts: [
      {
        id: 'some-id-4',
        company: {
          name: 'SRF - Schweizer Radio und Fernsehen',
          city: 'Zurich',
          contactPerson: 'Some Dude',
          countryIsoCode: 'CH',
          email: 'mail@address.com',
          houseNumber: '22b',
          phone: '+41 33 322 34 41',
          street: 'Evergreen Terrace',
          applyFormUrl: 'www.example-company.com',
          postalCode: '8098'
        },
        date: '2019-04-30',
        applicationForms: [WorkEffortApplyChannel.PHONE],
        occupation: 'Systemadministrator Informatiker',
        appliedThroughRav: false,
        results: [WorkEffortResult.EMPLOYED],
        fullTimeJob: true,
        submittedAt: '2019-05-05T23:59:59.999',
        updatedAt: '2019-05-17T13:17:41.981'
      },
      {
        id: 'some-id-5',
        company: {
          name: 'SRF - Schweizer Radio und Fernsehen ',
          city: 'Zurich',
          contactPerson: 'Some Dude',
          countryIsoCode: 'CH',
          email: 'mail@address.com',
          houseNumber: '22b',
          phone: '+41 33 322 34 41',
          street: 'Evergreen Terrace',
          applyFormUrl: 'www.example-company.com',
          postalCode: '8098'
        },
        date: '2019-05-02',
        applicationForms: [WorkEffortApplyChannel.PHONE],
        occupation: 'Systemadministrator Informatiker',
        appliedThroughRav: false,
        results: [WorkEffortResult.INTERVIEW],
        fullTimeJob: true,
        submittedAt: '2019-05-05T23:59:59.999',
        updatedAt: '2019-05-17T13:17:41.981'
      }
    ]
  },
  {
    controlPeriod: '2019-03',
    documentId: 'some-pdf-document-id-3',
    status: WorkEffortsReportStatus.CHANGED,
    type: WorkEffortType.DURING_UNEMPLOYMENT,
    forecastSubmissionDate: forecastSubmissionDate.toISOString(),
    submittedAt: '2019-05-05T23:59:59.999',
    updatedAt: '2019-05-02T13:17:41.981',
    workEfforts: [
      {
        id: 'some-id-6',
        company: {
          name: 'SRF - Schweizer Radio und Fernsehen',
          city: 'Zurich',
          contactPerson: 'Some Dude',
          countryIsoCode: 'CH',
          email: 'mail@address.com',
          houseNumber: '22b',
          phone: '+41 33 322 34 41',
          street: 'Evergreen Terrace',
          applyFormUrl: 'www.example-company.com',
          postalCode: '8098'
        },
        date: '2019-03-20',
        applicationForms: [WorkEffortApplyChannel.PHONE],
        occupation: 'Systemadministrator Informatiker',
        appliedThroughRav: false,
        results: [WorkEffortResult.EMPLOYED],
        fullTimeJob: true,
        submittedAt: null,
        updatedAt: '2019-03-17T13:17:41.981'
      }
    ]
  },
  {
    controlPeriod: '2019-02',
    documentId: 'some-pdf-document-id-3',
    status: WorkEffortsReportStatus.CLOSED,
    type: WorkEffortType.DURING_UNEMPLOYMENT,
    forecastSubmissionDate: '2019-06-05T23:59:59.999',
    submittedAt: '2019-05-05T23:59:59.999',
    updatedAt: '2019-05-02T13:17:41.981',
    workEfforts: [
      {
        id: 'some-id-7',
        company: {
          name: 'SRF - Schweizer Radio und Fernsehen',
          city: 'Zurich',
          contactPerson: 'Some Dude',
          countryIsoCode: 'CH',
          email: 'mail@address.com',
          houseNumber: '22b',
          phone: '+41 33 322 34 41',
          street: 'Evergreen Terrace',
          applyFormUrl: 'www.example-company.com',
          postalCode: '8098'
        },
        date: '2019-04-30',
        applicationForms: [WorkEffortApplyChannel.PHONE],
        occupation: 'Systemadministrator Informatiker',
        appliedThroughRav: false,
        results: [WorkEffortResult.EMPLOYED],
        fullTimeJob: true,
        submittedAt: '2019-05-05T23:59:59.999',
        updatedAt: '2019-05-17T13:17:41.981'
      },
      {
        id: 'some-id-8',
        company: {
          name: 'SRF - Schweizer Radio und Fernsehen ',
          city: 'Zurich',
          contactPerson: 'Some Dude',
          countryIsoCode: 'CH',
          email: 'mail@address.com',
          houseNumber: '22b',
          phone: '+41 33 322 34 41',
          street: 'Evergreen Terrace',
          applyFormUrl: 'www.example-company.com',
          postalCode: '8098'
        },
        date: '2019-05-02',
        applicationForms: [WorkEffortApplyChannel.PHONE],
        occupation: 'Systemadministrator Informatiker',
        appliedThroughRav: false,
        results: [WorkEffortResult.INTERVIEW],
        fullTimeJob: true,
        submittedAt: '2019-05-05T23:59:59.999',
        updatedAt: '2019-05-17T13:17:41.981'
      }
    ]
  }
];
