import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createPageableURLSearchParams } from '../request-util';
import { Observable, of } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';
import {
  CandidateProfile,
  CandidateProtectedData,
  CandidateSearchRequest,
  CandidateSearchResponse
} from './candidate.types';
import { JobAdvertisement } from '../job-advertisement/job-advertisement.types';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { UserRole } from '../../../core/auth/user.model';

@Injectable({ providedIn: 'root' })
export class CandidateRepository {

  private resourceUrl = '/candidateservice/api/candidates';

  private searchUrl = '/candidateservice/api/_search/candidates';

  private countUrl = '/candidateservice/api/_count/candidates';

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService,) {
  }

  searchCandidateProfiles(request: CandidateSearchRequest): Observable<CandidateSearchResponse> {
    const params = createPageableURLSearchParams(request);
    return this.http.post<CandidateProfile[]>(this.searchUrl, request.body, {
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

  findById(id: string): Observable<JobAdvertisement> {
    return this.http.get<JobAdvertisement>(`${this.resourceUrl}/${id}`);
  }

  findCandidateProfileById(id: string): Observable<CandidateProfile> {
    return this.http.get<CandidateProfile>(`${this.resourceUrl}/profiles/${id}`);
  }

  getCandidateProtectedData(candidateProfile): Observable<CandidateProtectedData> {
    return this.canViewCandidateProtectedData(candidateProfile).pipe(
      flatMap((canViewProtectedData) => {
        if (canViewProtectedData) {
          return this.http.get<CandidateProtectedData>(`${this.resourceUrl}/${candidateProfile.id}`);
        }
        return of(null as CandidateProtectedData);
      }));
  }

  private canViewCandidateProtectedData(candidateProfile: CandidateProfile): Observable<boolean> {
    return this.authenticationService.getCurrentUser().pipe(
      map(currentUser => currentUser && currentUser.hasAnyAuthorities([UserRole.ROLE_PAV]) && candidateProfile.showProtectedData),
      catchError(err => of(false))
    )
  }
}
