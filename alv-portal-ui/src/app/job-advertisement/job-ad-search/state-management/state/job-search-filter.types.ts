import { OccupationTypeaheadItem } from '../../../../shared/occupations/occupation-typeahead-item';
import { StringTypeaheadItem } from '../../../../shared/forms/input/typeahead/string-typeahead-item';
import { LocalityTypeaheadItem } from '../../../../shared/localities/locality-typeahead-item';

export enum Sort {
  RELEVANCE_DESC = 'RELEVANCE_DESC',
  DATE_DESC = 'DATE_DESC',
  DATE_ASC = 'DATE_ASC'
}

export enum ContractType {
  ALL = 'ALL',
  TEMPORARY = 'TEMPORARY',
  PERMANENT = 'PERMANENT',
}

export interface JobSearchFilter {
  sort: Sort;
  displayRestricted: boolean;
  contractType: ContractType;
  workloadPercentageMax: number;
  workloadPercentageMin: number;
  company?: string;
  onlineSince: number;
  occupations: OccupationTypeaheadItem[];
  keywords: StringTypeaheadItem[];
  localities: LocalityTypeaheadItem[];
}
