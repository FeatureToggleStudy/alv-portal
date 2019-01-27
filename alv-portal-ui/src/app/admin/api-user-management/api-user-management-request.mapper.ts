import {
  ApiUserManagementFilter,
  ApiUserSearchRequest, ApiUserUpdatePasswordRequest
} from '../../shared/backend-services/api-user-management/api-user-management.types';

const ITEMS_PER_PAGE = 50;

export class ApiUserManagementRequestMapper {

  static mapToRequest(filter: ApiUserManagementFilter, page: number): ApiUserSearchRequest {
    return {
      page: page,
      size: ITEMS_PER_PAGE,
      sort: filter.sort,
      query: filter.query
    };
  }

  static mapPasswordToRequest(id: string, password: string): ApiUserUpdatePasswordRequest {
    return {
      apiUserId: id,
      password: password
    };
  }

}
