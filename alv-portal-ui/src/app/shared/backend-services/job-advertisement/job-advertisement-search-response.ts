import { JobAdvertisement } from './job-advertisement.model';

export interface JobAdvertisementSearchResponse {
  totalCount: number;
  result: Array<JobAdvertisement>;
}
