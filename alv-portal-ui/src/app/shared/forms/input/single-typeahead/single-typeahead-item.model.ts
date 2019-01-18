import { MultiTypeaheadItem } from '../multi-typeahead/multi-typeahead-item';

export class SingleTypeaheadItem<T> extends MultiTypeaheadItem<T> {

  constructor(public type: string,
              public payload: T,
              public label: string,
              public order = 0) {
    super(type, payload, label, order);
  }

}
