import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobSeekerDetails } from './registration.model';
import { StepIndicatorItem } from '../shared/layout/step-indicator/step.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  readonly REGISTER_JOB_SEEKER_URL = 'api/registerJobseeker';

  readonly REQUEST_COMPANY_ACCESS_CODE_URL = 'api/requestEmployerAccessCode';

  readonly REQUEST_AGENT_ACCESS_CODE_URL = 'api/requestAgentAccessCode';

  readonly REGISTER_BY_ACCESS_CODE = 'api/registerEmployerOrAgent';

  readonly companySteps: StepIndicatorItem[] = [
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

  readonly pavSteps: StepIndicatorItem[] = [
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
    return this.http.post(this.REGISTER_JOB_SEEKER_URL, jobSeekerDetails);
  }

  requestEmployerAccessCode(uid: number): Observable<any> {
    return this.http.post(this.REQUEST_COMPANY_ACCESS_CODE_URL, uid);
  }

  requestAgentAccessCode(avgId: string): Observable<any> {
    return this.http.post(this.REQUEST_AGENT_ACCESS_CODE_URL, avgId);
  }

  registerEmployerOrAgent(accessCode: string): Observable<any> {
    return this.http.post(this.REGISTER_BY_ACCESS_CODE, accessCode);
  }

}
