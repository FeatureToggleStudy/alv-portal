import {
  CandidateProfile,
  CandidateProtectedData,
  JobExperience
} from '../../shared/backend-services/candidate/candidate.types';
import { JobCenter } from '../../shared/backend-services/reference-service/job-center.types';
import { Contact, LanguageSkill } from '../../shared/backend-services/shared.types';
import { preferredWorkLocations } from '../candidate-rules';

/**
 * A "view-model" for the Candidate-Detail Page that has all of our business logic in it to
 * avoid duplication and calculations in functions. Delegate pattern.
 */
export class CandidateDetailModel {

  public workLocations: string[];

  constructor(public candidateProfile: CandidateProfile,
              public jobCenter: JobCenter,
              public jobExperiencesModels: JobExperienceModel[],
              public protectedData: CandidateProtectedData,
              public contact: Contact
  ) {
    this.workLocations = preferredWorkLocations(this.candidateProfile);
  }

  get lastJobExperience() {
    return this.jobExperiencesModels[0];
  }

  get languages(): LanguageSkill[] {
    return this.candidateProfile.languages
      .map(languageSkill => ({
        ...languageSkill,
        languageIsoCode: languageSkill.code
      }));
  }
}

export interface JobExperienceModel {
  jobExperience: JobExperience;
  occupationLabel: string;
  displayGraduation: boolean;
  displayDegree: boolean;
}

