export interface OccupationLabelSuggestion {
  id: string;
  code: string;
  type: string;
  language: string;
  classifier: string;
  label: string;
  mappings?: { [key: string]: string };
}

export interface OccupationLabel {
  id: string;
  code: string;
  type: string;
  language: string;
  classifier: string;
  label: string;
}

export interface OccupationLabelAutocomplete {
  occupations: OccupationLabelSuggestion[];
  classifications: OccupationLabel[];
}

export interface OccupationLabelData {
  [key: string]: string;
}
