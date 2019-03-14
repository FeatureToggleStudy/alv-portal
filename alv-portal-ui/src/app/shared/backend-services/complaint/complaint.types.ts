import { Salutation } from '../shared.types';

export interface ComplaintDto {
  jobAdvertisementId: string;
  contactInformation: ContactInformationDto;
  complaintMessage: string;
}

export interface ContactInformationDto {
  salutation: Salutation;
  name: string;
  phone: string;
  email: string;
}

export function emptyComplaint(): ComplaintDto {
  return {
    jobAdvertisementId: '',
    contactInformation: emptyContactInformation(),
    complaintMessage: '',
  };
}

export function emptyContactInformation(): ContactInformationDto {
  return {
    salutation: null,
    name: '',
    phone: '',
    email: '',
  };
}


