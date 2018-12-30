import {
  CandidateProfile,
  CandidateProtectedData,
  JobExperience
} from '../../shared/backend-services/candidate/candidate.types';
import { JobCenter } from '../../shared/backend-services/reference-service/job-center.types';
import { LanguageSkill } from '../../shared/backend-services/shared.types';


/**
 * A "view-model" for the Candidate-Detail Page that has all of our business logic in it to
 * avoid duplication and calculations in functions. Delegate pattern.
 */
export class CandidateDetailModel {

  public workRegions: string[];

  constructor(public candidateProfile: CandidateProfile,
              public jobCenter: JobCenter,
              public jobExperiencesModels: JobExperienceModel[],
              public protectedData: CandidateProtectedData) {
    this.workRegions = this.calculateWorkRegions();
  }

  private calculateWorkRegions(): string[] {
    let result = [];
    if (this.candidateProfile.preferredWorkRegions) {
      result = result.concat(this.candidateProfile.preferredWorkRegions
        .map((i) => 'global.reference.region.' + i));
    }
    if (this.candidateProfile.preferredWorkCantons) {
      result = result.concat(this.candidateProfile.preferredWorkCantons
        .map((i) => 'global.reference.canton.' + i));
    }
    return result;
  }

  get lastJobExperience() {
    return this.jobExperiencesModels[0];
  }

  get olderJobExperiences() {
    return this.jobExperiencesModels.slice(1);
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
