import { ManagedJobAdsSearchFilter, ManagedJobAdsSort, SortDirection } from '../state';
import { ManagedJobAdsSearchRequest } from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';

const ITEMS_PER_PAGE = 20;

export const DEFAULT_SORT = 'jobAdvertisement.stellennummerEgov,desc';

export class ManagedJobAdsSearchRequestMapper {

  static mapToRequest(filter: ManagedJobAdsSearchFilter, page: number, companyExternalId: string): ManagedJobAdsSearchRequest {
    return {
      body: {
        companyId: companyExternalId,
        keywordsText: filter.query,
        onlineSinceDays: filter.onlineSinceDays,
        status: filter.status,
        ownerUserId: filter.ownerUserId
      },
      page: page,
      size: ITEMS_PER_PAGE,
      sort: ManagedJobAdsSearchRequestMapper.mapSorting(filter.sort)
    };
  }

  private static mapSorting(sort: { column: ManagedJobAdsSort, direction: SortDirection }) {
    return `${sort.column},${sort.direction}`;
  }

}
