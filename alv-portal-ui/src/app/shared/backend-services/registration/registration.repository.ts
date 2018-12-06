import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationRepository {

  private readonly REGISTER_JOB_SEEKER_URL = 'api/registerJobseeker';

  private readonly REQUEST_COMPANY_ACCESS_CODE_URL = 'api/requestEmployerAccessCode';

  private readonly REQUEST_AGENT_ACCESS_CODE_URL = 'api/requestAgentAccessCode';

  private readonly REGISTER_BY_ACCESS_CODE = 'api/registerEmployerOrAgent';

  constructor(private http: HttpClient) {
  }

  registerJobSeeker(jobSeekerDetails: JobSeekerDetails): Observable<void> {
    return this.http.post<void>(this.REGISTER_JOB_SEEKER_URL, jobSeekerDetails);
  }

  requestEmployerAccessCode(uid: number): Observable<void> {
    return this.http.post<void>(this.REQUEST_COMPANY_ACCESS_CODE_URL, uid);
  }

  requestAgentAccessCode(avgId: string): Observable<void> {
    return this.http.post<void>(this.REQUEST_AGENT_ACCESS_CODE_URL, avgId);
  }

  registerEmployerOrAgent(accessCode: string): Observable<AccessCodeRegistrationResult> {
    return this.http.post<AccessCodeRegistrationResult>(this.REGISTER_BY_ACCESS_CODE, accessCode);
  }

}

export interface AccessCodeRegistrationResult {
  success: boolean;
  type: string;
}

export interface JobSeekerDetails {
  personNumber: number;
  birthdateYear: number;
  birthdateMonth: number;
  birthdateDay: number;
}
