import { AbstractControl, ValidatorFn } from '@angular/forms';
import { isValidNumber } from 'libphonenumber-js';
import { IsoCountryService } from '../../../localities/iso-country.service';

export function phoneInputValidator(): ValidatorFn {

  return (control: AbstractControl) => {
    if (control.value) {
      if (!isValidNumber(control.value, IsoCountryService.ISO_CODE_SWITZERLAND)) {
        return {
          'phoneValidator': {
            value: control.value,
            country: IsoCountryService.ISO_CODE_SWITZERLAND
          }
        };
      }
    }
    return null;
  };
}
