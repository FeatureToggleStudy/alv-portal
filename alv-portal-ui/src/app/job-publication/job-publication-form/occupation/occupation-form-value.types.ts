import { Degree, Experience } from '../../../shared/backend-services/shared.types';
import { OccupationCode } from '../../../shared/backend-services/reference-service/occupation-label.types';
import { TypeaheadItem } from '../../../shared/forms/input/typeahead/typeahead-item';

export interface OccupationFormValue {
  occupationSuggestion: TypeaheadItem<OccupationCode>;
  degree: Degree;
  experience: Experience;
}

export const emptyOccupationFormValue: OccupationFormValue = {
  occupationSuggestion: null,
  degree: null,
  experience: null
};
