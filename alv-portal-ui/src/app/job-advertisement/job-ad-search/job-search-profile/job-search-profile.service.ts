import { Injectable } from '@angular/core';
import {
  OccupationTypeaheadItem,
  OccupationTypeaheadItemType
} from '../../../shared/occupations/occupation-typeahead-item';
import {
  LocalityInputType,
  LocalityItem,
  LocalityTypeaheadItem
} from '../../../shared/localities/locality-typeahead-item';
import { StringTypeaheadItem } from '../../../shared/forms/input/typeahead/string-typeahead-item';
import { CantonSuggestion } from '../../../shared/backend-services/reference-service/locality.types';
import { initialState, JobSearchFilter } from '../state-management/state';
import {
  JobSearchFilterRequest,
  LocalityFilter,
  ResolvedJobSearchFilter
} from '../../../shared/backend-services/job-ad-search-profiles/job-ad-search-profiles.types';
import {
  CantonFilter,
  ContractType,
  OccupationFilter,
  OccupationResolved
} from '../../../shared/backend-services/shared.types';
import { Location } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';

@Injectable({
  providedIn: 'root'
})
export class JobSearchProfileService {

  constructor() {
  }


  mapToRequest(jobSearchFilter: JobSearchFilter): JobSearchFilterRequest {
    return {
      sort: jobSearchFilter.sort,
      displayRestricted: jobSearchFilter.displayRestricted,
      contractType: this.mapContractTypeToRequest(jobSearchFilter.contractType),
      workloadPercentageMax: jobSearchFilter.workloadPercentageMax,
      workloadPercentageMin: jobSearchFilter.workloadPercentageMin,
      companyName: jobSearchFilter.company,
      onlineSince: jobSearchFilter.onlineSince,
      occupationFilters: this.mapOccupations(jobSearchFilter.occupations),
      cantonFilters: this.mapCantons(jobSearchFilter.localities.filter(locality => locality.type === 'canton')),
      localityFilters: this.mapLocalities(jobSearchFilter.localities.filter(locality => locality.type === 'locality')),
      keywords: jobSearchFilter.keywords.map(keyword => keyword.payload).filter(k => !!k),
      distance: jobSearchFilter.localities.filter(locality => locality.type === 'locality').length === 1 ? jobSearchFilter.radius : undefined
    };
  }

  mapFromRequest(jobSearchFilter: ResolvedJobSearchFilter): JobSearchFilter {
    return {
      sort: jobSearchFilter.sort,
      displayRestricted: jobSearchFilter.displayRestricted,
      contractType: this.mapContractTypeFromRequest(jobSearchFilter.contractType),
      workloadPercentageMax: parseInt(jobSearchFilter.workloadPercentageMax, 10),
      workloadPercentageMin: parseInt(jobSearchFilter.workloadPercentageMin, 10),
      company: jobSearchFilter.companyName,
      onlineSince: parseInt(jobSearchFilter.onlineSince, 10),
      occupations: this.mapOccupationsFromRequest(jobSearchFilter.occupations),
      localities: this.mapLocalitiesFromRequest(jobSearchFilter.locations, jobSearchFilter.cantons),
      keywords: jobSearchFilter.keywords
        .filter(k => !!k)
        .map(keyword => new StringTypeaheadItem('free-text', keyword, keyword)),
      radius: jobSearchFilter.distance ? jobSearchFilter.distance : initialState.jobSearchFilter.radius
    };
  }

  private mapOccupationsFromRequest(occupations: OccupationResolved[]): OccupationTypeaheadItem[] {
    return occupations.map((occupation, index) => new OccupationTypeaheadItem(
      <OccupationTypeaheadItemType>occupation.filterType.toLowerCase(),
      {
        id: occupation.id,
        value: occupation.code,
        type: occupation.type,
        mapping: occupation.mappings ? this.extractAvamMapping(occupation.mappings) : null
      },
      occupation.label,
      index
    ));
  }

  private extractAvamMapping(mappings) {
    if (!mappings.hasOwnProperty('AVAM')) {
      return null;
    }

    return {
      type: 'AVAM',
      value: mappings['AVAM']
    };
  }

  private mapLocalitiesFromRequest(localities: Location[], cantons: CantonSuggestion[]): LocalityTypeaheadItem[] {
    return [
      ...localities.map((locality, index) =>
        new LocalityTypeaheadItem(LocalityInputType.LOCALITY,
          this.mapLocalityItemFromRequest(locality),
          locality.city, index)),
      ...cantons.map((canton, index) =>
        new LocalityTypeaheadItem(LocalityInputType.CANTON,
          { cantonCode: canton.code },
          canton.name,
          localities.length + index))
    ];
  }

  private mapLocalityItemFromRequest(location: Location): LocalityItem {
    return {
      id: location.id,
      cantonCode: location.cantonCode,
      city: location.city,
      communalCode: parseInt(location.communalCode, 10),
      zipCode: location.postalCode,
      geoPoint: location.coordinates,
      regionCode: location.regionCode
    };
  }

  private mapOccupations(occupations: OccupationTypeaheadItem[]): OccupationFilter[] {
    return occupations.map(occupation => {
      return {
        labelId: occupation.payload.id
      };
    });
  }

  private mapCantons(cantons: LocalityTypeaheadItem[]): CantonFilter[] {
    return cantons.map(canton => {
      return {
        name: canton.label,
        code: canton.payload.cantonCode
      };
    });
  }

  private mapLocalities(localities: LocalityTypeaheadItem[]): LocalityFilter[] {
    return localities.map(locality => {
      return {
        localityId: locality.payload.id
      };
    });
  }

  private mapContractTypeFromRequest(contractType: ContractType): ContractType {
    return contractType ? contractType : ContractType.ALL;
  }

  private mapContractTypeToRequest(contractType: ContractType): ContractType {
    return contractType === ContractType.ALL ? undefined : contractType;
  }
}
