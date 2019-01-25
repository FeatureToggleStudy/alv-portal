import { TypeaheadItem } from '../forms/input/typeahead/typeahead-item';

export interface ZipAndCity {
  zipCode: string;
  city: string;
}

export class ZipAndCityTypeaheadItem extends TypeaheadItem<ZipAndCity> {

  constructor(payload: ZipAndCity, label: string, order: number) {
    super('ZipAndCity', payload, label, order);
  }
}
