import { TypeaheadItem } from '../../../shared/forms/input/typeahead/typeahead-item';

export interface ZipAndCity {
  zipCode: string;
  city: string;
}

export type ZipCityFormValue = ZipAndCity | TypeaheadItem<ZipAndCity>;
