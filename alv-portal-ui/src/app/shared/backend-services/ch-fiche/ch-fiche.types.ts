import { TranslatedString } from '../shared.types';

export enum CompetenceType {
  BASIC = 'BASIC',
  SPECIALIST = 'SPECIALIST'
}

export interface ChFiche {
  id: string;
  draft: boolean;
  published: boolean;
  title: TranslatedString;
  description: TranslatedString;
  occupations: Occupation[];
  competences: Competence[];
}

export interface CreateChFiche {
  title: TranslatedString;
  description: TranslatedString;
  occupations: Occupation[];
  competences: Competence[];
}

export interface UpdateChFiche {
  draft: boolean;
  published: boolean;
  title: TranslatedString;
  description: TranslatedString;
  occupations: Occupation[];
  competences: Competence[];
}

export interface Occupation {
  bfsCode: string;
  chIsco5?: string;
  chIsco3?: string;
}

export interface Competence {
  type: CompetenceType;
  competenceSetId: string;
}

export const initialChFiche = {
  occupations: [],
  competences: []
};
