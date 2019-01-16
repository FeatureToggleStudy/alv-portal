import { Degree, Experience } from '../../../shared/backend-services/shared.types';

export interface OccupationFormValue {
  occupationSuggestion: any;
  degree: Degree;
  experience: Experience;
}

export const emptyOccupationFormValue: OccupationFormValue = {
  occupationSuggestion: null,
  degree: null,
  experience: null
};
