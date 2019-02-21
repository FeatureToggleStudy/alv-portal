import { CEFR_Level, LanguageSkill } from '../../../../shared/backend-services/shared.types';

export function emptyLanguageSkill(): LanguageSkill {
  return {
    languageIsoCode: null,
    writtenLevel: CEFR_Level.BASIC,
    spokenLevel: CEFR_Level.BASIC
  };
}

export function emptyLanguagesFormValue(): LanguageSkill[] {
  return [
    emptyLanguageSkill()
  ];
}

export type LanguagesFormValue = LanguageSkill[];


