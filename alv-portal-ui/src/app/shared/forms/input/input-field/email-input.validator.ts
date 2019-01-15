import { AbstractControl, ValidatorFn } from '@angular/forms';
import {EMAIL_REGEX} from '../../regex-patterns';

export const emailInputValidator: () => ValidatorFn = () => {
  return (control: AbstractControl) => {

    if (control.value) {
      if (!EMAIL_REGEX.test(control.value)) {
        return {
          'emailValidator': {
            value: control.value
          }
        };
      }
    }
    return null;
  };
};
