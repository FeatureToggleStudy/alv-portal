import {RegistrationStatus} from '../../../core/auth/user.model';

export interface CompanyContactTemplate {
  companyId: string;
  companyName: string;
  companyStreet: string;
  companyHouseNr: string;
  companyZipCode: string;
  companyCity: string;
  phone: string;
  email: string;
  salutation: string;
}

export interface Accountability {
  companyId: string;
  companyName: string;
  companyExternalId: string;
}

export interface UserInfoDTO {
  id: string;
  userExternalId: string;
  firstName: string;
  lastName: string;
  email: string;
  registrationStatus: RegistrationStatus;
  accountabilities: Array<{ // TODO use Accountability interface ??
    companyName: string,
    companyExternalId: string,
    companySource: string
  }>;
  createdAt: Date;
  modifiedAt: Date;
  lastLoginAt: Date;
  stesInformation: {
    personNumber: string,
    verificationType: string,
    verifiedAt: Date
  };
}
