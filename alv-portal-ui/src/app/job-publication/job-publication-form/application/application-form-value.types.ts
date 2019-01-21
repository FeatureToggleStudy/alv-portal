import { PostAddressFormValue } from '../post-address-form/post-address-form-value.types';


export interface ApplicationFormValue {
  formUrl?: string;
  emailAddress?: string;
  phoneNumber?: string;
  postAddress?: PostAddressFormValue;
  additionalInfo: string;
  selectedApplicationTypes: { [p: string]: boolean };
}

export const emptyApplicationFormValue: ApplicationFormValue = {
  additionalInfo: null,
  selectedApplicationTypes: {
    form: false,
    email: false,
    phone: false,
    post: false,
  }
};
