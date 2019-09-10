import { Injectable } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { combineLatest, Observable } from 'rxjs';
import { LegalTermsManagementRepository } from '../backend-services/legal-terms-management/legal-terms-management-repository';
import { map } from 'rxjs/operators';
import { LegalTerms } from '../backend-services/legal-terms-management/legal-terms-management.types';
import { RegistrationRepository } from '../backend-services/registration/registration.repository';

@Injectable({
  providedIn: 'root'
})
export class LegalTermsService {

  constructor(private i18nService: I18nService,
              private legalTermsManagementRepository: LegalTermsManagementRepository,
              private registrationRepository: RegistrationRepository) {
  }

  getLegalTermsUrl(): Observable<string> {
    return combineLatest(
      this.i18nService.currentLanguage$,
      this.legalTermsManagementRepository.getCurrentLegalTerms()
    ).pipe(
      map(([currentLanguage, legalTerms]) => extractUrl(currentLanguage, legalTerms))
    );
  }

  acceptLegalTerms(): Observable<void> {
    return this.registrationRepository.acceptLegalTerms();
  }
}

function extractUrl(currentLanguage: string, legalTerms: LegalTerms): string {
  switch (currentLanguage) {
    case 'en':
      return legalTerms.termsOfUsageLinkEn;
    case 'fr':
      return legalTerms.termsOfUsageLinkFr;
    case 'it':
      return legalTerms.termsOfUsageLinkIt;
    default:
      return legalTerms.termsOfUsageLinkDe;
  }
}
