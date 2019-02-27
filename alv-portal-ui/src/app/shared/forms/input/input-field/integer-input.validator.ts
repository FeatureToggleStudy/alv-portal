import { AbstractControl, ValidatorFn } from '@angular/forms';

export function integerValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    if (!Number.isInteger(Number(control.value))) {
      return {
        integerValidator: true
      };
    }
    return null;
  };
}
