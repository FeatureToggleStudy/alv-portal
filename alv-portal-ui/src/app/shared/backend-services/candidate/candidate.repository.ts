import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createPageableURLSearchParams } from '../request-util';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/operators';
import {
  Candidate,
  CandidateSearchRequest,
  CandidateSearchResponse
} from './candidate.types';

@Injectable({ providedIn: 'root' })
export class CandidateRepository {
  private resourceUrl = 'candidateservice/api/candidates';

  private searchUrl = 'candidateservice/api/_search/candidates';

  private countUrl = 'candidateservice/api/_count/candidates';

  constructor(private http: HttpClient) {
  }

  search(request: CandidateSearchRequest): Observable<CandidateSearchResponse> {
    const params = createPageableURLSearchParams(request);
    return this.http.post<Candidate[]>(this.searchUrl, request.body, {
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

}
