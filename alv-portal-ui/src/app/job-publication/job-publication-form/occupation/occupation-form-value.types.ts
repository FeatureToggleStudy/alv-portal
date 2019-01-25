import {
  Degree,
  Experience,
  Qualification
} from '../../../shared/backend-services/shared.types';
import { OccupationTypeaheadItem } from '../../../shared/occupations/occupation-typeahead-item';

export interface OccupationFormValue {
  occupationSuggestion: OccupationTypeaheadItem;
  qualification: Qualification;
  degree: Degree;
  experience: Experience;
}

export function emptyOccupationFormValue(): OccupationFormValue {
  return {
    occupationSuggestion: null,
    qualification: null,
    degree: null,
    experience: null
  };
}
