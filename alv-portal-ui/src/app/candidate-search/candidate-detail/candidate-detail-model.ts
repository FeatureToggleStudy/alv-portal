import { CandidateProfile } from '../../shared/backend-services/candidate/candidate.types';

/**
 * A "view-model" for the Candidate-Detail Page that has all of our business logic in it to
 * avoid duplication and calculations in functions. Delegate pattern.
 */
export class CandidateDetailModel {
  constructor(public candidateProfile: CandidateProfile,
              public lastJobOccupationLabel: string) {

  }
}
