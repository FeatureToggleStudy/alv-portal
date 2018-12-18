import { MultiTypeaheadItem } from '../shared/forms/input/multi-typeahead/multi-typeahead-item';


// TODO this is is the same as ProfessionCode at the moment -> maybe get rid of it later
export interface OccupationCodeMapping {
  type: string;
  value: number;
}

export class OccupationMultiTypeaheadItem extends MultiTypeaheadItem<OccupationCodeMapping[]> {

  constructor(type: string, payload: OccupationCodeMapping[], label: string, order: number) {
    super(type, payload, label, order);
  }

  /**
   * should be called manually after a JSON.parse to make sure we create a new object instance
   * @param obj after using JSON.parse
   */
  static fromJson(obj: any): OccupationMultiTypeaheadItem {
    return new OccupationMultiTypeaheadItem(obj.type, obj.payload, obj.label, obj.order);
  }
}
