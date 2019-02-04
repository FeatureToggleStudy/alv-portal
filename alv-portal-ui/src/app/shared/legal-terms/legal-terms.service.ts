import { Injectable } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { combineLatest, Observable } from 'rxjs';
import { LegalTermsManagementRepository } from '../backend-services/legal-terms-management/legal-terms-management-repository';
import { map } from 'rxjs/operators';
import { LegalTerms } from '../backend-services/legal-terms-management/legal-terms-management.types';

@Injectable({
  providedIn: 'root'
})
export class LegalTermsService {

  constructor(private i18nService: I18nService,
              private legalTermsManagementRepository: LegalTermsManagementRepository) {
  }

  getLegalTermsUrl(): Observable<string> {
    return combineLatest(
      this.i18nService.currentLanguage$,
      this.legalTermsManagementRepository.getCurrentLegalTerms()
    ).pipe(
      map(([currentLanguage, legalTerms]) => extractUrl(currentLanguage, legalTerms))
    );
  }
}

function extractUrl(currentLanguage: string, legalTerms: LegalTerms): string {
  switch (currentLanguage) {
    case 'en':
      return legalTerms.linkEn;
    case 'fr':
      return legalTerms.linkFr;
    case 'it':
      return legalTerms.linkIt;
    default:
      return legalTerms.linkDe;
  }
}
