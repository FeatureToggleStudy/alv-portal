import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ApiUser,
  ApiUserSearchRequest,
  ApiUserSearchResponse,
  ApiUserUpdatePasswordRequest
} from './api-user-management.types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createPageableURLSearchParams } from '../request-util';

@Injectable({
  providedIn: 'root'
})
export class ApiUserManagementRepository {

  private static API_USER_URL = '/jobadservice/api/apiUsers';

  constructor(private http: HttpClient) {}

  search2(request: ApiUserSearchRequest): Observable<ApiUser[]> {
    const params = createPageableURLSearchParams(request);
    const body = {query: request.query};

    return this.http.post<ApiUser[]>(`${ApiUserManagementRepository.API_USER_URL}/_search`, body, {params});
  }

  search(request: ApiUserSearchRequest): Observable<ApiUserSearchResponse> {
    const params = createPageableURLSearchParams(request);
    const body = {query: request.query};

    return this.http.post<ApiUser[]>(`${ApiUserManagementRepository.API_USER_URL}/_search`, body, {
      params,
      observe: 'response'
    }).pipe(
      map((response) => {
        return {
          result: response.body,
          totalCount: parseInt(response.headers.get('X-Total-Count'), 10)
        };
      }));
  }

  save(apiUser: ApiUser): Observable<ApiUser> {
    return this.http.post<ApiUser>(`${ApiUserManagementRepository.API_USER_URL}`, apiUser);
  }

  update(apiUser: ApiUser): Observable<ApiUser> {
    const apiUserId = apiUser.id;
    apiUser = {...apiUser, id: undefined};
    return this.http.put<ApiUser>(`${ApiUserManagementRepository.API_USER_URL}/${apiUserId}`, apiUser);
  }

  toggleStatus(apiUser: ApiUser): Observable<void> {
    const body = {active: apiUser.active};
    return this.http.put<void>(`${ApiUserManagementRepository.API_USER_URL}/${apiUser.id}/active`, body);
  }

  updatePassword(request: ApiUserUpdatePasswordRequest): Observable<void> {
    const id = request.apiUserId;
    const password = { password: request.password };
    return this.http.put<void>(`${ApiUserManagementRepository.API_USER_URL}/${id}/password`, password);
  }

  generatePassword(): string {
    return Math.random().toString(36).slice(-10);
  }

}
