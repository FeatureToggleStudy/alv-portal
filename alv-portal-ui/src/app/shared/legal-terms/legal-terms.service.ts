import { Injectable } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { combineLatest, Observable } from 'rxjs';
import { LegalTermsManagementRepository } from '../backend-services/legal-terms-management/legal-terms-management-repository';
import { map } from 'rxjs/operators';
import { LegalTerms, LegalTermsUrls } from '../backend-services/legal-terms-management/legal-terms-management.types';
import { RegistrationRepository } from '../backend-services/registration/registration.repository';

@Injectable({
  providedIn: 'root'
})
export class LegalTermsService {

  constructor(private i18nService: I18nService,
              private legalTermsManagementRepository: LegalTermsManagementRepository,
              private registrationRepository: RegistrationRepository) {
  }

  getLegalTermsUrls(): Observable<LegalTermsUrls> {
    return combineLatest(
      this.i18nService.currentLanguage$,
      this.legalTermsManagementRepository.getCurrentLegalTerms()
    ).pipe(
      map(([currentLanguage, legalTerms]) => extractLegalTermsUrls(currentLanguage, legalTerms))
    );
  }

  acceptLegalTerms(): Observable<void> {
    return this.registrationRepository.acceptLegalTerms();
  }

}

function extractLegalTermsUrls(currentLanguage: string, legalTerms: LegalTerms): LegalTermsUrls {
  let termsOfUsage: string = '';
  let privacyStatement: string = '';
  switch (currentLanguage) {
    case 'en':
      termsOfUsage = legalTerms.termsOfUsageLinkEn;
      privacyStatement = legalTerms.privacyStatementLinkEn;
      break;
    case 'fr':
      termsOfUsage = legalTerms.termsOfUsageLinkFr;
      privacyStatement = legalTerms.privacyStatementLinkFr;
      break;
    case 'it':
      termsOfUsage = legalTerms.termsOfUsageLinkIt;
      privacyStatement = legalTerms.privacyStatementLinkIt;
      break;
    default:
      termsOfUsage = legalTerms.termsOfUsageLinkDe;
      privacyStatement = legalTerms.privacyStatementLinkDe;
      break;
  }
  return {
    termsOfUsageLink: termsOfUsage,
    privacyStatementLink: privacyStatement
  };
}
