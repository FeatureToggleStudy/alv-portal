import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company, JobSeekerDetails } from './registration.model';
import { Step } from './step-indicator/step.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  readonly REGISTER_JOB_SEEKER_URL = 'api/registerJobseeker';

  readonly REQUEST_COMPANY_ACCESS_CODE_URL = 'api/requestEmployerAccessCode';

  readonly REQUEST_AGENT_ACCESS_CODE_URL = 'api/requestAgentAccessCode';

  readonly COMPANY_BY_UID_URL = 'api/getCompanyByUid';

  readonly REGISTER_BY_ACCESS_CODE = 'api/registerEmployerOrAgent';

  readonly companySteps: Step[] = [
    {
      label: 'portal.registration.company.step1',
      icon: 'user'
    },
    {
      label: 'portal.registration.company.step2',
      icon: 'envelope'
    },
    {
      label: 'portal.registration.company.step3',
      icon: 'lock'
    }
  ];

  readonly pavSteps: Step[] = [
    {
      label: 'portal.registration.pav.step1',
      icon: 'user'
    },
    {
      label: 'portal.registration.pav.step2',
      icon: 'envelope'
    },
    {
      label: 'portal.registration.pav.step3',
      icon: 'lock'
    }
  ];

  constructor(private http: HttpClient) {
  }

  registerJobSeeker(jobSeekerDetails: JobSeekerDetails): Observable<any> {
    return this.http.post(this.REGISTER_JOB_SEEKER_URL, jobSeekerDetails, {observe: 'response'});
  }

  requestEmployerAccessCode(uid: number): Observable<any> {
    return this.http.post(this.REQUEST_COMPANY_ACCESS_CODE_URL, uid);
  }

  getCompanyByUid(uid: number): Observable<Company> {
    return this.http.post<Company>(this.COMPANY_BY_UID_URL, uid);
  }

  requestAgentAccessCode(avgId: string): Observable<any> {
    return this.http.post(this.REQUEST_AGENT_ACCESS_CODE_URL, avgId);
  }

  registerEmployerOrAgent(accessCode: string): Observable<any> {
    return this.http.post(this.REGISTER_BY_ACCESS_CODE, accessCode);
  }

  // e.g. CHE-123.456.789 -> 123456789
  extractCompanyUid(uid: string): number {
    return parseInt(uid
        .replace(new RegExp('CHE\-', 'g'), '')
        .replace(new RegExp('\\.', 'g'), '')
        .replace(new RegExp('\-', 'g'), ''), 10);
  }
}
