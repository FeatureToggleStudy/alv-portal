import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";

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

    constructor() {}

    sendContactModalEmail(emailContactModal: EmailContactModal): Observable<void> {
        return null;
    }
}
