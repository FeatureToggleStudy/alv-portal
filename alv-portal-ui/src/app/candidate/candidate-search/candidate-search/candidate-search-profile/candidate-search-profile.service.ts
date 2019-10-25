import { Injectable } from '@angular/core';

import {
  Canton,
  CantonFilter,
  OccupationFilter,
  OccupationResolved
} from '../../../../shared/backend-services/shared.types';
import { CandidateSearchFilter } from '../../state-management/state';
import {
  CandidateSearchFilterRequest,
  ResolvedCandidateSearchFilter,
  ResolvedLocation
} from '../../../../shared/backend-services/candidate-search-profiles/candidate-search-profiles.types';
import { StringTypeaheadItem } from '../../../../shared/forms/input/typeahead/string-typeahead-item';
import {
  OccupationTypeaheadItem,
  OccupationTypeaheadItemType
} from '../../../../shared/occupations/occupation-typeahead-item';
import {
  LocalityInputType,
  LocalityItem,
  LocalityTypeaheadItem
} from '../../../../shared/localities/locality-typeahead-item';
import {
  FilterLanguageSkill,
  LanguageSkill
} from '../../../../shared/backend-services/candidate/candidate.types';

@Injectable({
  providedIn: 'root'
})
export class CandidateSearchProfileService {

  constructor() {
  }

  mapToRequest(candidateSearchFilter: CandidateSearchFilter): CandidateSearchFilterRequest {
    return {
      availability: candidateSearchFilter.availability,
      degree: candidateSearchFilter.degree,
      drivingLicenceCategory: candidateSearchFilter.drivingLicenceCategory,
      experience: candidateSearchFilter.experience,
      graduation: candidateSearchFilter.graduation,
      workForm: candidateSearchFilter.workForm,
      workloadPercentageMax: candidateSearchFilter.workloadPercentageMax,
      workloadPercentageMin: candidateSearchFilter.workloadPercentageMin,
      keywords: candidateSearchFilter.keywords.map(keyword => keyword.payload).filter(k => !!k),
      residences: candidateSearchFilter.residence.filter(r => !!r).map(r => r.toString()),
      workplaceLocalityId: this.mapLocality(candidateSearchFilter.workplace),
      workplaceCantonFilter: this.mapCanton(candidateSearchFilter.workplace),
      languageSkillFilters: this.mapLanguageSkills(candidateSearchFilter.languageSkills),
      occupationFilters: this.mapOccupations(candidateSearchFilter.occupations)
    };
  }

  mapFromRequest(candidateSearchFilter: ResolvedCandidateSearchFilter): CandidateSearchFilter {
    return {
      availability: candidateSearchFilter.availability,
      degree: candidateSearchFilter.degree,
      drivingLicenceCategory: candidateSearchFilter.drivingLicenceCategory,
      experience: candidateSearchFilter.experience,
      graduation: candidateSearchFilter.graduation,
      workForm: candidateSearchFilter.workForm,
      workloadPercentageMax: candidateSearchFilter.workloadPercentageMax,
      workloadPercentageMin: candidateSearchFilter.workloadPercentageMin,
      keywords: candidateSearchFilter.keywords
        .filter(k => !!k)
        .map(keyword => new StringTypeaheadItem('free-text', keyword, keyword)),
      residence: candidateSearchFilter.residences.map(r => Canton[r]).filter(c => !!c),
      workplace: this.mapWorkplaceFromRequest(candidateSearchFilter.workplaceLocation, candidateSearchFilter.workplaceCantonFilter),
      languageSkills: this.mapLanguageSkillsFromRequest(candidateSearchFilter.languageSkillFilters),
      occupations: this.mapOccupationsFromRequest(candidateSearchFilter.occupationFilters)
    };
  }

  private mapWorkplaceFromRequest(location: ResolvedLocation, canton: CantonFilter): LocalityTypeaheadItem {
    if (location) {
      return new LocalityTypeaheadItem(LocalityInputType.LOCALITY,
        this.mapLocalityItemFromRequest(location),
        location.city, 0);
    }
    if (canton) {
      return new LocalityTypeaheadItem(LocalityInputType.CANTON,
        { cantonCode: canton.code },
        canton.name,
        0);
    }
  }

  private mapLocalityItemFromRequest(location: ResolvedLocation): LocalityItem {
    return {
      id: location.id,
      cantonCode: location.cantonCode,
      city: location.city,
      communalCode: parseInt(location.communalCode, 10),
      zipCode: location.postalCode,
      geoPoint: location.geoPoints,
      regionCode: location.regionCode
    };
  }

  private mapOccupationsFromRequest(occupations: OccupationResolved[]): OccupationTypeaheadItem[] {
    return occupations.map((occupation, index) => new OccupationTypeaheadItem(
      <OccupationTypeaheadItemType>occupation.filterType.toLowerCase(),
      {
        id: occupation.id,
        value: occupation.code,
        type: occupation.type,
        mapping: occupation.mappings ? this.extractBfsMapping(occupation.mappings) : null
      },
      occupation.label,
      index
    ));
  }

  private mapLanguageSkillsFromRequest(languageSkills: LanguageSkill[]): FilterLanguageSkill[] {
    return languageSkills.map(languageSkill => {
      return {
        code: languageSkill.code,
        spoken: languageSkill.spokenLevel,
        written: languageSkill.writtenLevel
      };
    });
  }

  private mapLanguageSkills(languageSkills: FilterLanguageSkill[]): LanguageSkill[] {
    return languageSkills
      .filter(l => !!l.code)
      .map(languageSkill => {
        return {
          code: languageSkill.code,
          spokenLevel: languageSkill.spoken,
          writtenLevel: languageSkill.written
        };
      });
  }

  private mapOccupations(occupations: OccupationTypeaheadItem[]): OccupationFilter[] {
    return occupations.map(occupation => {
      return {
        labelId: occupation.payload.id
      };
    });
  }

  private mapCanton(workplace: LocalityTypeaheadItem): CantonFilter {
    return workplace && workplace.type === 'canton' ? {
      code: workplace.payload.cantonCode,
      name: workplace.label
    } : undefined;
  }

  private mapLocality(workplace: LocalityTypeaheadItem): string {
    return workplace && workplace.type === 'locality' ? workplace.payload.id : undefined;
  }

  private extractBfsMapping(mappings: { [p: string]: string }) {
    if (!mappings.hasOwnProperty('BFS')) {
      return null;
    }

    return {
      type: 'BFS',
      value: mappings['BFS']
    };
  }
}
