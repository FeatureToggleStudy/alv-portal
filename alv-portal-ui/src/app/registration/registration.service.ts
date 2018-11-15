import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company, JobSeekerDetails } from './registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  readonly REGISTER_JOB_SEEKER_URL = 'api/registerJobseeker';
  readonly REQUEST_COMPANY_ACCESS_CODE_URL = 'api/requestEmployerAccessCode';
  readonly REQUEST_AGENT_ACCESS_CODE_URL = 'api/requestAgentAccessCode';
  readonly COMPANY_BY_UID_URL = 'api/getCompanyByUid';
  readonly REGISTER_BY_ACCESS_CODE = 'api/registerEmployerOrAgent';

  constructor(private http: HttpClient) {
  }

  registerJobSeeker(jobSeekerDetails: JobSeekerDetails): Observable<any> {
    return this.http.post(this.REGISTER_JOB_SEEKER_URL, jobSeekerDetails, {observe: 'response'});
  }

  requestEmployerAccessCode(uid: number): Observable<any> {
    return this.http.post(this.REQUEST_COMPANY_ACCESS_CODE_URL, uid);
  }

  getCompanyByUid(uid: number): Observable<Company> {
    return this.http.post(this.COMPANY_BY_UID_URL, uid, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  requestAgentAccessCode(avgId: string): Observable<any> {
    return this.http.post(this.REQUEST_AGENT_ACCESS_CODE_URL, avgId);
  }

  registerEmployerOrAgent(accessCode: string): Observable<any> {
    return this.http.post(this.REGISTER_BY_ACCESS_CODE, accessCode);
  }

}
