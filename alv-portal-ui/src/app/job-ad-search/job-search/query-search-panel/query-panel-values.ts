import { OccupationMultiTypeaheadItem } from '../../../shared/occupations/occupation-multi-typeahead-item';
import { SimpleMultiTypeaheadItem } from '../../../shared/forms/input/multi-typeahead/simple-multi-typeahead.item';

// TODO Move me to the query-panel-component
export interface QueryPanelValues {
  occupations: OccupationMultiTypeaheadItem[];
  keywords: SimpleMultiTypeaheadItem[];
  localities: SimpleMultiTypeaheadItem[];
}
