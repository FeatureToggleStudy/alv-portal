import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';


import { map } from 'rxjs/operators';
import { createPageableURLSearchParams } from '../request-util';
import {
  JobAdSearchProfileRequest,
  JobAdSearchProfileResponse,
  JobAdSearchProfilesSearchResponse
} from '../job-advertisement/job-advertisement.types';

@Injectable({ providedIn: 'root' })
export class JobAdSearchProfilesRepository {

  private readonly resourceUrl = '/jobadservice/api/searchProfiles';

  private readonly searchUrl = `${this.resourceUrl}/_search`;

  constructor(private http: HttpClient) {
  }

  create(jobAdSearchProfile: JobAdSearchProfileRequest): Observable<JobAdSearchProfileRequest> {
    return this.http.post<JobAdSearchProfileRequest>(this.resourceUrl, jobAdSearchProfile);
  }

  update(jobAdSearchProfile: JobAdSearchProfileRequest): Observable<JobAdSearchProfileRequest> {
    return this.http.put<JobAdSearchProfileRequest>(this.resourceUrl + '/' + jobAdSearchProfile.id, {
      name: jobAdSearchProfile.name,
      searchFilter: jobAdSearchProfile.searchFilter
    });
  }

  delete(jobAdSearchProfileId: string): Observable<void> {
    return this.http.delete<void>(this.resourceUrl + '/' + jobAdSearchProfileId);
  }

  search(ownerUserId: string, page = 0, size = 10): Observable<JobAdSearchProfilesSearchResponse> {
    let params = createPageableURLSearchParams({ page: page, size: size });
    params = params.set('ownerUserId', ownerUserId);
    return this.http.get<JobAdSearchProfileRequest[]>(this.searchUrl, {
      params,
      observe: 'response'
    }).pipe(
      map((resp) => {
        return {
          totalCount: parseInt(resp.headers.get('X-Total-Count'), 10),
          result: resp.body
        };
      }));
    // return of({
    //   totalCount: 203,
    //   result: mockJobsWithFavourites
    // });
  }

  findById(id: string): Observable<JobAdSearchProfileResponse> {
    return this.http.get<JobAdSearchProfileResponse>(`${this.resourceUrl}/${id}`);
  }

}
