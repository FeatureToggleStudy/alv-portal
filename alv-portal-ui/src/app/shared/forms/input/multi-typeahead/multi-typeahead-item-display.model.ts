import { MultiTypeaheadItemModel } from './multi-typeahead-item.model';

export class MultiTypeaheadItemDisplayModel {
    constructor(public model: MultiTypeaheadItemModel,
                public first = false,
                public firstInGroup = false) {
    }
}
