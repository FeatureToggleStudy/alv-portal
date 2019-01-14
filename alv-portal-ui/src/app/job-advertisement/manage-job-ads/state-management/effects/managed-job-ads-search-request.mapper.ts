import { ManagedJobAdsSearchFilter, ManagedJobAdsSort, SortDirection } from '../state';
import { ManagedJobAdsSearchRequest } from '../../../../shared/backend-services/job-advertisement/job-advertisement.types';

const ITEMS_PER_PAGE = 20;

export const DEFAULT_SORT = 'jobAdvertisement.stellennummerEgov,desc';

export class ManagedJobAdsSearchRequestMapper {

  static mapToRequest(filter: ManagedJobAdsSearchFilter, page: number, companyExternalId: string, itemsperpage = ITEMS_PER_PAGE): ManagedJobAdsSearchRequest {
    return {
      body: {
        companyId: companyExternalId,
        keywordsText: filter.query,
        onlineSinceDays: filter.onlineSinceDays,
        ownerUserId: filter.ownerUserId //todo add this as soon as the staging backend is ready
      },
      page: page,
      size: itemsperpage,
      sort: ManagedJobAdsSearchRequestMapper.mapSorting(filter.sort)
    };
  }

  private static mapSorting(sort: { column: ManagedJobAdsSort, direction: SortDirection }) {
    return `${sort.column},${sort.direction}`;
  }

}
