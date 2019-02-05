import {
  AUDITS_ITEMS_PER_PAGE,
  AuditsFilter,
  AuditsSearchRequest
} from '../../shared/backend-services/audits/audits.types';
import { tomorrow, now, toISOLocalDate } from '../../shared/forms/input/ngb-date-utils';

export class AuditsRequestMapper {

  static mapToRequest(filter: AuditsFilter, page: number): AuditsSearchRequest {
    return {
      page: page,
      size: AUDITS_ITEMS_PER_PAGE,
      sort: filter.sort,
      fromDate: filter.fromDate,
      toDate: filter.toDate
    };
  }

  static mapToInitialRequest(): AuditsSearchRequest {
    return {
      page: 0,
      size: AUDITS_ITEMS_PER_PAGE,
      sort: 'auditEventDate,desc',
      fromDate: toISOLocalDate(now()),
      toDate: toISOLocalDate(tomorrow())
    };
  }

}
