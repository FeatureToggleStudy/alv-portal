import { Injectable } from '@angular/core';
import {
  CantonFilter,
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
import {
  JobAdSearchProfileRequest,
  Location
} from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { ConfirmModalConfig } from '../../../shared/layout/modal/confirm-modal/confirm-modal-config.model';

@Injectable({
  providedIn: 'root'
})
export class JobSearchProfileService {

  constructor() {
  }

  getDeleteConfirmationModalConfig(profileName: string): ConfirmModalConfig {
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
      contractType: jobSearchFilter.contractType,
      workloadPercentageMax: jobSearchFilter.workloadPercentageMax,
      workloadPercentageMin: jobSearchFilter.workloadPercentageMin,
      company: jobSearchFilter.company,
      onlineSince: jobSearchFilter.onlineSince,
      occupationFilters: this.mapOccupations(jobSearchFilter.occupations),
      cantonFilters: this.mapCantons(jobSearchFilter.localities.filter(locality => locality.type === 'canton')),
      localityFilters: this.mapLocalities(jobSearchFilter.localities.filter(locality => locality.type === 'locality')),
      keywords: jobSearchFilter.keywords.map(keyword => keyword.payload)
    };
  }

  mapFromRequest(jobSearchFilter: JobSearchFilterResponse): JobSearchFilter {
    return {
      sort: jobSearchFilter.sort,
      displayRestricted: jobSearchFilter.displayRestricted,
      contractType: jobSearchFilter.contractType,
      workloadPercentageMax: jobSearchFilter.workloadPercentageMax,
      workloadPercentageMin: jobSearchFilter.workloadPercentageMin,
      company: jobSearchFilter.company,
      onlineSince: jobSearchFilter.onlineSince,
      occupations: this.mapOccupationsFromRequest(jobSearchFilter.occupations),
      localities: this.mapLocalitiesFromRequest(jobSearchFilter.locations, jobSearchFilter.cantonFilters),
      keywords: jobSearchFilter.keywords.map(keyword => new StringTypeaheadItem('free-text', keyword, keyword))
    };
  }

  private mapOccupationsFromRequest(occupations: OccupationResolved[]): OccupationTypeaheadItem[] {
    return occupations.map((occupation, index) => new OccupationTypeaheadItem(
      <OccupationTypeaheadItemType>occupation.filterType,
      {
        value: occupation.code,
        type: occupation.type,
        mapping: {
          value: occupation.mappings[Object.keys(occupation.mappings)[0]],
          type: Object.keys(occupation.mappings)[0]
        }
      },
      occupation.label,
      index
    ));
  }

  private mapLocalitiesFromRequest(localities: Location[], cantons: CantonFilter[]): LocalityTypeaheadItem[] {
    return [
      ...localities.map((locality, index) =>
        new LocalityTypeaheadItem(LocalityInputType.LOCALITY,
          this.mapLocalityItem(locality),
          locality.city, index)),
      ...cantons.map((canton, index) =>
        new LocalityTypeaheadItem(LocalityInputType.CANTON,
          { cantonCode: canton.code },
          canton.name + ' (' + canton.code + ')',
          localities.length + index))
    ];
  }

  private mapLocalityItem(location: Location): LocalityItem {
    return {
      id: location.id,
      cantonCode: location.cantonCode,
      city: location.city,
      communalCode: parseInt(location.communalCode, 10),

    };
  }

  private mapOccupations(occupations: OccupationTypeaheadItem[]): OccupationFilter[] {
    return occupations.map(occupation => {
      return {
        labelId: occupation.label // TODO: where to get the labelId from?
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

  private mapLocalities(localitites: LocalityTypeaheadItem[]): LocalityFilter[] {
    return localitites.map(locality => {
      return {
        localityId: locality.payload.id
      };
    });
  }
}
