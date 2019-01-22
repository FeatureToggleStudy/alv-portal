import {
  CandidateSearchRequest,
  FilterLanguageSkill
} from '../../../shared/backend-services/candidate/candidate.types';
import { CandidateSearchFilter } from '..';
import { Canton } from '../../../shared/backend-services/shared.types';
import { SimpleTypeaheadItem } from '../../../shared/forms/input/multi-typeahead/simple-typeahead-item';
import { LocalityTypeaheadItem } from '../../../shared/localities/locality-typeahead-item';
import { OccupationTypeaheadItem } from '../../../shared/occupations/occupation-typeahead-item';
import { OccupationCode } from '../../../shared/backend-services/reference-service/occupation-label.types';

const ITEMS_PER_PAGE = 20;

export class CandidateSearchRequestMapper {

  public static mapToRequest(candidateSearchFilter: CandidateSearchFilter, page: number): CandidateSearchRequest {

    return {
      page: page,
      size: ITEMS_PER_PAGE,
      body: {
        occupationCodes: CandidateSearchRequestMapper.mapOccupationCodes(candidateSearchFilter.occupations),
        skills: CandidateSearchRequestMapper.mapKeywords(candidateSearchFilter.keywords),
        cantonCode: CandidateSearchRequestMapper.mapCantonCode(candidateSearchFilter.workplace),
        regionCode: CandidateSearchRequestMapper.mapRegionCode(candidateSearchFilter.workplace),
        degree: candidateSearchFilter.degree,
        graduation: candidateSearchFilter.graduation,
        experience: candidateSearchFilter.experience,
        residence: CandidateSearchRequestMapper.mapResidences(candidateSearchFilter.residence),
        availability: candidateSearchFilter.availability,
        workLoad: CandidateSearchRequestMapper.mapWorkLoad(candidateSearchFilter.workloadPercentageMin, candidateSearchFilter.workloadPercentageMax),
        drivingLicenceCategory: candidateSearchFilter.drivingLicenceCategory,
        workForm: candidateSearchFilter.workForm,
        languageSkills: CandidateSearchRequestMapper.mapLanguageSkills(candidateSearchFilter.languageSkills)
      }
    };
  }

  private static mapKeywords(keywords: SimpleTypeaheadItem[]): string[] {
    return keywords.map((i) => i.payload);
  }

  private static mapWorkLoad(workloadPercentageMin: number, workloadPercentageMax: number) {
    return { min: workloadPercentageMin, max: workloadPercentageMax };
  }

  private static mapResidences(residences: Canton[]) {
    return residences ? residences.map((residence) => residence.toString()) : null;
  }

  private static mapCantonCode(workplace: LocalityTypeaheadItem) {
    if (!workplace) {
      return null;
    }
    return workplace.payload.cantonCode;
  }

  private static mapRegionCode(workplace: LocalityTypeaheadItem) {
    if (!workplace) {
      return null;
    }
    return workplace.payload.regionCode;
  }

  private static mapOccupationCodes(occupations: OccupationTypeaheadItem[]): OccupationCode[] {
    return occupations.map((a) => a.payload);
  }

  private static mapLanguageSkills(languageSkills: FilterLanguageSkill[]) {
    return languageSkills.filter((l) => l.code);
  }
}
