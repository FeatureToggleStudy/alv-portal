import { AbstractControl, ValidatorFn } from '@angular/forms';
import { isValidNumber } from 'libphonenumber-js';
import { IsoCountryService } from '../../../localities/iso-country.service';
import { EMAIL_REGEX } from '../../regex-patterns';

export function emailInputValidator(): ValidatorFn {

  return (control: AbstractControl) => {
    if (control.value) {
      const emailParts = control.value.split('@');
      if (emailParts[0].length > 64 || !EMAIL_REGEX.test(control.value)) {
        return {
          'emailValidator': {
            value: control.value
          }
        };
      }
    }
    return null;
  };
}
