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
  status: WorkEffortStatus;
  createdTime?: string;
  updatedTime?: string;
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
  status: WorkEffortStatus.SENT,
  createdTime: '2019-05-17T13:17:41.981',
  updatedTime: '2019-05-17T13:17:41.981'
};

export const mockedControlPeriods = [
  {
    date: '2019-05-01',
    filePath: 'https://www.google.com',
    status: WorkEffortStatus.EDITED,
    type: WorkEffortType.DURING_UNEMPLOYMENT,
    workEfforts: [
      {
        id: 'some-id-1',
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
        status: WorkEffortStatus.SENT,
        createdTime: '2019-05-17T13:17:41.981',
        updatedTime: '2019-05-17T13:17:41.981'
      },
      {
        id: 'some-id-2',
        company: {
          name: 'Some Company',
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
        occupation: 'Basler Kantonalbank Fachinformatiker',
        ravJob: false,
        results: [WorkEffortResult.INTERVIEW, WorkEffortResult.PENDING],
        workload: WorkEffortWorkload.FULL_TIME,
        status: WorkEffortStatus.EDITED,
        createdTime: '2019-05-20T13:17:41.981',
        updatedTime: '2019-05-20T13:17:41.981'
      },
      {
        id: 'some-id-3',
        company: {
          name: 'Another Company',
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
        occupation: 'Google Big Data Analyst',
        ravJob: false,
        results: [WorkEffortResult.INTERVIEW, WorkEffortResult.EMPLOYED],
        workload: WorkEffortWorkload.FULL_TIME,
        status: WorkEffortStatus.NEW,
        createdTime: '2019-05-22T13:17:41.981',
        updatedTime: '2019-05-22T13:17:41.981'
      }
    ]
  },
  {
    date: '2019-04-01',
    filePath: 'https://www.google.com',
    status: WorkEffortStatus.SENT,
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
        status: WorkEffortStatus.SENT,
        createdTime: '2019-05-17T13:17:41.981',
        updatedTime: '2019-05-17T13:17:41.981'
      }
    ]
  },
  {
    date: '2019-03-01',
    filePath: 'https://www.google.com',
    status: WorkEffortStatus.SENT,
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
        status: WorkEffortStatus.SENT,
        createdTime: '2019-03-17T13:17:41.981',
        updatedTime: '2019-03-17T13:17:41.981'
      }
    ]
  },
  {
    date: '2019-02-01',
    filePath: 'https://www.google.com',
    status: WorkEffortStatus.SENT,
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
        status: WorkEffortStatus.SENT,
        createdTime: '2019-05-17T13:17:41.981',
        updatedTime: '2019-05-17T13:17:41.981'
      }
    ]
  },
  {
    date: '2019-01-01',
    filePath: 'https://www.google.com',
    status: WorkEffortStatus.SENT,
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
        status: WorkEffortStatus.SENT,
        createdTime: '2019-05-17T13:17:41.981',
        updatedTime: '2019-05-17T13:17:41.981'
      }
    ]
  },
  {
    date: '2018-12-01',
    filePath: 'https://www.google.com',
    status: WorkEffortStatus.SENT,
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
        status: WorkEffortStatus.SENT,
        createdTime: '2019-05-17T13:17:41.981',
        updatedTime: '2019-05-17T13:17:41.981'
      }
    ]
  },
  {
    date: '2018-11-01',
    filePath: 'https://www.google.com',
    status: WorkEffortStatus.SENT,
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
        status: WorkEffortStatus.SENT,
        createdTime: '2019-05-17T13:17:41.981',
        updatedTime: '2019-05-17T13:17:41.981'
      }
    ]
  },
  {
    date: '2018-10-01',
    filePath: 'https://www.google.com',
    status: WorkEffortStatus.SENT,
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
        status: WorkEffortStatus.SENT,
        createdTime: '2019-05-17T13:17:41.981',
        updatedTime: '2019-05-17T13:17:41.981'
      }
    ]
  },
  {
    date: '2018-09-01',
    filePath: 'https://www.google.com',
    status: WorkEffortStatus.SENT,
    type: WorkEffortType.DURING_UNEMPLOYMENT,
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
        status: WorkEffortStatus.SENT,
        createdTime: '2019-05-17T13:17:41.981',
        updatedTime: '2019-05-17T13:17:41.981'
      }
    ]
  }
];
