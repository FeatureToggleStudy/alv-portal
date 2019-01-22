import { TypeaheadItem } from '../forms/input/multi-typeahead/typeahead-item';

export interface LocalityItem {
  communalCode?: string;
  cantonCode?: string;
  regionCode?: string;
  city?: string;
  zipCode?: string;
}

export enum LocalityInputType {
  LOCALITY = 'locality',
  CANTON = 'canton',
}

export class LocalityTypeaheadItem extends TypeaheadItem<LocalityItem> {

  constructor(type: LocalityInputType, payload: LocalityItem, label: string, order: number) {
    super(type, payload, label, order);
  }

  /**
   * should be called manually after a JSON.parse to make sure we create a new object instance
   * @param obj after using JSON.parse
   */
  static fromJson(obj: any): LocalityTypeaheadItem {
    return new LocalityTypeaheadItem(obj.type, obj.payload, obj.label, obj.order);
  }
}
