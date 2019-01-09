import { AbstractControl, ValidatorFn } from '@angular/forms';
import { isValidNumber } from 'libphonenumber-js';

export const defaultPhoneCountry = 'CH';

export const phoneInputValidator: () => ValidatorFn = () => {
  return (control: AbstractControl) => {

    if (control.value) {
      if (!isValidNumber(control.value, defaultPhoneCountry)) {
        return {
          'phoneValidator': {
            value: control.value,
            country: defaultPhoneCountry
          }
        };
      }
    }
    return null;
  };
};
