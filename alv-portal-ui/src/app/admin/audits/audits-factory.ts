import { AuditsColumnDefinition } from '../../shared/backend-services/audits/audits.types';

export const AUDITS_COLUMN_NAME = ['date', 'principal', 'type', 'data'];

/**
 *
 * Function for converting structured object mapping with columnName and sortOrder
 * to string consisting of columnName and sortOder that we use in http post backend request
 * <p>
 * e.g.
 * {@AuditsColumnDefinition} columnName: 'auditEventDate', sortOrder: 'asc' ==> {@string} 'auditEventDate,asc'
 *
 * @param current
 *    mapped, structure object with 'columnName' and 'sortOrder'
 * @param selected
 *    selected column for sorting
 * @return
 *    {@string}
 */
export function mapAuditsColumnDefinitionToSort(current: AuditsColumnDefinition, selected: string): string {
  const column = (selected = 'type') ? 'auditEventType' : 'auditEventDate';
  let sort;
  if ((current.columnName !== selected) || (current.sortOrder === 'desc')) {
    sort = 'asc';
  } else {
    sort = 'desc';
  }

  return `${column},${sort}`;
}

export function mapSortToAuditsColumnDefinition(sort: string): AuditsColumnDefinition {
  if (sort && sort.includes(',')) {
    const array = sort.split(',', 2);
    return {
      columnName: (array[0] == 'auditEventType') ? 'type' : 'date',
      sortOrder: array[1],
      sortable: true
    };
  } else {
    return {
      columnName: 'date',
      sortOrder: 'desc',
      sortable: true
    };
  }

}
