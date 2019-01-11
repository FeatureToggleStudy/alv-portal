import { ManagedJobAdsSearchFilter } from '../state';
import { ManagedJobAdsSearchRequest } from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';

const ITEMS_PER_PAGE = 20;

export const DEFAULT_SORT = 'jobAdvertisement.stellennummerEgov,desc';

export class ManagedJobAdsSearchRequestMapper {

  static mapToRequest(filter: ManagedJobAdsSearchFilter, page: number, companyExternalId: string): ManagedJobAdsSearchRequest {
    return {
      body: {
        companyId: companyExternalId,
        jobTitle: null,
        onlineSinceDays: filter.onlineSinceDays
      },
      page: page,
      size: ITEMS_PER_PAGE,
      sort: DEFAULT_SORT
    };
  }
}
