import { JobAdvertisementStatus } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';

export interface ManagedJobAdSearchFilterValues {
  onlineSinceDays: number;
  ownerUserId: string;
  status: JobAdvertisementStatus;
}
