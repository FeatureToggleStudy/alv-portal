import { PostAddressFormValue } from '../post-address-form/post-address-form-value.types';


export interface ApplicationFormValue {
  formUrl?: string;
  emailAddress?: string;
  phoneNumber?: string;
  postAddress?: PostAddressFormValue;
  additionalInfo: string;
}

export const emptyApplicationFormValue: ApplicationFormValue = {
  additionalInfo: null
};
