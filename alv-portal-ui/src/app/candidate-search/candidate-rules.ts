import {
  CandidateProfile,
  JobExperience
} from '../shared/backend-services/candidate/candidate.types';
import {
  Degree,
  Experience,
  Gender,
  Graduation
} from '../shared/backend-services/shared.types';
import { GenderAwareOccupationLabel } from '../shared/occupations/occupation.service';
import { OccupationCode } from '../shared/backend-services/reference-service/occupation-label.types';
import { User, UserRole } from '../core/auth/user.model';


const matches = (jobExperience: JobExperience, occupationCode: { value: string; type: string }) => {
  const { avamCode, bfsCode, sbn3Code, sbn5Code } = jobExperience.occupation;
  return (String(avamCode) === occupationCode.value && occupationCode.type.toLowerCase() === 'avam')
    || (String(bfsCode) === occupationCode.value && occupationCode.type.toLowerCase() === 'bfs')
    || (String(sbn3Code) === occupationCode.value && occupationCode.type.toLowerCase() === 'sbn3')
    || (String(sbn5Code) === occupationCode.value && occupationCode.type.toLowerCase() === 'sbn5');
};

const hasOccupationCode = (jobExperience: JobExperience, occupationCode: OccupationCode) => {
  if (!occupationCode.mapping) {
    return matches(jobExperience, occupationCode);
  } else {
    return matches(jobExperience, occupationCode) || matches(jobExperience, occupationCode.mapping);
  }
};

const getBestMatchingJobExperience = (selectedOccupationCodes: OccupationCode[], jobExperiences: JobExperience[]) => {

  const matchingExperiences = selectedOccupationCodes
    .map((occupationCode) => jobExperiences.find((jobExperience) => hasOccupationCode(jobExperience, occupationCode)))
    .filter((jobExperience) => !!jobExperience)
    .reduce((acc, curr) => {
      const key = JSON.stringify(curr);
      if (!acc[key]) {
        acc[key] = { count: 0, jobExperience: curr };
      }
      acc[key].count++;

      return acc;
    }, []);

  const matchingExperienceKeys = Object.keys(matchingExperiences);
  if (matchingExperienceKeys.length > 0) {
    const bestMatchingExperienceKey = matchingExperienceKeys
      .sort((k1, k2) => matchingExperiences[k1].count === matchingExperiences[k2].count
        ? 0
        : matchingExperiences[k1].count > matchingExperiences[k2].count ? -1 : 1
      )[0];

    return matchingExperiences[bestMatchingExperienceKey].jobExperience;
  } else {
    return null;
  }
};

export const findRelevantJobExperience = (candidateProfile: CandidateProfile, selectedOccupationCodes?: OccupationCode[]): JobExperience => {
  const jobExperiences = candidateProfile.jobExperiences;
  const wantedJobExperiences = jobExperiences.filter((jobExperience) => jobExperience.wanted);
  if (!wantedJobExperiences) {
    return null;
  }

  if (selectedOccupationCodes) {
    const bestMatchingJobExperience = getBestMatchingJobExperience(selectedOccupationCodes, jobExperiences);
    if (bestMatchingJobExperience) {
      return bestMatchingJobExperience;
    }
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

export const extractGenderAwareTitle = (candidateProfile, occupationLabel: GenderAwareOccupationLabel): string => {
  if (candidateProfile.gender === Gender.MALE && occupationLabel.male) {
    return occupationLabel.male;
  } else if (candidateProfile.gender === Gender.FEMALE && occupationLabel.female) {
    return occupationLabel.female;
  }
  return occupationLabel.default;
};

export const isDisplayGraduation = (graduation: Graduation): boolean => {
  return graduation && graduation !== Graduation[Graduation.NONE];
};

export const isDisplayDegree = (degree: Degree): boolean => {
  return degree && Degree[degree] >= Degree.SEK_II_WEITERFUEHRENDE_SCHULE
    && Degree[degree] <= Degree.TER_DOKTORAT_UNIVERSITAET;
};


export const canViewCandidateProtectedData = (candidateProfile: CandidateProfile, currentUser: User): boolean => {
  return Boolean(currentUser && currentUser.hasAnyAuthorities([UserRole.ROLE_PAV, UserRole.ROLE_ADMIN]) && candidateProfile.showProtectedData);
}
