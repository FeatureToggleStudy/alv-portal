export const AUDITS_ITEMS_PER_PAGE = 20;

export interface AuditData {
  remoteAddress: string;
  sessionId: string;
  type: string;
  message: string;
  details: string;
}

export interface Audit {
  data: AuditData;
  principal: string;
  timestamp: string;
  type: string;
}

export interface AuditsFilter {
  fromDate: string;
  toDate: string;
  sort: string;
}

export interface AuditsColumnDefinition {
  sortable: boolean;
  columnName: string;
  sortOrder: string;
}

export interface AuditsSearchRequest {
  page: number;
  size: number;
  fromDate: string;
  toDate: string;
  sort: string;
}

export interface AuditsSearchResponse {
  result: Audit[];
  totalCount: number;
}
