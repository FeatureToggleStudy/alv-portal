import { Salutation } from '../../../shared/backend-services/shared.types';

export interface ContactFormValue {
  languageIsoCode: string;
  salutation: Salutation;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export const emptyContactFormValue: ContactFormValue = {
  languageIsoCode: null,
  salutation: null,
  firstName: null,
  lastName: null,
  phone: null,
  email: null
};

