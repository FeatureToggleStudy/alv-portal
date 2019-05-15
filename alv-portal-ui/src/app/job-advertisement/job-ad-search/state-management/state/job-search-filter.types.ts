import { OccupationTypeaheadItem } from '../../../../shared/occupations/occupation-typeahead-item';
import { StringTypeaheadItem } from '../../../../shared/forms/input/typeahead/string-typeahead-item';
import { LocalityTypeaheadItem } from '../../../../shared/localities/locality-typeahead-item';
import { GeoPoint } from '../../../../shared/backend-services/reference-service/locality.types';
import {
  Location
} from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';

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
  radius?: number;
}

export interface JobSearchFilterRequest {
  sort: Sort;
  displayRestricted: boolean;
  contractType: ContractType;
  workloadPercentageMax: number;
  workloadPercentageMin: number;
  company?: string;
  onlineSince: number;
  occupationFilters: OccupationFilter[];
  localityFilters: LocalityFilter[];
  cantonFilters: CantonFilter[];
  keywords: string[];
  radiusSearchFilter?: RadiusSearchFilter;
}

export interface JobSearchFilterResponse {
  sort: Sort;
  displayRestricted: boolean;
  contractType: ContractType;
  workloadPercentageMax: number;
  workloadPercentageMin: number;
  company?: string;
  onlineSince: number;
  occupations: OccupationResolved[];
  locations: LocationResolved[];
  cantonFilters: CantonFilter[];
  keywords: string[];
  radiusSearchFilter?: RadiusSearchFilter;
}

export interface LocationResolved extends Location {
  id: string;
}

export interface OccupationResolved {
  id: string;
  code: string;
  type: string;
  filterType: string;
  label: string;
  mappings?: { [key: string]: string };
}

export interface CantonFilter {
  name: string;
  code: string;
}

export interface LocalityFilter {
  localityId: string;
}

export interface OccupationFilter {
  labelId: string;
}

export interface RadiusSearchFilter {
  geoPoint: GeoPoint;
  distance: number;
}
