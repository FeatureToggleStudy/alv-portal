import {
  CandidateSearchRequest,
  LanguageSkill
} from '../../../shared/backend-services/candidate/candidate.types';
import { CandidateSearchFilter } from '..';
import { Canton } from '../../../shared/backend-services/shared.types';
import { SimpleMultiTypeaheadItem } from '../../../shared/forms/input/multi-typeahead/simple-multi-typeahead.item';
import { LocalityMultiTypeaheadItem } from '../../../shared/localities/locality-multi-typeahead-item';
import { OccupationMultiTypeaheadItem } from '../../../shared/occupations/occupation-multi-typeahead-item';
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
        languageSkills: CandidateSearchRequestMapper.mapLanguageSkills(candidateSearchFilter.languageSkills)
      }
    };
  }

  private static mapKeywords(keywords: SimpleMultiTypeaheadItem[]): string[] {
    return keywords.map((i) => i.payload);
  }

  private static mapWorkLoad(workloadPercentageMin: number, workloadPercentageMax: number) {
    return { min: workloadPercentageMin, max: workloadPercentageMax };
  }

  private static mapResidences(residences: Canton[]) {
    return residences ? residences.map((residence) => residence.toString()) : null;
  }

  private static mapCantonCode(workplace: LocalityMultiTypeaheadItem) {
    if (!workplace) {
      return null;
    }
    return workplace.payload.cantonCode;
  }

  private static mapRegionCode(workplace: LocalityMultiTypeaheadItem) {
    if (!workplace) {
      return null;
    }
    return workplace.payload.regionCode;
  }

  private static mapOccupationCodes(occupations: OccupationMultiTypeaheadItem[]): OccupationCode[] {
    return occupations.map((a) => a.payload);
  }

  private static mapLanguageSkills(languageSkills: LanguageSkill[]) {
    return languageSkills.filter((l) => l.code);
  }
}
