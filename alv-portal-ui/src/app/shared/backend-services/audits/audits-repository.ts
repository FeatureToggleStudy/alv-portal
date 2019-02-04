import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from '../request-util';
import { Injectable } from '@angular/core';

@Injectable()
export class AuditsRepository {

  public static AUDITS_URL = '/management/audits';

  constructor(private http: HttpClient) { }

  query(reg: any): Observable<Audit[]> {
    const params: HttpParams = createRequestOption(reg);

    return this.http.get<Audit[]>(AuditsRepository.AUDITS_URL, {params});
  }
}
