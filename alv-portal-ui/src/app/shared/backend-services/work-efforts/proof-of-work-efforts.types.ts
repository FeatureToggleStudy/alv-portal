export interface WorkEffortsReport {
  id?: string;
  businessCaseId: string;
  controlPeriod: ControlPeriod;
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
  endDate: string;
  startDate: string;
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

/*
export const mockedWorkEffort: WorkEffort = {
  id: 'some-id',
  applyDate: '2019-05-13',
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
  applicationForms: [WorkEffortApplyChannelType.PHONE],
  occupation: 'Systemadministrator Informatiker',
  ravAssigned: false,
  applyStatus: [WorkEffortApplyStatus.REJECTED],
  fullTimeJob: true,
  submittedAt: null,
  updatedAt: '2019-05-17T13:17:41.981'
};

const nextSubmissionDate = new Date();
nextSubmissionDate.setDate(nextSubmissionDate.getDate() + 1);
nextSubmissionDate.setHours(23, 59, 59, 0);


export const mockedControlPeriods: WorkEffortsReport[] = [
  {
    controlPeriod: '2019-05',
    documentId: 'some-pdf-document-id',
    status: WorkEffortsReportStatus.CHANGED,
    type: ControlPeriodType.DURING_UNEMPLOYMENT,
    nextSubmissionDate: '2019-06-05T23:59:59.999',
    lastSubmittedAt: null,
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
        applyDate: '2019-05-10',
        applicationForms: [WorkEffortApplyChannelType.PHONE],
        occupation: 'Systemadministrator Informatiker',
        ravAssigned: false,
        applyStatus: [WorkEffortApplyStatus.PENDING],
        fullTimeJob: true,
        lastSubmittedAt: null,
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
        applyDate: '2019-05-10',
        applicationForms: [WorkEffortApplyChannelType.PHONE],
        occupation: 'Systemadministrator Informatiker',
        ravAssigned: false,
        applyStatus: [WorkEffortApplyStatus.INTERVIEW, WorkEffortApplyStatus.REJECTED],
        fullTimeJob: true,
        lastSubmittedAt: null,
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
        applyDate: '2019-05-10',
        applicationForms: [WorkEffortApplyChannelType.PHONE],
        occupation: 'Systemadministrator Informatiker',
        ravAssigned: false,
        applyStatus: [WorkEffortApplyStatus.REJECTED],
        fullTimeJob: true,
        lastSubmittedAt: null,
        updatedAt: '2019-05-17T13:17:41.981'
      }
    ]
  },
  {
    controlPeriod: '2019-04',
    documentId: 'some-pdf-document-id-2',
    status: WorkEffortsReportStatus.SUBMITTED,
    type: ControlPeriodType.DURING_UNEMPLOYMENT,
    nextSubmissionDate: '2019-06-05T23:59:59.999',
    lastSubmittedAt: '2019-05-05T23:59:59.999',
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
        applyDate: '2019-04-30',
        applicationForms: [WorkEffortApplyChannelType.PHONE],
        occupation: 'Systemadministrator Informatiker',
        ravAssigned: false,
        applyStatus: [WorkEffortApplyStatus.EMPLOYED],
        fullTimeJob: true,
        lastSubmittedAt: '2019-05-05T23:59:59.999',
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
        applyDate: '2019-05-02',
        applicationForms: [WorkEffortApplyChannelType.PHONE],
        occupation: 'Systemadministrator Informatiker',
        ravAssigned: false,
        applyStatus: [WorkEffortApplyStatus.INTERVIEW],
        fullTimeJob: true,
        lastSubmittedAt: '2019-05-05T23:59:59.999',
        updatedAt: '2019-05-17T13:17:41.981'
      }
    ]
  },
  {
    controlPeriod: '2019-03',
    documentId: 'some-pdf-document-id-3',
    status: WorkEffortsReportStatus.CHANGED,
    type: ControlPeriodType.DURING_UNEMPLOYMENT,
    nextSubmissionDate: nextSubmissionDate.toISOString(),
    lastSubmittedAt: '2019-05-05T23:59:59.999',
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
        applyDate: '2019-03-20',
        applicationForms: [WorkEffortApplyChannelType.PHONE],
        occupation: 'Systemadministrator Informatiker',
        ravAssigned: false,
        applyStatus: [WorkEffortApplyStatus.EMPLOYED],
        fullTimeJob: true,
        lastSubmittedAt: null,
        updatedAt: '2019-03-17T13:17:41.981'
      }
    ]
  },
  {
    controlPeriod: '2019-02',
    documentId: 'some-pdf-document-id-3',
    status: WorkEffortsReportStatus.CLOSED,
    type: ControlPeriodType.DURING_UNEMPLOYMENT,
    nextSubmissionDate: '2019-06-05T23:59:59.999',
    lastSubmittedAt: '2019-05-05T23:59:59.999',
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
        applyDate: '2019-04-30',
        applicationForms: [WorkEffortApplyChannelType.PHONE],
        occupation: 'Systemadministrator Informatiker',
        ravAssigned: false,
        applyStatus: [WorkEffortApplyStatus.EMPLOYED],
        fullTimeJob: true,
        lastSubmittedAt: '2019-05-05T23:59:59.999',
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
        applyDate: '2019-05-02',
        applicationForms: [WorkEffortApplyChannelType.PHONE],
        occupation: 'Systemadministrator Informatiker',
        ravAssigned: false,
        applyStatus: [WorkEffortApplyStatus.INTERVIEW],
        fullTimeJob: true,
        lastSubmittedAt: '2019-05-05T23:59:59.999',
        updatedAt: '2019-05-17T13:17:41.981'
      }
    ]
  }
];
*/
