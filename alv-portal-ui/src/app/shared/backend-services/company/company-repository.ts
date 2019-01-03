import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from './company.types';

@Injectable({
  providedIn: 'root'
})
export class CompanyRepository {

  private resourceUrl = '/api/company';

  constructor(private http: HttpClient) {
  }

  findByExternalId(id: string): Observable<Company> {
    return this.http.get<Company>(`${this.resourceUrl}/find/by-external-id`,
      { params: new HttpParams().set('id', id) });
  }

}
