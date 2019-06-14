import { Salutation } from '../shared.types';

export interface ComplaintDto {
  jobAdvertisementId: string;
  contactInformation: ContactInformationDto;
  complaintType: ComplaintType;
  complaintMessage: string;
}

export interface ContactInformationDto {
  salutation: Salutation;
  name: string;
  phone: string;
  email: string;
  contactLanguage: string;
}

export enum ComplaintType {
  BRIBE = "BRIBE",
  OFFENSIVE = "OFFENSIVE",
  DISCRIMINATION = "DISCRIMINATION"
}

