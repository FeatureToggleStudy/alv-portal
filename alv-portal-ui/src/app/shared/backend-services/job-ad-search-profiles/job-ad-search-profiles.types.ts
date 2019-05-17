import {
  JobSearchFilterRequest,
  JobSearchFilterResponse
} from '../../../job-advertisement/job-ad-search/state-management/state';

export interface JobAdSearchProfilesSearchResponse {
  totalCount: number;
  result: JobAdSearchProfileRequest[];
}

export interface JobAdSearchProfileResponse {
  id?: string;
  name: string;
  ownerUserId: string;
  createdTime?: Date;
  updatedTime?: Date;
  searchFilter: JobSearchFilterResponse;
}

export interface JobAdSearchProfileRequest {
  id?: string;
  name: string;
  ownerUserId?: string;
  createdTime?: Date;
  updatedTime?: Date;
  searchFilter?: JobSearchFilterRequest;
}
