import { AbstractControl, ValidatorFn } from '@angular/forms';
import {
  EMAIL_REGEX,
  HOUSE_NUMBER_REGEX,
  PERSON_NUMBER_REGEX,
  POSITIVE_INTEGER_REGEX,
  URL_REGEX
} from '../../regex-patterns';

export function patternInputValidator(regex: RegExp): ValidatorFn {
  return (control: AbstractControl) => {

    if (control.value && regex) {
      if (!regex.test(control.value)) {
        switch (String(regex)) {
          case String(HOUSE_NUMBER_REGEX):
            return {
              'houseNumValidator': {
                value: control.value
              }
            };
          case String(URL_REGEX):
            return {
              'urlValidator': {
                value: control.value
              }
            };
          case String(PERSON_NUMBER_REGEX):
            return {
              'personNumber': {
                value: control.value
              }
            };
          case String(POSITIVE_INTEGER_REGEX):
            return {
              'positiveIntegerValidator': {
                value: control.value
              }
            };
          default:
            return {
              'pattern': {
                value: control.value
              }
            };
        }
      }
    }
    return null;
  };
}
