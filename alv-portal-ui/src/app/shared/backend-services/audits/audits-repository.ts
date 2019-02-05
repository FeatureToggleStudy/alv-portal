import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from '../request-util';
import { Injectable } from '@angular/core';
import { Audit, AuditsSearchRequest, AuditsSearchResponse } from './audits.types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuditsRepository {

  public static AUDITS_URL = '/management/audits';

  constructor(private http: HttpClient) { }

  query(request: AuditsSearchRequest): Observable<AuditsSearchResponse> {
    const params: HttpParams = createRequestOption(request);

    return this.http.get<Audit[]>(AuditsRepository.AUDITS_URL, {
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
}
