import { Degree, Experience } from '../../../shared/backend-services/shared.types';
import { OccupationTypeaheadItem } from '../../../shared/occupations/occupation-typeahead-item';

export interface OccupationFormValue {
  occupationSuggestion: OccupationTypeaheadItem;
  degree: Degree;
  experience: Experience;
}

export function emptyOccupationFormValue(): OccupationFormValue {
  return {
    occupationSuggestion: null,
    degree: null,
    experience: null
  };
}
