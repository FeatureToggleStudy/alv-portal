import { Degree, Qualification } from '../../../../shared/backend-services/shared.types';
import { OccupationTypeaheadItem } from '../../../../shared/occupations/occupation-typeahead-item';
import { WorkExperience } from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';

export interface OccupationFormValue {
  occupationSuggestion: OccupationTypeaheadItem;
  qualification: Qualification;
  degree: Degree;
  experience: WorkExperience;
}

export function emptyOccupationFormValue(): OccupationFormValue {
  return {
    occupationSuggestion: null,
    qualification: null,
    degree: null,
    experience: null
  };
}
