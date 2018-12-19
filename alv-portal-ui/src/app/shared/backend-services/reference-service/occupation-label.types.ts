export interface OccupationLabelSuggestion {
  id: string;
  code: number;
  type: string;
  language: string;
  classifier: string;
  label: string;
  mappings: { [key: string]: number }
}

export interface OccupationLabel {
  id: string;
  code: number;
  type: string;
  language: string;
  classifier: string;
  label: string;
}

export interface OccupationLabelAutocomplete {
  occupations: OccupationLabelSuggestion[];
  classifications: OccupationLabel[];
}
