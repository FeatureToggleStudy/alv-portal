import { Injectable } from '@angular/core';
import { Accountability, CompanyContactTemplate } from './user-info.types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserInfoRepository {

  public static USER_INFO_URL = '/api/user-info/';

  constructor(private http: HttpClient) {
  }

  public findCompanyContactTemplate(userId: string, companyId: string): Observable<CompanyContactTemplate> {
    return this.http.get<CompanyContactTemplate>(`${UserInfoRepository.USER_INFO_URL}${userId}/company-contact-template/${companyId}`);
  }

  public findAccountabilities(userId: string): Observable<Accountability[]> {
    return this.http.get<Array<Accountability>>(`${UserInfoRepository.USER_INFO_URL}${userId}/accountabilities`);
  }

  public createCompanyContactTemplate(userId: string, companyContactTemplate: CompanyContactTemplate): Observable<void> {
    return this.http.post<void>(`${UserInfoRepository.USER_INFO_URL}${userId}/company-contact-templates`, companyContactTemplate);
  }

}
