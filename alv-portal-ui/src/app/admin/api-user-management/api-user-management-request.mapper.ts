import {
  ApiUserColumnDefinition,
  ApiUserManagementFilter,
  ApiUserSearchRequest, ApiUserUpdatePasswordRequest
} from '../../shared/backend-services/api-user-management/api-user-management.types';

export const KEYWORD_FIELDS = ['createDate', 'lastAccessDate', 'active'];

export const API_USERS_PER_PAGE = 20;

export function mapToRequest(filter: ApiUserManagementFilter, page: number): ApiUserSearchRequest {
  return {
    page: page,
    size: API_USERS_PER_PAGE,
    sort: filter.sort,
    query: filter.query
  };
}

export function mapPasswordToRequest(id: string, password: string): ApiUserUpdatePasswordRequest {
  return {
    apiUserId: id,
    password: password
  };
}

/**
 *
 * Function for converting structured object mapping with columnName and sortOrder
 * to string consisting of columnName and sortOder that we use in http post backend request
 * <p>
 * e.g.
 * {@ApiUserColumnDefinition} columnName: 'username', sorting: 'asc' ==> {@string} 'apiUser.username.keyword,asc'
 *
 * @param currentSorting
 *    mapped, structure object with 'columnName' and 'sorting' attributes
 * @param selectedColumn
 *    selected column for sorting
 * @return
 *    {@string}
 */
export function mapApiUserColumnDefinitionToSort(currentSorting: ApiUserColumnDefinition, selectedColumn: string): string {
  const column = KEYWORD_FIELDS.indexOf(selectedColumn) >= 0
    ? `apiUser.${selectedColumn}`
    : `apiUser.${selectedColumn}.keyword`;
  let sort;
  if ((currentSorting.columnName !== selectedColumn) || (currentSorting.sorting === 'desc')) {
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
 * {@string} 'apiUser.username.keyword,asc' ==> {@ApiUserColumnDefinition} columnName: 'username', sorting: 'asc'
 *
 * @param filterSort
 *    sorting string from http post response
 * @return
 *    {@ApiUserColumnDefinition}
 */
export function mapSortToApiUserColumnDefinition(filterSort: string): ApiUserColumnDefinition {
  if (filterSort && filterSort.includes(',')) {
    const array = filterSort.split(',', 2);
    const colModified = array[0].replace('apiUser.', '');
    return {
      columnName: colModified.replace('.keyword', ''),
      sorting: array[1]
    };

  } else {
    return {
      columnName: 'id',
      sorting: 'asc'
    };
  }
}
