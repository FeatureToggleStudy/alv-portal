import { OccupationMultiTypeaheadItem } from '../../../shared/occupations/occupation-multi-typeahead-item';
import { SimpleMultiTypeaheadItem } from '../../../shared/forms/input/multi-typeahead/simple-multi-typeahead.item';
import { LocalityMultiTypeaheadItem } from '../../../shared/localities/locality-multi-typeahead-item';

export interface CandidateQueryPanelValues {
  occupations: OccupationMultiTypeaheadItem[];
  keywords: SimpleMultiTypeaheadItem[];
  workplace: LocalityMultiTypeaheadItem;
}
