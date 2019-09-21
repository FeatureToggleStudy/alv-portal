import { CompetenceElement } from '../competence-element/competence-element.types';

export interface CompetenceSet {
  id: string;
  draft: boolean;
  published: boolean;
  actionToKnowId: string;
  competenceElementIds: string[];
}

export interface CreateCompetenceSet {
  actionToKnowId: string;
  competenceElementIds: string[];
}

export interface UpdateCompetenceSet {
  draft: boolean;
  published: boolean;
  actionToKnowId: string;
  competenceElementIds: string[];
}

export interface CompetenceSetSearchResult {
  id: string;
  draft: boolean;
  published: boolean;
  actionToKnow: CompetenceElement;
  competenceElementIds: string[];
}

export const initialCompetenceSet = {
  competenceElementIds: []
};
