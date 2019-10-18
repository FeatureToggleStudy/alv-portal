import { Languages } from '../../core/languages.constants';
import { ActionDefinition } from '../../shared/backend-services/shared.types';

export interface TranslatedString {
  textDe: string;
  textFr: string;
  textIt: string;
  textEn: string;
}

export interface TranslatedStringToCurrentLanguage {
  value: string;
  isWrongLanguage: boolean;
}

/*
 * Get description in the next available language if current language is not available
 */
function getNextAvailableTitle(title: TranslatedString): string {
  for (const lang of Object.values(Languages)) {
    const description = findStringForLanguage(title, lang);
    if (description) {
      return description;
    }
  }
}

export function getTranslatedString (description: TranslatedString, lang: string): TranslatedStringToCurrentLanguage {
  const translatedString = findStringForLanguage(description, lang);
  if (!translatedString) {
    return {
      isWrongLanguage: true,
      value: getNextAvailableTitle(description)
    };
  }
  return {
    isWrongLanguage: false,
    value: translatedString
  };
}

function findStringForLanguage (description: TranslatedString, lang: string) {
  return description['text' + lang[0].toUpperCase() + lang[1]];
}

export enum CompetenceCatalogAction {
  LINK = 'LINK',
  UNLINK = 'UNLINK',
  EDIT = 'EDIT'
}
