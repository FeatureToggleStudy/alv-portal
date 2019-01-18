import { Degree, Experience } from '../../../shared/backend-services/shared.types';
import { SingleTypeaheadItem } from '../../../shared/forms/input/single-typeahead/single-typeahead-item.model';
import { OccupationCode } from '../../../shared/backend-services/reference-service/occupation-label.types';

export interface OccupationFormValue {
  occupationSuggestion: SingleTypeaheadItem<OccupationCode>;
  degree: Degree;
  experience: Experience;
}

export const emptyOccupationFormValue: OccupationFormValue = {
  occupationSuggestion: null,
  degree: null,
  experience: null
};
