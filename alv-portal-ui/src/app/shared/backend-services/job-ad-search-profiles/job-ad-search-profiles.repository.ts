import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


import { map } from 'rxjs/operators';
import { createPageableURLSearchParams } from '../request-util';
import {
  JobAdSearchProfile,
  JobAdSearchProfilesSearchResponse,
  JobAdvertisementSearchResponse
} from '../job-advertisement/job-advertisement.types';

@Injectable({ providedIn: 'root' })
export class JobAdSearchProfilesRepository {

  private readonly resourceUrl = '/jobadservice/api/searchProfiles';

  private readonly searchUrl = `${this.resourceUrl}/_search`;

  constructor(private http: HttpClient) {
  }

  create(jobAdSearchProfile: JobAdSearchProfile): Observable<JobAdSearchProfile> {
    return this.http.post<JobAdSearchProfile>(this.resourceUrl, jobAdSearchProfile);
  }

  update(jobAdSearchProfile: JobAdSearchProfile): Observable<JobAdSearchProfile> {
    return this.http.put<JobAdSearchProfile>(this.resourceUrl + '/' + jobAdSearchProfile.id, jobAdSearchProfile);
  }

  search(ownerUserId: string): Observable<JobAdSearchProfilesSearchResponse> {
    const params = createPageableURLSearchParams({page: 1, size: 10});
    return this.http.get<JobAdSearchProfile[]>(this.searchUrl, {
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

  findById(id: string): Observable<JobAdSearchProfile> {
    return this.http.get<JobAdSearchProfile>(`${this.resourceUrl}/${id}`);
  }

}
