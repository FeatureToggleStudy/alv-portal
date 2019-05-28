import { Company } from '../shared.types';

export interface WorkEffort {
  id?: string;
  date: string;
  form: WorkEffortForm[];
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

export enum WorkEffortForm {
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

export const mockedWorkEffort = {
  id: 'some-id',
  company: {
    name: 'Example Company',
    city: 'Zurich',
    contactPerson: 'Some Dude',
    country: 'CH',
    email: 'mail@address.com',
    houseNumber: '22b',
    phone: '+41 33 322 34 41',
    street: 'Evergreen Terrace',
    url: 'www.example-company.com',
    zipCode: '8098'
  },
  date: '2019-05-10',
  form: WorkEffortForm.TELEPHONE,
  occupation: 'SRF - Schweizer Radio und Fernsehen Systemadministrator Informatiker',
  ravJob: false,
  results: [WorkEffortResult.REJECTED],
  workload: WorkEffortWorkload.FULL_TIME,
  status: WorkEffortsReportStatus.SENT,
  createdTime: '2019-05-17T13:17:41.981',
  updatedTime: '2019-05-17T13:17:41.981'
};

export const mockedControlPeriods = [
  {
    date: '2019-05-01',
    filePath: 'https://www.google.com',
    status: WorkEffortsReportStatus.EDITED,
    type: WorkEffortType.DURING_UNEMPLOYMENT,
    workEfforts: [
      {
        id: 'some-id-1',
        company: {
          name: 'SRF - Schweizer Radio und Fernsehen',
          city: 'Zurich',
          contactPerson: 'Some Dude',
          country: 'CH',
          email: 'mail@address.com',
          houseNumber: '22b',
          phone: '+41 33 322 34 41',
          street: 'Evergreen Terrace',
          url: 'www.example-company.com',
          zipCode: '8098'
        },
        date: '2019-05-10',
        form: WorkEffortForm.TELEPHONE,
        occupation: 'Systemadministrator Informatiker',
        ravJob: false,
        results: [WorkEffortResult.REJECTED],
        workload: WorkEffortWorkload.FULL_TIME,
        status: WorkEffortsReportStatus.SENT,
        createdTime: '2019-05-17T13:17:41.981',
        updatedTime: '2019-05-17T13:17:41.981'
      },
      {
        id: 'some-id-2',
        company: {
          name: 'Basler Kantonalbank',
          city: 'Zurich',
          contactPerson: 'Another Dude',
          country: 'CH',
          email: 'mail@address.com',
          houseNumber: '22b',
          phone: '+41 33 322 34 41',
          street: 'Evergreen Terrace',
          url: 'www.example-company.com',
          zipCode: '8098'
        },
        date: '2019-05-19',
        form: WorkEffortForm.MAIL,
        occupation: 'Fachinformatiker',
        ravJob: false,
        results: [WorkEffortResult.INTERVIEW, WorkEffortResult.PENDING],
        workload: WorkEffortWorkload.FULL_TIME,
        status: WorkEffortsReportStatus.EDITED,
        createdTime: '2019-05-20T13:17:41.981',
        updatedTime: '2019-05-20T13:17:41.981'
      },
      {
        id: 'some-id-3',
        company: {
          name: 'Google',
          city: 'Zurich',
          contactPerson: 'Random Dude',
          country: 'CH',
          email: 'mail@address.com',
          houseNumber: '22b',
          phone: '+41 33 322 34 41',
          street: 'Evergreen Terrace',
          url: 'www.example-company.com',
          zipCode: '8098'
        },
        date: '2019-05-21',
        form: WorkEffortForm.ELECTRONIC,
        occupation: 'Big Data Analyst',
        ravJob: false,
        results: [WorkEffortResult.INTERVIEW, WorkEffortResult.EMPLOYED],
        workload: WorkEffortWorkload.FULL_TIME,
        status: WorkEffortsReportStatus.NEW,
        createdTime: '2019-05-22T13:17:41.981',
        updatedTime: '2019-05-22T13:17:41.981'
      }
    ]
  },
  {
    date: '2019-04-01',
    filePath: 'https://www.google.com',
    status: WorkEffortsReportStatus.SENT,
    type: WorkEffortType.DURING_UNEMPLOYMENT,
    workEfforts: [
      {
        id: 'some-id-4',
        company: {
          name: 'Example Company',
          city: 'Zurich',
          contactPerson: 'Some Dude',
          country: 'CH',
          email: 'mail@address.com',
          houseNumber: '22b',
          phone: '+41 33 322 34 41',
          street: 'Evergreen Terrace',
          url: 'www.example-company.com',
          zipCode: '8098'
        },
        date: '2019-05-24',
        form: WorkEffortForm.TELEPHONE,
        occupation: 'SRF - Schweizer Radio und Fernsehen Systemadministrator Informatiker',
        ravJob: false,
        results: [WorkEffortResult.REJECTED, WorkEffortResult.EMPLOYED],
        workload: WorkEffortWorkload.FULL_TIME,
        status: WorkEffortsReportStatus.SENT,
        createdTime: '2019-05-17T13:17:41.981',
        updatedTime: '2019-05-17T13:17:41.981'
      }
    ]
  },
  {
    date: '2019-03-01',
    filePath: 'https://www.google.com',
    status: WorkEffortsReportStatus.SENT,
    type: WorkEffortType.DURING_UNEMPLOYMENT,
    workEfforts: [
      {
        id: 'some-id-5',
        company: {
          name: 'Example Company',
          city: 'Zurich',
          contactPerson: 'Some Dude',
          country: 'CH',
          email: 'mail@address.com',
          houseNumber: '22b',
          phone: '+41 33 322 34 41',
          street: 'Evergreen Terrace',
          url: 'www.example-company.com',
          zipCode: '8098'
        },
        date: '2019-03-24',
        form: WorkEffortForm.TELEPHONE,
        occupation: 'SRF - Schweizer Radio und Fernsehen Systemadministrator Informatiker',
        ravJob: false,
        results: [WorkEffortResult.REJECTED, WorkEffortResult.EMPLOYED],
        workload: WorkEffortWorkload.FULL_TIME,
        status: WorkEffortsReportStatus.SENT,
        createdTime: '2019-03-17T13:17:41.981',
        updatedTime: '2019-03-17T13:17:41.981'
      }
    ]
  },
  {
    date: '2019-02-01',
    filePath: 'https://www.google.com',
    status: WorkEffortsReportStatus.SENT,
    type: WorkEffortType.DURING_UNEMPLOYMENT,
    workEfforts: [
      {
        id: 'some-id-6',
        company: {
          name: 'Example Company',
          city: 'Zurich',
          contactPerson: 'Some Dude',
          country: 'CH',
          email: 'mail@address.com',
          houseNumber: '22b',
          phone: '+41 33 322 34 41',
          street: 'Evergreen Terrace',
          url: 'www.example-company.com',
          zipCode: '8098'
        },
        date: '2019-02-04',
        form: WorkEffortForm.TELEPHONE,
        occupation: 'SRF - Schweizer Radio und Fernsehen Systemadministrator Informatiker',
        ravJob: false,
        results: [WorkEffortResult.REJECTED, WorkEffortResult.EMPLOYED],
        workload: WorkEffortWorkload.FULL_TIME,
        status: WorkEffortsReportStatus.SENT,
        createdTime: '2019-05-17T13:17:41.981',
        updatedTime: '2019-05-17T13:17:41.981'
      }
    ]
  },
  {
    date: '2019-01-01',
    filePath: 'https://www.google.com',
    status: WorkEffortsReportStatus.SENT,
    type: WorkEffortType.DURING_UNEMPLOYMENT,
    workEfforts: [
      {
        id: 'some-id-7',
        company: {
          name: 'Example Company',
          city: 'Zurich',
          contactPerson: 'Some Dude',
          country: 'CH',
          email: 'mail@address.com',
          houseNumber: '22b',
          phone: '+41 33 322 34 41',
          street: 'Evergreen Terrace',
          url: 'www.example-company.com',
          zipCode: '8098'
        },
        date: '2019-01-25',
        form: WorkEffortForm.TELEPHONE,
        occupation: 'SRF - Schweizer Radio und Fernsehen Systemadministrator Informatiker',
        ravJob: false,
        results: [WorkEffortResult.REJECTED, WorkEffortResult.EMPLOYED],
        workload: WorkEffortWorkload.FULL_TIME,
        status: WorkEffortsReportStatus.SENT,
        createdTime: '2019-05-17T13:17:41.981',
        updatedTime: '2019-05-17T13:17:41.981'
      }
    ]
  },
  {
    date: '2018-12-01',
    filePath: 'https://www.google.com',
    status: WorkEffortsReportStatus.SENT,
    type: WorkEffortType.DURING_UNEMPLOYMENT,
    workEfforts: [
      {
        id: 'some-id-8',
        company: {
          name: 'Example Company',
          city: 'Zurich',
          contactPerson: 'Some Dude',
          country: 'CH',
          email: 'mail@address.com',
          houseNumber: '22b',
          phone: '+41 33 322 34 41',
          street: 'Evergreen Terrace',
          url: 'www.example-company.com',
          zipCode: '8098'
        },
        date: '2018-11-01',
        form: WorkEffortForm.TELEPHONE,
        occupation: 'SRF - Schweizer Radio und Fernsehen Systemadministrator Informatiker',
        ravJob: false,
        results: [WorkEffortResult.REJECTED, WorkEffortResult.EMPLOYED],
        workload: WorkEffortWorkload.FULL_TIME,
        status: WorkEffortsReportStatus.SENT,
        createdTime: '2019-05-17T13:17:41.981',
        updatedTime: '2019-05-17T13:17:41.981'
      }
    ]
  },
  {
    date: '2018-11-01',
    filePath: 'https://www.google.com',
    status: WorkEffortsReportStatus.SENT,
    type: WorkEffortType.DURING_UNEMPLOYMENT,
    workEfforts: [
      {
        id: 'some-id-9',
        company: {
          name: 'Example Company',
          city: 'Zurich',
          contactPerson: 'Some Dude',
          country: 'CH',
          email: 'mail@address.com',
          houseNumber: '22b',
          phone: '+41 33 322 34 41',
          street: 'Evergreen Terrace',
          url: 'www.example-company.com',
          zipCode: '8098'
        },
        date: '2018-11-24',
        form: WorkEffortForm.TELEPHONE,
        occupation: 'SRF - Schweizer Radio und Fernsehen Systemadministrator Informatiker',
        ravJob: false,
        results: [WorkEffortResult.REJECTED, WorkEffortResult.EMPLOYED],
        workload: WorkEffortWorkload.FULL_TIME,
        status: WorkEffortsReportStatus.SENT,
        createdTime: '2019-05-17T13:17:41.981',
        updatedTime: '2019-05-17T13:17:41.981'
      }
    ]
  },
  {
    date: '2018-10-01',
    filePath: 'https://www.google.com',
    status: WorkEffortsReportStatus.SENT,
    type: WorkEffortType.DURING_UNEMPLOYMENT,
    workEfforts: [
      {
        id: 'some-id-10',
        company: {
          name: 'Example Company',
          city: 'Zurich',
          contactPerson: 'Some Dude',
          country: 'CH',
          email: 'mail@address.com',
          houseNumber: '22b',
          phone: '+41 33 322 34 41',
          street: 'Evergreen Terrace',
          url: 'www.example-company.com',
          zipCode: '8098'
        },
        date: '2018-10-24',
        form: WorkEffortForm.TELEPHONE,
        occupation: 'SRF - Schweizer Radio und Fernsehen Systemadministrator Informatiker',
        ravJob: false,
        results: [WorkEffortResult.REJECTED, WorkEffortResult.EMPLOYED],
        workload: WorkEffortWorkload.FULL_TIME,
        status: WorkEffortsReportStatus.SENT,
        createdTime: '2019-05-17T13:17:41.981',
        updatedTime: '2019-05-17T13:17:41.981'
      }
    ]
  },
  {
    date: '2018-09-01',
    filePath: 'https://www.google.com',
    status: WorkEffortsReportStatus.SENT,
    type: WorkEffortType.BEFORE_UNEMPLOYMENT,
    workEfforts: [
      {
        id: 'some-id-11',
        company: {
          name: 'Example Company',
          city: 'Zurich',
          contactPerson: 'Some Dude',
          country: 'CH',
          email: 'mail@address.com',
          houseNumber: '22b',
          phone: '+41 33 322 34 41',
          street: 'Evergreen Terrace',
          url: 'www.example-company.com',
          zipCode: '8098'
        },
        date: '2018-09-14',
        form: WorkEffortForm.TELEPHONE,
        occupation: 'SRF - Schweizer Radio und Fernsehen Systemadministrator Informatiker',
        ravJob: false,
        results: [WorkEffortResult.REJECTED, WorkEffortResult.EMPLOYED],
        workload: WorkEffortWorkload.FULL_TIME,
        status: WorkEffortsReportStatus.SENT,
        createdTime: '2019-05-17T13:17:41.981',
        updatedTime: '2019-05-17T13:17:41.981'
      }
    ]
  }
];
