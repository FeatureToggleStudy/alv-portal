import { MultiTypeaheadItem } from './multi-typeahead-item';

export class MultiTypeaheadDisplayItem {
  constructor(public model: MultiTypeaheadItem<any>,
              public first = false,
              public firstInGroup = false) {
  }
}
