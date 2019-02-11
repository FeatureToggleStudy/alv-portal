import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LegalTerms } from './legal-terms-management.types';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LegalTermsManagementRepository {

  public static LEGAL_TERMS_URL = '/api/legal-terms';

  constructor(private http: HttpClient) {
  }

  getAllLegalTermsEntries(): Observable<LegalTerms[]> {
    return this.http.get<LegalTerms[]>(LegalTermsManagementRepository.LEGAL_TERMS_URL);
  }

  addLegalTermsEntry(legalTerms: LegalTerms): Observable<void> {
    return this.http.post<void>(LegalTermsManagementRepository.LEGAL_TERMS_URL, legalTerms);
  }

  updateLegalTermsEntry(legalTerms: LegalTerms): Observable<void> {
    return this.http.put<void>(`${LegalTermsManagementRepository.LEGAL_TERMS_URL}/${legalTerms.id}`, legalTerms);
  }

  deleteLegalTermsEntry(id: string): Observable<any> {
    return this.http.delete(`${LegalTermsManagementRepository.LEGAL_TERMS_URL}/${id}`);
  }

  getCurrentLegalTerms(): Observable<LegalTerms> {
    return this.http.get<LegalTerms>(`${LegalTermsManagementRepository.LEGAL_TERMS_URL}/current`);
  }
}
