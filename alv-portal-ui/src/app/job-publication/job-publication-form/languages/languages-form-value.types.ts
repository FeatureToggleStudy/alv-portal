import { CEFR_Level } from '../../../shared/backend-services/shared.types';

export interface LanguagesFormValue {
  languageIsoCode: string;
  writtenLevel: string;
  spokenLevel: string;
}

export const emptyLanguagesFormValue: LanguagesFormValue[] = [{
  languageIsoCode: null,
  writtenLevel: CEFR_Level.NONE,
  spokenLevel: CEFR_Level.NONE
}];
