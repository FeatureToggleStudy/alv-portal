import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface EmailContactModal {
    candidateId: string;
    subject: string;
    personalMessage: string;
    companyName: string;
    phone?: string;
    email?: string;
    company?: Company;
}

export interface Company {
    name: string;
    contactPerson: string;
    street: string;
    houseNumber: string;
    zipCode: string;
    city: string;
    country: string;
}

@Injectable()
export class CandidateContactModalService {

    constructor(private httpClient: HttpClient) {}

    sendContactModalEmail(emailContactModal: EmailContactModal): Observable<void> {
        return this.httpClient.post<void>('/api/messages/send-anonymous-message', emailContactModal);
    }
}
