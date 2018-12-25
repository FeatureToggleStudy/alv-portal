import {
  CandidateProfile,
  JobExperience
} from '../shared/backend-services/candidate/candidate.types';
import { Experience, Gender } from '../shared/backend-services/shared.types';
import { GenderAwareOccupationLabel } from '../shared/occupations/occupation.service';

//todo: calculate the relevant jobExperience
export const findRelevantJobExperience = (candidateProfile: CandidateProfile): JobExperience => {
  const jobExperiences = candidateProfile.jobExperiences;
  const wantedJobExperiences = jobExperiences.filter((jobExperience) => jobExperience.wanted);
  if (!wantedJobExperiences) {
    return null;
  }

  const keywordHitJobExperience = jobExperiences
    .find((jobExperience) => jobExperience.remark && jobExperience.remark.indexOf('<em>') > -1);
  if (keywordHitJobExperience) {
    return keywordHitJobExperience;
  }

  const lastJobExperience = jobExperiences
    .find((jobExperience) => jobExperience.lastJob);
  if (lastJobExperience) {
    return lastJobExperience;
  }

  const mostExperienced = jobExperiences
    .sort((a, b) => +Experience[b.experience] - +Experience[a.experience])[0];
  if (mostExperienced) {
    return mostExperienced;
  }

  return jobExperiences[0];
};

export const extractGenderAwareTitle = (candidateProfile, occupationLabel: GenderAwareOccupationLabel) => {
  if (candidateProfile.gender === Gender.MALE && occupationLabel.male) {
    return occupationLabel.male;
  } else if (candidateProfile.gender === Gender.FEMALE && occupationLabel.female) {
    return occupationLabel.female;
  }
  return occupationLabel.default;
};
