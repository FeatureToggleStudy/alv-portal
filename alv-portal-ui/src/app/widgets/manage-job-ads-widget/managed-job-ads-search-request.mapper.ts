import { ManagedJobAdsSearchRequest } from '../../shared/backend-services/job-advertisement/job-advertisement.types';
import {
  ManagedJobAdsSearchFilter,
  MangedJobAdsSorting
} from './job-ad-management-table/job-ad-management.table-types';

const DEFAULT_ITEMS_PER_PAGE = 20;

export class ManagedJobAdsSearchRequestMapper {

  static mapToRequest(filter: ManagedJobAdsSearchFilter, page: number, companyExternalId: string, resultSize = DEFAULT_ITEMS_PER_PAGE): ManagedJobAdsSearchRequest {
    return {
      body: {
        companyId: companyExternalId,
        keywordsText: filter.query,
        onlineSinceDays: filter.onlineSinceDays,
        ownerUserId: filter.ownerUserId,
        //status: filter.status
      },
      page: page,
      size: resultSize,
      sort: ManagedJobAdsSearchRequestMapper.mapSorting(filter.sort)
    };
  }

  private static mapSorting(sort: MangedJobAdsSorting) {
    return `${sort.column},${sort.direction}`;
  }

}
