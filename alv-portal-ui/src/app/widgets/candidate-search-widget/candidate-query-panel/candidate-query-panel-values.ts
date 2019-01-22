import { OccupationTypeaheadItem } from '../../../shared/occupations/occupation-typeahead-item';
import { SimpleTypeaheadItem } from '../../../shared/forms/input/typeahead/simple-typeahead-item';
import { LocalityTypeaheadItem } from '../../../shared/localities/locality-typeahead-item';

export interface CandidateQueryPanelValues {
  occupations: OccupationTypeaheadItem[];
  keywords: SimpleTypeaheadItem[];
  workplace: LocalityTypeaheadItem;
}
