import { SingleTypeaheadItem } from '../../../shared/forms/input/single-typeahead/single-typeahead-item.model';

export interface ZipAndCity {
  zipCode: string;
  city: string;
}

export type ZipCityFormValue = ZipAndCity | SingleTypeaheadItem<ZipAndCity>;
