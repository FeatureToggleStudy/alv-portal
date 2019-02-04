import { Injectable } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { combineLatest, Observable } from 'rxjs';
import { LegalTermsManagementRepository } from '../backend-services/legal-terms-management/legal-terms-management-repository';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LegalTermsService {

  constructor(private i18nService: I18nService,
              private legalTermsManagementRepository: LegalTermsManagementRepository) {
  }

  getCurrentLegalTermsUrl(): Observable<string> {
    const languageToPropertyNameMap = {
      en: 'linkEn',
      de: 'linkDe',
      fr: 'linkFr',
      it: 'linkIt',
    };

    const currentLegalTerms$ = this.legalTermsManagementRepository.getCurrentLegalTerms();

    return combineLatest(this.i18nService.currentLanguage$, currentLegalTerms$).pipe(
      map(([currentLanguage, legalTerms]) => legalTerms[languageToPropertyNameMap[currentLanguage]])
    );
  }
}
