import { AbstractControl, ValidatorFn } from '@angular/forms';
import { EMAIL_REGEX, HOUSE_NUMBER_REGEX } from '../../regex-patterns';

export const patternInputValidator: (regex: RegExp) => ValidatorFn = (regex) => {
  return (control: AbstractControl) => {

    // TODO check
    //  maybe compare with existing regex patterns and return specific patternValidator
    //  which can show then the specific error message in validation.service.ts
    if(control.value && regex) {
      if (!regex.test(control.value)) {
        switch (String(regex)) {
          case String(EMAIL_REGEX):
            return {
              'emailValidator': {
                value: control.value
              }
            };
          case String(HOUSE_NUMBER_REGEX):
            return {
              'houseNumValidator': {
                value: control.value
              }
            };
          default:
            return {
              'defaultPatternValidator': {
                value: control.value
              }
            };
        }
      }
    }
    return null;
  };
};
