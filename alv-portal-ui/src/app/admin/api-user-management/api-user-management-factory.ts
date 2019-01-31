import { ApiUserColumnDefinition } from '../../shared/backend-services/api-user-management/api-user-management.types';

export const KEYWORD_FIELDS = ['createDate', 'lastAccessDate', 'active'];

export const COLUMN_NAMES = ['username', 'companyName', 'companyEmail', 'technicalContactName', 'technicalContactEmail',
  'createDate', 'lastAccessDate', 'active'];

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
export const mapApiUserColumnDefinitionToSort = (currentSorting: ApiUserColumnDefinition, selectedColumn: string): string => {
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
};

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
export const mapSortToApiUserColumnDefinition = (filterSort: string): ApiUserColumnDefinition => {
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
};

