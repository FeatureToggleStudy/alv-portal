import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createPageableURLSearchParams } from '../request-util';

import {
  CandidateSearchProfileResult,
  CandidateSearchProfilesSearchResponse,
  CreateCandidateSearchProfile,
  ResolvedCandidateSearchProfile,
  UpdateCandidateSearchProfile
} from './candidate-search-profiles.types';

@Injectable({ providedIn: 'root' })
export class CandidateSearchProfilesRepository {

  private readonly resourceUrl = '/candidateservice/api/searchProfiles';

  private readonly searchUrl = `${this.resourceUrl}/_search`;

  constructor(private http: HttpClient) {
  }

  create(candidateSearchProfile: CreateCandidateSearchProfile): Observable<ResolvedCandidateSearchProfile> {
    return this.http.post<ResolvedCandidateSearchProfile>(this.resourceUrl, candidateSearchProfile);
  }

  update(candidateSearchProfileId: string, candidateSearchProfile: UpdateCandidateSearchProfile): Observable<ResolvedCandidateSearchProfile> {
    return this.http.put<ResolvedCandidateSearchProfile>(this.resourceUrl + '/' + candidateSearchProfileId, candidateSearchProfile);
  }

  delete(candidateSearchProfileId: string): Observable<void> {
    return this.http.delete<void>(this.resourceUrl + '/' + candidateSearchProfileId);
  }

  search(ownerUserId: string, page = 0, size = 10): Observable<CandidateSearchProfilesSearchResponse> {
    let params = createPageableURLSearchParams({ page: page, size: size });
    params = params.set('ownerUserId', ownerUserId);
    return this.http.get<CandidateSearchProfileResult[]>(this.searchUrl, {
      params,
      observe: 'response'
    }).pipe(
      map((resp) => {
        return {
          totalCount: parseInt(resp.headers.get('X-Total-Count'), 10),
          result: resp.body
        };
      }));
  }

  findById(id: string): Observable<ResolvedCandidateSearchProfile> {
    return this.http.get<ResolvedCandidateSearchProfile>(`${this.resourceUrl}/${id}`);
  }

}
