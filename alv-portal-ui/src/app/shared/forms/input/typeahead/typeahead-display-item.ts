import { TypeaheadItem } from './typeahead-item';

export class TypeaheadDisplayItem {
  constructor(public model: TypeaheadItem<any>,
              public first = false,
              public firstInGroup = false) {
  }
}
