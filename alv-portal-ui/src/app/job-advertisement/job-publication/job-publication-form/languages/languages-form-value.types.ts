import { CEFR_Level, LanguageSkill } from '../../../../shared/backend-services/shared.types';

export function defaultLanguageSkill(): LanguageSkill {
  return {
    languageIsoCode: null,
    writtenLevel: CEFR_Level.BASIC,
    spokenLevel: CEFR_Level.BASIC
  };
}

export function emptyLanguagesFormValue(): LanguageSkill[] {
  return [
    defaultLanguageSkill()
  ];
}

export type LanguagesFormValue = LanguageSkill[];


