import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OccupationCode } from './occupation-code';

const DEFAULT_RESPONSE_SIZE = '10';
const OCCUPATION_LABEL_RESOURCE_SEARCH_URL = 'referenceservice/api/_search/occupations/label';
const OCCUPATION_LABEL_RESOURCE_URL = 'referenceservice/api/occupations/label';

export interface OccupationLabelAutocomplete {
  occupations: OccupationLabelSuggestion[];
  classifications: OccupationLabel[];
}

interface Map<T> {
  [key: string]: T;
}

export interface OccupationLabelSuggestion {
  id: string;
  code: number;
  type: string;
  language: string;
  classifier: string;
  label: string;
  mappings: Map<number>;
}

export interface OccupationLabel {
  id: string;
  code: number;
  type: string;
  language: string;
  classifier: string;
  label: string;
}

export interface OccupationLabelData {
  [key: string]: string;
}

export interface OccupationLabelMapping {
  id: string;
  bfsCode: number;
  avamCode: number;
  sbn3Code: number;
  sbn5Code: number;
  description: string;
}

/**
 * This service is supposed to be a data service. The UI components should use the OccupationPresentationService
 * instead of this.
 */
@Injectable({
  providedIn: 'root'
})
export class OccupationLabelService {
  constructor(private http: HttpClient) {
  }


  /**
   * allows to resolve labels
   * @param key something like `"avam:1223"`
   */
  getOccupationLabelsByKey(key: string): Observable<OccupationLabelData> {
    const code = OccupationCode.fromString(key);
    return this.http.get<OccupationLabelData>(`${OCCUPATION_LABEL_RESOURCE_URL}/${code.type}/${code.value}`);
  }

  getOccupationMappingByAvamCode(code: number): Observable<OccupationLabelMapping> {
    return this.getOccupationMapping(code, 'avam');
  }

  getOccupationMappingByBFSCode(code: number): Observable<OccupationLabelMapping> {
    return this.getOccupationMapping(code, 'bfs');
  }

  getOccupationMappingByX28Code(code: number): Observable<OccupationLabelMapping> {
    return this.getOccupationMapping(code, 'x28');
  }

  private getOccupationMapping(code: number, type: string): Observable<OccupationLabelMapping> {
    return this.http.get<OccupationLabelMapping>(`${OCCUPATION_LABEL_RESOURCE_URL}/mapping/${type}/${code}`);
  }
}
