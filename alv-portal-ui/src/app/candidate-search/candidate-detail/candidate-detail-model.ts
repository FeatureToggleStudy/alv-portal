import {
  CandidateProfile,
  JobExperience
} from '../../shared/backend-services/candidate/candidate.types';
import { JobCenter } from '../../shared/backend-services/reference-service/job-center.types';

/**
 * A "view-model" for the Candidate-Detail Page that has all of our business logic in it to
 * avoid duplication and calculations in functions. Delegate pattern.
 */
export class CandidateDetailModel {
  constructor(public candidateProfile: CandidateProfile,
              public lastJobOccupationLabel: string,
              public jobCenter: JobCenter,
              public jobExperiencesModels?: JobExperienceModel[]) {
  }
}

export interface JobExperienceModel {
  jobExperience: JobExperience
  occupationLabel: string;
}
