import {
  mapToWorkEffortBackendValue,
  mapToWorkEffortFormValue,
  WorkEffortFormValue,
  WorkLoadFormOption
} from './work-effort-form.mapper';
import {
  WorkEffort,
  WorkEffortApplyChannel,
  WorkEffortResult
} from '../../../shared/backend-services/work-efforts/work-efforts.types';

const mockedWorkEffortBackend: WorkEffort = {
  date: "2019-07-12T22:00:00.000Z",
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
    postalCode: '8098',
    postOfficeBoxNumber: ''
  },
  applicationForms: [WorkEffortApplyChannel.PHONE],
  occupation: 'Systemadministrator Informatiker',
  appliedThroughRav: false,
  results: [WorkEffortResult.REJECTED],
  fullTimeJob: true,
  rejectionReason: 'bad breath'
};

const mockWorkEffortFormValue: WorkEffortFormValue = {
  date: {
    year: 2019,
    month: 7,
    day: 13
  },
  companyName: 'SRF - Schweizer Radio und Fernsehen ',
  companyAddress: {
    city: 'Zurich',
    postalCode: '8098',
    postOfficeBoxNumberOrStreet: {
      houseNumber: '22b',
      street: 'Evergreen Terrace',
      postOfficeBoxNumber: '',
    },
    countryIsoCode: 'CH',
  },
  appliedThroughRav: false,
  results: {
    EMPLOYED: false,
    REJECTED: true,
    INTERVIEW: false,
    PENDING: false
  },
  applyChannels: {
    ELECTRONIC: false,
    MAIL: false,
    PHONE: true,
    PERSONAL: false
  },
  phone: '+41 33 322 34 41',
  companyEmailAndUrl: {
    email: 'mail@address.com',
    url: 'www.example-company.com'
  },
  rejectionReason: 'bad breath',
  occupation: 'Systemadministrator Informatiker',
  workload: WorkLoadFormOption.FULLTIME,
  contactPerson: 'Some Dude',
};

describe('Work Effort Form mappers', () => {
  it('should convert work effort -> form value', () => {
    expect(mapToWorkEffortFormValue(mockedWorkEffortBackend)).toEqual(mockWorkEffortFormValue);
  });
  it('should convert form value -> work effort', () => {
    expect(mapToWorkEffortBackendValue(mockWorkEffortFormValue)).toEqual(mockedWorkEffortBackend);
  });
});
