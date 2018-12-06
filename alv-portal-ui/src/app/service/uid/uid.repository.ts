import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from './uid.types';

@Injectable({
  providedIn: 'root'
})
export class UidRepository {

  private readonly COMPANY_BY_UID_URL = 'api/getCompanyByUid';

  constructor(private http: HttpClient) {
  }

  getCompanyByUid(uid: number): Observable<Company> {
    return this.http.post<Company>(this.COMPANY_BY_UID_URL, uid);
  }

  // e.g. CHE-123.456.789 -> 123456789
  extractCompanyUid(uid: string): number {
    return parseInt(uid
        .replace(new RegExp('CHE\-', 'g'), '')
        .replace(new RegExp('\\.', 'g'), '')
        .replace(new RegExp('\-', 'g'), ''), 10);
  }
}
