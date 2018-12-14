import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UidCompany } from './uid.types';

@Injectable({
  providedIn: 'root'
})
export class UidSearchRepository {

  private readonly COMPANY_BY_UID_URL = '/api/getCompanyByUid';

  constructor(private http: HttpClient) {
  }

  getCompanyByUid(uid: number): Observable<UidCompany> {
    return this.http.post<UidCompany>(this.COMPANY_BY_UID_URL, uid);
  }

}
