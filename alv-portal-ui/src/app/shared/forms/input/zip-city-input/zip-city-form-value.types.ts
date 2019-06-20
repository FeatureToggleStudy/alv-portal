import { ZipAndCityTypeaheadItem } from '../../../localities/zip-and-city-typeahead-item';
import { ValidatorFn } from '@angular/forms';

export interface ZipCityFormValue {
  zipCityAutoComplete?: ZipAndCityTypeaheadItem;
  zipCode?: string;
  city?: string;
}

type Index = keyof ZipCityFormValue;

export type ZipCityValidators = { [i in Index]: ValidatorFn[] };

export function emptyZipCityFormValue(): ZipCityFormValue {
  return {
    zipCityAutoComplete: null,
  };
}
