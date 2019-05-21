import { OccupationTypeaheadItem } from '../../../../shared/occupations/occupation-typeahead-item';
import { StringTypeaheadItem } from '../../../../shared/forms/input/typeahead/string-typeahead-item';
import { LocalityTypeaheadItem } from '../../../../shared/localities/locality-typeahead-item';
import { ContractType, Sort } from '../../../../shared/backend-services/shared.types';

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
  radius?: number;
}
