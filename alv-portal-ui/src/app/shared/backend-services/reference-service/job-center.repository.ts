import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JobCenter } from './job-center.types';

@Injectable({
  providedIn: 'root'
})
export class JobCenterRepository {

  private readonly REFERENCESERVICE_URL = '/referenceservice/api/';

  private readonly JOB_CENTER_URL = this.REFERENCESERVICE_URL + 'job-centers';

  constructor(private http: HttpClient) {
  }

  resolveJobCenter(code: string, lang: string): Observable<JobCenter> {
    const params = new HttpParams()
      .set('code', code)
      .set('language', lang);

    return this.http.get<JobCenter>(this.JOB_CENTER_URL, { params });
  }

}

