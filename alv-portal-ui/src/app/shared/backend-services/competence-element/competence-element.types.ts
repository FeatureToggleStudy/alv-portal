export enum ElementType {
  ACTION_TO_KNOW = 'ACTION_TO_KNOW',
  ACTION_TO_KNOW_INDICATOR = 'ACTION_TO_KNOW_INDICATOR',
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
