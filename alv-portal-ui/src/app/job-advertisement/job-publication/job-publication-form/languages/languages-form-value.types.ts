import { CEFR_Level, LanguageSkill } from '../../../../shared/backend-services/shared.types';

export function emptyLanguageSkill(): LanguageSkill {
  return {
    languageIsoCode: null,
    writtenLevel: CEFR_Level.NONE,
    spokenLevel: CEFR_Level.NONE
  };
}

export function emptyLanguagesFormValue(): LanguageSkill[] {
  return [
    emptyLanguageSkill()
  ];
}

export type LanguagesFormValue = LanguageSkill[];


