import { CandidateSearchRequest } from '../../../shared/backend-services/candidate/candidate.types';
import { CandidateSearchFilter } from '..';

const ITEMS_PER_PAGE = 20;

export class CandidateSearchRequestMapper {

  public static mapToRequest(candidateSearchFilter: CandidateSearchFilter, page: number): CandidateSearchRequest {
    return {
      page: page,
      size: ITEMS_PER_PAGE,
      body: {}
    };
  }

}
