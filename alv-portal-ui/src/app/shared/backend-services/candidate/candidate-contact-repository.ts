import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailContactModal } from './candidate.types';

@Injectable({ providedIn: 'root' })
export class CandidateContactRepository {

  constructor(private httpClient: HttpClient) {
  }

  sendContactModalEmail(emailContactModal: EmailContactModal): Observable<void> {
    return this.httpClient.post<void>('/api/messages/send-anonymous-message', emailContactModal);
  }

}
