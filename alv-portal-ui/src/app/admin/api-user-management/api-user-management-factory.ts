import { ApiUserColumnDefinition } from '../../shared/backend-services/api-user-management/api-user-management.types';

export const KEYWORD_FIELDS = ['createDate', 'lastAccessDate', 'active'];
export const SUCCESS = 'portal.admin.user-info.alert.unregister-success';
export const FAILURE = 'portal.admin.user-info.alert.unregister-technical';

export const mapApiUserColumnDefinitionToSort = (currentSorting: ApiUserColumnDefinition, selectedColumn: string): string => {
  const column = KEYWORD_FIELDS.indexOf(selectedColumn) >= 0
    ? `apiUser.${selectedColumn}`
    : `apiUser.${selectedColumn}.keyword`;
  const sort = (currentSorting.columnName !== selectedColumn)
    ? 'asc' : (currentSorting.sorting === 'asc') ? 'desc' : 'asc';

  return `${column},${sort}`;
};

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

export const prepareApiUserColumns = (): ApiUserColumnDefinition[] => {
  return [{
    columnName: 'username',
    sorting: ''
  }, {
    columnName: 'companyName',
    sorting: ''
  }, {
    columnName: 'companyEmail',
    sorting: ''
  }, {
    columnName: 'technicalContactName',
    sorting: ''
  }, {
    columnName: 'technicalContactEmail',
    sorting: ''
  }, {
    columnName: 'createDate',
    sorting: ''
  }, {
    columnName: 'lastAccessDate',
    sorting: ''
  }, {
    columnName: 'active',
    sorting: ''
  }];
};

