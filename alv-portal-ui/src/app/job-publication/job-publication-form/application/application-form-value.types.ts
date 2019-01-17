import { PostAddressFormValue } from '../post-address-form/post-address-form-value.types';


export interface ApplicationFormValue {
  formUrl: string;
  emailAddress: string;
  phoneNumber: string;
  postAddress: PostAddressFormValue;
  additionalInfo: string;
}

export const emptyApplicationFormValue: ApplicationFormValue = {
  formUrl: null,
  emailAddress: null,
  phoneNumber: null,
  postAddress: null,
  additionalInfo: null
};
