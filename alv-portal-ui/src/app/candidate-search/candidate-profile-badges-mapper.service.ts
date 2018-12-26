import { Injectable } from '@angular/core';
import {
  CandidateProfile,
  JobExperience
} from '../shared/backend-services/candidate/candidate.types';
import { InlineBadge } from '../shared/layout/inline-badges/inline-badge.types';

export enum CandidateProfileBadgeType {
  WORKPLACE, AVAILABILITY, WORKLOAD, EXPERIENCE
}

export interface CandidateProfileBadge extends InlineBadge {
  badgeType: CandidateProfileBadgeType;
}

const ALL = [
  CandidateProfileBadgeType.WORKPLACE,
  CandidateProfileBadgeType.AVAILABILITY,
  CandidateProfileBadgeType.WORKLOAD,
  CandidateProfileBadgeType.EXPERIENCE
];

@Injectable()
export class CandidateProfileBadgesMapperService {

  constructor() {
  }

  public map(candidateProfile: CandidateProfile, jobExperience?: JobExperience, badgeTypes = ALL): CandidateProfileBadge[] {
    const result: CandidateProfileBadge[] = [];
    if (candidateProfile.residenceCantonCode) {
      result.push({
        badgeType: CandidateProfileBadgeType.WORKPLACE,
        cssClass: 'badge-job-workplace',
        label: 'global.reference.canton.' + candidateProfile.residenceCantonCode
      });
    }
    if (candidateProfile.availability) {
      result.push({
        badgeType: CandidateProfileBadgeType.AVAILABILITY,
        cssClass: 'badge-availability',
        label: 'candidate-search.availability.' + candidateProfile.availability
      });
    }
    if (candidateProfile.workLoad) {
      result.push({
        badgeType: CandidateProfileBadgeType.WORKLOAD,
        cssClass: 'badge-workload',
        label: candidateProfile.workLoad + '%'
      });
    }
    if (jobExperience && jobExperience.experience) {
      result.push({
        badgeType: CandidateProfileBadgeType.EXPERIENCE,
        cssClass: 'badge-contract-type',
        label: 'global.experience.' + jobExperience.experience
      });
    }

    return result.filter((b) => badgeTypes.includes(b.badgeType));
  }
}
