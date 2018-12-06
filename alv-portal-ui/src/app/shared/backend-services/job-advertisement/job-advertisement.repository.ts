import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateJobAdvertisement,
  JobAdvertisement,
  JobAdvertisementCancelRequest,
  JobAdvertisementSearchRequest,
  JobAdvertisementSearchRequestBody,
  JobAdvertisementSearchResponse,
  JobAdvertisementStatus,
  PEAJobAdsSearchRequest
} from './job-advertisement.types';

import { ResponseWrapper } from '../../model/response-wrapper.model';
import { map } from 'rxjs/operators';
import { createPageableURLSearchParams } from '../../model/request-util';

@Injectable({ providedIn: 'root' })
export class JobAdvertisementRepository {

  private readonly resourceUrl = 'jobadservice/api/jobAdvertisements';

  private readonly searchUrl = `${this.resourceUrl}/_search`;

  private readonly countUrl = `${this.resourceUrl}/_count`;

  constructor(
    private http: HttpClient
  ) {
  }

  save(jobPublication: CreateJobAdvertisement): Observable<ResponseWrapper> {
    return this.http.post(this.resourceUrl, jobPublication, { observe: 'response' }).pipe(
      map((resp: HttpResponse<JobAdvertisement>) => new ResponseWrapper(resp.headers, resp.body, resp.status)));
  }

  searchPEAJobAds(request: PEAJobAdsSearchRequest): Observable<ResponseWrapper> {
    const params = createPageableURLSearchParams(request);

    return this.http.post(`${this.searchUrl}/pea`, request.body, {
      params,
      observe: 'response'
    }).pipe(
      map((resp) => new ResponseWrapper(resp.headers, resp.body, resp.status)));
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

  count(request: JobAdvertisementSearchRequestBody): Observable<number> {
    return this.http.post(this.countUrl, request, { observe: 'response' }).pipe(
      map((resp) => (<any>resp.body).totalCount));
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

  cancel(jobAdCancelRequest: JobAdvertisementCancelRequest): Observable<number> {
    const { code } = jobAdCancelRequest;
    let params = new HttpParams();
    if (jobAdCancelRequest.token) {
      params = params.set('token', jobAdCancelRequest.token);
    }
    return this.http.patch(`${this.resourceUrl}/${jobAdCancelRequest.id}/cancel`,
      { code }, { params, observe: 'response' }).pipe(
      map((result) => result.status));
  }

  isJobAdvertisementCancellable(status: string | JobAdvertisementStatus): boolean {
    const statusEnum = typeof status === 'string' ? JobAdvertisementStatus[status] : status;
    return statusEnum !== JobAdvertisementStatus.INSPECTING
      && statusEnum !== JobAdvertisementStatus.REJECTED
      && statusEnum !== JobAdvertisementStatus.CANCELLED
      && statusEnum !== JobAdvertisementStatus.ARCHIVE;
  }
}
