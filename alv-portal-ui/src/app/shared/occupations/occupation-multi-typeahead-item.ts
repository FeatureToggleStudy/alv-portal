import { MultiTypeaheadItem } from '../forms/input/multi-typeahead/multi-typeahead-item';
import { OccupationCode } from '../backend-services/reference-service/occupation-label.types';

export enum OccupationMultiTypeaheadItemType {
  CLASSIFICATION = 'classification',
  OCCUPATION = 'occupation'
}

export class OccupationMultiTypeaheadItem extends MultiTypeaheadItem<OccupationCode> {

  constructor(type: OccupationMultiTypeaheadItemType, occupationData: OccupationCode, label: string, order: number) {
    super(type, occupationData, label, order);
  }

  /**
   * should be called manually after a JSON.parse to make sure we create a new object instance
   * @param obj after using JSON.parse
   */
  static fromJson(obj: any): OccupationMultiTypeaheadItem {
    return new OccupationMultiTypeaheadItem(obj.type, obj.payload, obj.label, obj.order);
  }
}
