export interface ApiUserManagementFilter {
  query: string;
  sort: string;
}

export const initialFilter: ApiUserManagementFilter = {
  query: null,
  sort: 'apiUser.username.keyword,asc'
};

export interface ApiUser {
  id?: string;
  username: string;
  password?: string;
  companyEmail: string;
  companyName: string;
  technicalContactName: string;
  technicalContactEmail: string;
  active?: boolean;
  lastAccessDate?: Date;
  createDate?: Date;
}

export interface ApiUserSearchRequest {
  page: number;
  size: number;
  query: string;
  sort: string;
}

export interface ApiUserSearchResponse {
  result: ApiUser[];
  totalCount: number;
}

export interface ApiUserUpdatePasswordRequest {
  apiUserId: string;
  password: string;
}

export interface ApiUserColumnDefinition {
  columnName: string;
  sorting: string;
}
