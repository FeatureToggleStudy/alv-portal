import {
  AUDITS_ITEMS_PER_PAGE,
  AuditsColumnDefinition,
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

export function mapAuditsToRequest(filter: AuditsFilter, page: number): AuditsSearchRequest {
  return {
    page: page,
    size: AUDITS_ITEMS_PER_PAGE,
    sort: filter.sort,
    fromDate: filter.fromDate,
    toDate: filter.toDate
  };
}

/**
 *
 * Function for converting structured object mapping with columnName and sortOrder
 * to string consisting of columnName and sortOder that we use in http post backend request
 * <p>
 * e.g.
 * {@AuditsColumnDefinition} columnName: 'timestamp', sortOrder: 'asc' ==> {@string} 'auditEventDate,asc'
 *
 * @param current
 *    mapped, structure object with 'columnName' and 'sortOrder'
 * @param selected
 *    selected column for sorting
 * @return
 *    {@string}
 */
export function mapAuditsColumnDefinitionToSort(current: AuditsColumnDefinition, selected: string): string {
  const column = (selected === 'type') ? 'auditEventType' : 'auditEventDate';
  let sort;
  if ((current.columnName !== selected) || (current.sortOrder === 'desc')) {
    sort = 'asc';
  } else {
    sort = 'desc';
  }

  return `${column},${sort}`;
}

/**
 *
 * Function for converting string from http post backend response to
 * structured object mapping with columnName and sortOrder
 * <p>
 * e.g.
 * {@string} 'auditEventDate,asc' ==> {@AuditsColumnDefinition} columnName: 'timestamp', sortOrder: 'asc'
 * {@string} 'apiUser.username.keyword,asc' ==> {@AuditsColumnDefinition} columnName: 'username', sorting: 'asc'
 *
 * @param sort
 *    sorting string from http post response
 * @return
 *    {@AuditsColumnDefinition}
 */

export function mapSortToAuditsColumnDefinition(sort: string): AuditsColumnDefinition {
  if (sort && sort.includes(',')) {
    const array = sort.split(',', 2);
    return {
      columnName: (array[0] === 'auditEventType') ? 'type' : 'timestamp',
      sortOrder: array[1],
      sortable: true
    };
  } else {
    return {
      columnName: 'timestamp',
      sortOrder: 'desc',
      sortable: true
    };
  }
}
