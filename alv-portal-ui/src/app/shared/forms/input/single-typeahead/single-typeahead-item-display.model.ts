import { SingleTypeaheadItemModel } from './single-typeahead-item.model';

export class SingleTypeaheadItemDisplayModel {
    constructor(public model: SingleTypeaheadItemModel,
                public first = false,
                public firstInGroup = false) {
    }
}
