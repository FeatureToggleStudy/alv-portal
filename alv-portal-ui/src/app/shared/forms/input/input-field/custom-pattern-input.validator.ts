import { AbstractControl, ValidatorFn } from '@angular/forms';

export const customPatternInputValidator: (regex: RegExp) => ValidatorFn = (regex) => {
  return (control: AbstractControl) => {

    // TODO maybe compare with existing regex patterns and return specific patternValidator
    // TODO which can show then the specific error message in validation.service.ts

    if (control.value && regex) {
      if (!regex.test(control.value)) {
        return {
          'customPatternValidator': {
            value: control.value
          }
        };
      }
    }
    return null;
  };
};
