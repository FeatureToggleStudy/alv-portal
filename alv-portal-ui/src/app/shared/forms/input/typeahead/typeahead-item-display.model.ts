import { TypeaheadItemModel } from './typeahead-item.model';

export class TypeaheadItemDisplayModel {
    constructor(public model: TypeaheadItemModel,
                public first = false,
                public firstInGroup = false) {
    }
}
