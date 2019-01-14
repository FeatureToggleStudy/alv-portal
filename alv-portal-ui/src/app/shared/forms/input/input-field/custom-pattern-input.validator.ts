import { AbstractControl, ValidatorFn } from '@angular/forms';

export const customPatternInputValidator: (regex: RegExp) => ValidatorFn = (regex) => {
  return (control: AbstractControl) => {

    // TODO possible improvement
    //  maybe compare with existing regex patterns and return specific patternValidator
    //  which can show then the specific error message in validation.service.ts

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
