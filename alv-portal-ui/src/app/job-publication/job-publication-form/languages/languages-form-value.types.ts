import { CEFR_Level, LanguageSkill } from '../../../shared/backend-services/shared.types';


export const emptyLanguageSkill: LanguageSkill = {
  languageIsoCode: null,
  writtenLevel: CEFR_Level.NONE,
  spokenLevel: CEFR_Level.NONE
};

export const emptyLanguagesFormValue: LanguageSkill[] = [
  emptyLanguageSkill
];

