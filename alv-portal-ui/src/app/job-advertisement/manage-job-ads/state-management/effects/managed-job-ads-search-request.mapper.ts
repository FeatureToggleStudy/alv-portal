import { ManagedJobAdsSearchFilter, MangedJobAdsSort, SortDirection } from '../state';
import { ManagedJobAdsSearchRequest } from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';

const ITEMS_PER_PAGE = 20;

export const DEFAULT_SORT = 'jobAdvertisement.stellennummerEgov,desc';

export class ManagedJobAdsSearchRequestMapper {

  static mapToRequest(filter: ManagedJobAdsSearchFilter, page: number, companyExternalId: string): ManagedJobAdsSearchRequest {
    return {
      body: {
        companyId: companyExternalId,
        jobTitle: filter.query,
        onlineSinceDays: filter.onlineSinceDays
      },
      page: page,
      size: ITEMS_PER_PAGE,
      sort: ManagedJobAdsSearchRequestMapper.mapSorting(filter.sort)
    };
  }

  private static mapSorting(sort: { column: MangedJobAdsSort, direction: SortDirection }) {
    return `${sort.column},${sort.direction}`;
  }

}
