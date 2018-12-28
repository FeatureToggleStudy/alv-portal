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
  /**
   *
   * @param candidateProfile
   * @param jobCenter
   * @param jobExperiencesModels sorted in the way that the last job experience is the first element
   */
  constructor(public candidateProfile: CandidateProfile,
              public jobCenter: JobCenter,
              public jobExperiencesModels?: JobExperienceModel[]) {
  }

  get lastJobExperience() {
    return this.jobExperiencesModels[0];
  }

  get olderJobExperiences() {
    return this.jobExperiencesModels.slice(1);
  }

  get languages() {
    return this.candidateProfile.languages.map(l => Object.assign({}, l, { languageIsoCode: l.code }));
  }
}

export interface JobExperienceModel {
  jobExperience: JobExperience;
  occupationLabel: string;
}
