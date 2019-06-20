import { ZipAndCityTypeaheadItem } from '../../../localities/zip-and-city-typeahead-item';
import { ValidatorFn } from '@angular/forms';

export interface ZipCityFormValue {
  zipCityAutoComplete?: ZipAndCityTypeaheadItem;
  zipCode?: string;
  city?: string;
}

type Index = keyof ZipCityFormValue;

//todo this type is not strong enough, but helps with autocompletion
export type ZipCityValidators = { [i in Index]: ValidatorFn[] }


export function emptyZipCityFormValue() {
  return {
    zipCityAutoComplete: null,
  };
}
