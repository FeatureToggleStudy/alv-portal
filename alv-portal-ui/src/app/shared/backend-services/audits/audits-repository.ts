import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createPageableURLSearchParams, createRequestOption } from '../request-util';
import { Injectable } from '@angular/core';
import { Audit, AuditsSearchRequest, AuditsSearchResponse } from './audits.types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuditsRepository {

  public static AUDITS_URL = '/management/audits';

  constructor(private http: HttpClient) { }

  query2(request: AuditsSearchRequest): Observable<AuditsSearchResponse> {
    const params = createPageableURLSearchParams(request);
    const body = {fromDate: request.fromDate, toDate: request.toDate};

    return this.http.post<Audit[]>(AuditsRepository.AUDITS_URL, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
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

  query1(reg: any): Observable<Audit[]> {
    const params: HttpParams = createRequestOption(reg);

    return this.http.get<Audit[]>(AuditsRepository.AUDITS_URL, {params});
  }

  query(req: AuditsSearchRequest): Observable<Audit[]> {
    let params: HttpParams = createRequestOption(req);

    const requestURL = '/management/audits';

    return this.http.get<Audit[]>(requestURL);
  }
}
