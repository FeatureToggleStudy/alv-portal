import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateJobAdvertisement,
  JobAdvertisement,
  JobAdvertisementCancelRequest,
  JobAdvertisementSearchRequest,
  JobAdvertisementSearchResponse,
  ManagedJobAdsSearchRequest,
  ManagedJobAdsSearchResponse
} from './job-advertisement.types';

import { map } from 'rxjs/operators';
import { createPageableURLSearchParams } from '../request-util';

@Injectable({ providedIn: 'root' })
export class JobAdvertisementRepository {

  private readonly baseUrl = '/jobadservice/api';

  private readonly resourceUrl = `${this.baseUrl}/jobAdvertisements`;

  private readonly searchUrl = `${this.resourceUrl}/_search`;

  private readonly countUrl = `${this.resourceUrl}/_count`;

  constructor(private http: HttpClient) {
  }

  save(jobPublication: CreateJobAdvertisement): Observable<JobAdvertisement> {
    return this.http.post<JobAdvertisement>(this.resourceUrl, jobPublication);
  }

  searchManagedJobAds(request: ManagedJobAdsSearchRequest): Observable<ManagedJobAdsSearchResponse> {
    const params = createPageableURLSearchParams(request);
    return this.http.post<JobAdvertisement[]>(`${this.searchUrl}/managed`, request.body, {
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

  search(request: JobAdvertisementSearchRequest): Observable<JobAdvertisementSearchResponse> {
    const params = createPageableURLSearchParams(request);
    return this.http.post<JobAdvertisement[]>(this.searchUrl, request.body, {
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

  findByToken(token: string): Observable<JobAdvertisement> {
    return this.http.get<JobAdvertisement>(`${this.resourceUrl}/token/${token}`);
  }

  findByFingerprint(fingerprint: string): Observable<JobAdvertisement> {
    return this.http.get<JobAdvertisement>(`${this.resourceUrl}/byFingerprint/${fingerprint}`);
  }

  cancel(jobAdCancelRequest: JobAdvertisementCancelRequest): Observable<void> {
    const { code } = jobAdCancelRequest;
    let params = new HttpParams();
    if (jobAdCancelRequest.token) {
      params = params.set('token', jobAdCancelRequest.token);
    }
    return this.http.patch<void>(`${this.resourceUrl}/${jobAdCancelRequest.id}/cancel`, { code }, { params });
  }


}
