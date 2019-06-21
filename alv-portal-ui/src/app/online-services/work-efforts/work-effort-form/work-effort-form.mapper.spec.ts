import { mapToWorkEffortBackendValue, mapToWorkEffortFormValue, } from './work-effort-form.mapper';
import {
  WorkEffort,
  WorkEffortApplyChannelType,
  WorkEffortApplyStatus
} from '../../../shared/backend-services/work-efforts/proof-of-work-efforts.types';
import { WorkEffortFormValue, WorkLoadFormOption } from './work-effort-form.types';

const mockedWorkEffortBackend: WorkEffort = {
  applyDate: '2019-07-13',
  applyChannel: {
    address: {
      name: 'SRF - Schweizer Radio und Fernsehen ',
      city: 'Zurich',
      postalCode: '8098',
      street: 'Evergreen Terrace',
      houseNumber: '22b',
      country: 'CH',
      poBox: ''
    },
    contactPerson: 'Some Dude',
    formUrl: 'www.example-company.com',
    email: 'mail@address.com',
    phone: '+41 33 322 34 41',
    types: [WorkEffortApplyChannelType.PHONE]
  },
  occupation: 'Systemadministrator Informatiker',
  ravAssigned: false,
  applyStatus: [WorkEffortApplyStatus.REJECTED],
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
    zipAndCity: {
      city: 'Zurich',
      zipCode: '8098',
      zipCityAutoComplete: null
    },
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
