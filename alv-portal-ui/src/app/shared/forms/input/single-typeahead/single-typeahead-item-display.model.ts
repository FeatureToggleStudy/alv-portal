import { SingleTypeaheadItem } from './single-typeahead-item.model';

export class SingleTypeaheadItemDisplayModel {
    constructor(public model: SingleTypeaheadItem,
                public first = false,
                public firstInGroup = false) {
    }
}
