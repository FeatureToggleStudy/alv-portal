import {
  AUDITS_ITEMS_PER_PAGE,
  AuditsFilter,
  AuditsSearchRequest
} from '../../shared/backend-services/audits/audits.types';
import { now, toISOLocalDate, tomorrow } from '../../shared/forms/input/ngb-date-utils';

export const initAuditsSort = 'auditEventDate,desc';

export const initAuditsFilter: AuditsFilter = {
  fromDate: toISOLocalDate(now()),
  toDate: toISOLocalDate(tomorrow()),
  sort: initAuditsSort
};

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

}
