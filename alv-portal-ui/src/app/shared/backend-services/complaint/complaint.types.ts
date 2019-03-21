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
  contactLanguage: string;
}

