import { Injectable } from '@angular/core';
import { Accountability, CompanyContactTemplate, UserInfoDTO } from './user-info.types';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  public loadUserByEmail(email: string): Observable<any> {
    const params = new HttpParams().set('eMail', email);
    return this.http.get<UserInfoDTO>(UserInfoRepository.USER_INFO_URL, { params: params });
  }

  public loadUserRoles(userId: string): Observable<any> {
    return this.http.get<string[]>(`${UserInfoRepository.USER_INFO_URL}${userId}/roles`);
  }

  public unregisterUser(email: string, role: string): Observable<any> {
    const params = new HttpParams()
      .set('eMail', email)
      .set('role', role);
    return this.http.delete(UserInfoRepository.USER_INFO_URL, { params: params });
  }

}
