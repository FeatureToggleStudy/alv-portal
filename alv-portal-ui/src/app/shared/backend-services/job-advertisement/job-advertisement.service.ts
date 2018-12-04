import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobAdvertisement } from './job-advertisement.model';
import { Observable } from 'rxjs';

@Injectable()
export class JobAdvertisementService {
  private readonly resourceUrl = 'jobadservice/api/jobAdvertisements';

  constructor(
    private http: HttpClient
  ) {
  }

  findById(id: string): Observable<JobAdvertisement> {
    return this.http.get<JobAdvertisement>(`${this.resourceUrl}/${id}`);
  }
}


