import { Salutation } from '../../../../shared/backend-services/shared.types';

export interface PublicContactFormValue {
  salutation: Salutation;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export function emptyPublicContactFormValue(): PublicContactFormValue {
  return {
    salutation: null,
    firstName: null,
    lastName: null,
    phone: null,
    email: null
  };
}

