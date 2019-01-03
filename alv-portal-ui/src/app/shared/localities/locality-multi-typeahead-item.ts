import { MultiTypeaheadItem } from '../forms/input/multi-typeahead/multi-typeahead-item';

export interface LocalityItem {
  communalCode?: string;
  cantonCode?: string;
  regionCode?: string;
}

export enum LocalityInputType {
  LOCALITY = 'locality',
  CANTON = 'canton',
}

export class LocalityMultiTypeaheadItem extends MultiTypeaheadItem<LocalityItem> {

  constructor(type: LocalityInputType, payload: LocalityItem, label: string, order: number) {
    super(type, payload, label, order);
  }

  /**
   * should be called manually after a JSON.parse to make sure we create a new object instance
   * @param obj after using JSON.parse
   */
  static fromJson(obj: any): LocalityMultiTypeaheadItem {
    return new LocalityMultiTypeaheadItem(obj.type, obj.payload, obj.label, obj.order);
  }
}
