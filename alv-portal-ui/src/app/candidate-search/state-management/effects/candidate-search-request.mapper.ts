import { CandidateSearchRequest } from '../../../shared/backend-services/candidate/candidate.types';
import { CandidateSearchFilter } from '..';
import { Canton } from '../../../shared/backend-services/shared.types';

const ITEMS_PER_PAGE = 20;

export class CandidateSearchRequestMapper {

  public static mapToRequest(candidateSearchFilter: CandidateSearchFilter, page: number): CandidateSearchRequest {
    return {
      page: page,
      size: ITEMS_PER_PAGE,
      body: {
        degree: candidateSearchFilter.degree,
        graduation: candidateSearchFilter.graduation,
        experience: candidateSearchFilter.experience,
        residence: CandidateSearchRequestMapper.mapResidences(candidateSearchFilter.residence),
        availability: candidateSearchFilter.availability,
        workLoad: CandidateSearchRequestMapper.mapWorkLoad(candidateSearchFilter.workloadPercentageMin, candidateSearchFilter.workloadPercentageMax),
        //todo DF-391: Implement mapping
      }
    };
  }

  private static mapWorkLoad(workloadPercentageMin: number, workloadPercentageMax: number) {
    return { min: workloadPercentageMin, max: workloadPercentageMax };
  }

  private static mapResidences(residences: Canton[]) {
    return residences ? residences.map((residence) => residence.toString()) : null;
  }

}
