import { Salutation } from '../../../shared/backend-services/shared.types';

export interface ContactFormValue {
  languageIsoCode: string;
  salutation: Salutation;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export function emptyContactFormValue(currentLanguageIsoCode: string): ContactFormValue {
  return {
    languageIsoCode: currentLanguageIsoCode,
    salutation: null,
    firstName: null,
    lastName: null,
    phone: null,
    email: null
  };
}

