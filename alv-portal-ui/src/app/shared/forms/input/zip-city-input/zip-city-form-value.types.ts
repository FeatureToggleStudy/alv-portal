import { ZipAndCityTypeaheadItem } from '../../../localities/zip-and-city-typeahead-item';

export interface ZipCityFormValue {
  zipCityAutoComplete?: ZipAndCityTypeaheadItem;
  zipCode?: string;
  city?: string;
}

export function emptyZipCityFormValue() {
  return {
    zipCityAutoComplete: null,
  };
}
