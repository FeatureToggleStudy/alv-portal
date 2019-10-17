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
function getNextAvailableTitle(): string {
  for (const lang of Object.values(Languages)) {
    const description = findStringForLanguage(this.multiLanguageTitle, lang);
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
      value: getNextAvailableTitle()
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

export const linkActionDefinition: ActionDefinition<CompetenceCatalogAction> = {
  name: CompetenceCatalogAction.LINK,
  icon: ['fas', 'search-plus'],
  label: 'portal.competence-catalog.competence-sets.actions.LINK'
};

export const unlinkActionDefinition: ActionDefinition<CompetenceCatalogAction> = {
  name: CompetenceCatalogAction.UNLINK,
  icon: ['fas', 'unlink'],
  label: 'portal.competence-catalog.competence-sets.actions.UNLINK'
};

