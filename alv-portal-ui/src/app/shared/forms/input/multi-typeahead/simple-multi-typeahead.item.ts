import { MultiTypeaheadItem } from './multi-typeahead-item';

export class SimpleMultiTypeaheadItem extends MultiTypeaheadItem<string> {

  constructor(type: string, payload: string, label: string, order = 0) {
    super(type, payload, label, order);
  }

  /**
   * should be called manually after a JSON.parse to make sure we create a new object instance
   * @param obj after using JSON.parse
   */
  static fromJson(obj: any): SimpleMultiTypeaheadItem {
    return new SimpleMultiTypeaheadItem(obj.type, obj.payload, obj.label, obj.order);
  }

}
