import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComplaintDto } from './complaint.types';


@Injectable({
  providedIn: 'root'
})
export class ComplaintRepository {

  private readonly resourceUrl = '/jobadservice/api/complaint';

  constructor(private http: HttpClient) {
  }

  sendComplaint(complaint: ComplaintDto): Observable<void> {
    return this.http.post<void>(`${this.resourceUrl}`, complaint);
  }
}
