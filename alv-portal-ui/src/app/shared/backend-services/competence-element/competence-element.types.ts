export enum ElementType {
  KNOW_HOW = 'KNOW_HOW',
  KNOW_HOW_INDICATOR = 'KNOW_HOW_INDICATOR',
  KNOWLEDGE = 'KNOWLEDGE'
}

export interface CompetenceElement {
  id: string;
  type: ElementType;
  draft: boolean;
  published: boolean;
  description: TranslatedString;
}

export interface CreateCompetenceElement {
  type: ElementType;
  description: TranslatedString;
}

export interface UpdateCompetenceElement {
  draft: boolean;
  published: boolean;
  description: TranslatedString;
}

export interface TranslatedString {
  textDe: string;
  textFr: string;
  textIt: string;
  textEn: string;
}

export const getTranslatedString = (description: TranslatedString, lang: string) => {
  return description['text' + lang[0].toUpperCase() + lang[1]];
};
