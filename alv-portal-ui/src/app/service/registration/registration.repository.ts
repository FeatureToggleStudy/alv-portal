import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationsService } from '../../core/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationRepository {

  private readonly REGISTER_JOB_SEEKER_URL = 'api/registerJobseeker';

  private readonly REQUEST_COMPANY_ACCESS_CODE_URL = 'api/requestEmployerAccessCode';

  private readonly REQUEST_AGENT_ACCESS_CODE_URL = 'api/requestAgentAccessCode';

  private readonly REGISTER_BY_ACCESS_CODE = 'api/registerEmployerOrAgent';

  constructor(private http: HttpClient,
              private notificationsService: NotificationsService) {
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

export interface JobSeekerDetails {
  personNumber: number;
  birthdateYear: number;
  birthdateMonth: number;
  birthdateDay: number;
}
