import { Injectable } from '@angular/core';
import {
  CantonFilter,
  ContractType,
  JobSearchFilter,
  JobSearchFilterRequest,
  JobSearchFilterResponse,
  LocalityFilter,
  OccupationFilter,
  OccupationResolved
} from '../state-management/state';
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
import { Location } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { ConfirmModalConfig } from '../../../shared/layout/modal/confirm-modal/confirm-modal-config.model';
import { CantonSuggestion } from '../../../shared/backend-services/reference-service/locality.types';

@Injectable({
  providedIn: 'root'
})
export class JobSearchProfileService {

  constructor() {
  }

  static getDeleteConfirmationModalConfig(profileName: string): ConfirmModalConfig {
    return {
      title: 'portal.job-ad-search-profiles.delete-confirmation-modal.title',
      content: 'portal.job-ad-search-profiles.delete-confirmation-modal.question',
      contentParams: {profileName: profileName}
    };
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
      keywords: jobSearchFilter.keywords.map(keyword => keyword.payload),
      radiusSearchFilter: {
        distance: jobSearchFilter.radius
      }
    };
  }

  mapFromRequest(jobSearchFilter: JobSearchFilterResponse): JobSearchFilter {
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
      radius: jobSearchFilter.radiusSearchFilter ? jobSearchFilter.radiusSearchFilter.distance : 30
    };
  }

  private mapOccupationsFromRequest(occupations: OccupationResolved[]): OccupationTypeaheadItem[] {
    return occupations.map((occupation, index) => new OccupationTypeaheadItem(
      <OccupationTypeaheadItemType>occupation.filterType.toLowerCase(),
      {
        id: occupation.id,
        value: occupation.code,
        type: occupation.type,
        mapping: occupation.mappings ? {
          value: occupation.mappings[Object.keys(occupation.mappings)[0]],
          type: Object.keys(occupation.mappings)[0]
        } : null
      },
      occupation.label,
      index
    ));
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
          canton.name + ' (' + canton.code + ')',
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
        labelId: occupation.payload.id // TODO: where to get the labelId from?
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
