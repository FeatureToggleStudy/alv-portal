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

  requestEmployerAccessCode(uid: string): Observable<any> {
    return this.http.post(this.REQUEST_COMPANY_ACCESS_CODE_URL, this.extractCompanyUid(uid));
  }

  getCompanyByUid(uid: string): Observable<Company> {
    return this.http.post<Company>(this.COMPANY_BY_UID_URL, this.extractCompanyUid(uid));
  }

  requestAgentAccessCode(avgId: string): Observable<any> {
    return this.http.post(this.REQUEST_AGENT_ACCESS_CODE_URL, avgId);
  }

  registerEmployerOrAgent(accessCode: string): Observable<any> {
    return this.http.post(this.REGISTER_BY_ACCESS_CODE, accessCode);
  }

  // e.g. CHE-123.456.789 -> 123456789
  private extractCompanyUid(uid: string): number {
    return parseInt(uid
        .replace(new RegExp('CHE\-', 'g'), '')
        .replace(new RegExp('\\.', 'g'), '')
        .replace(new RegExp('\-', 'g'), ''), 10);
  }
}
