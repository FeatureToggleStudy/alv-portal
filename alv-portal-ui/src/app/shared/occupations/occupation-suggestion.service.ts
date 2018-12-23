import { forkJoin, Observable, of } from 'rxjs';
import {
  OccupationLabelRepository,
  OccupationTypes
} from '../backend-services/reference-service/occupation-label.repository';
import { Injectable } from '@angular/core';
import {
  OccupationMultiTypeaheadItem,
  OccupationMultiTypeaheadItemType
} from './occupation-multi-typeahead-item';
import { map } from 'rxjs/operators';
import { ProfessionCode } from '../backend-services/job-advertisement/job-advertisement.types';
import {
  OccupationLabel,
  OccupationLabelSuggestion
} from '../backend-services/reference-service/occupation-label.types';


@Injectable({ providedIn: 'root' })
export class OccupationSuggestionService {

  constructor(private occupationLabelRepository: OccupationLabelRepository) {
  }

  translateAll(occupations: OccupationMultiTypeaheadItem[], language: string): Observable<OccupationMultiTypeaheadItem[]> {
    return forkJoin(occupations.map((o) => this.translate(o, language)));
  }

  translate(occupation: OccupationMultiTypeaheadItem, language: string): Observable<OccupationMultiTypeaheadItem> {
    const professionCode = this.translateableProfessionCode(occupation);
    if (professionCode) {
      return this.occupationLabelRepository.getOccupationLabelsByKey(professionCode.type, '' + professionCode.value, language).pipe(
        map((label) => {
          return new OccupationMultiTypeaheadItem(<OccupationMultiTypeaheadItemType>occupation.type, occupation.payload, label.default, occupation.order);
        })
      );
    }
    return of(occupation);
  }

  fetch(query: string): Observable<Array<OccupationMultiTypeaheadItem>> {
    return this.occupationLabelRepository.suggestOccupations(query, [OccupationTypes.X28, OccupationTypes.SBN3, OccupationTypes.SBN5])
      .pipe(
        map((occupationLabelAutocomplete) => {
          const occupationItems = occupationLabelAutocomplete.occupations
            .map((occupation, idx) => {
              const professionCodes = this.toProfessionCodes(occupation);
              return new OccupationMultiTypeaheadItem(OccupationMultiTypeaheadItemType.OCCUPATION, professionCodes, occupation.label, idx);
            });

          const classificationItems = occupationLabelAutocomplete.classifications
            .map((classification, idx) => {
              const professionCodes = this.toProfessionCodesFromClassification(classification);
              return new OccupationMultiTypeaheadItem(OccupationMultiTypeaheadItemType.CLASSIFICATION, professionCodes, classification.label, this.determineStartIndex(occupationLabelAutocomplete, idx));
            });
          return [].concat(occupationItems, classificationItems);
        })
      );
  }

  private translateableProfessionCode(occupation: OccupationMultiTypeaheadItem) {
    if (occupation.type === OccupationMultiTypeaheadItemType.CLASSIFICATION) {
      return { type: occupation.payload[0].type, value: occupation.payload[0].value };
    }
    return;
  }

  private toProfessionCodesFromClassification(classification: OccupationLabel) {
    return [{
      type: classification.type,
      value: classification.code
    }];
  }

  private toProfessionCodes(occupation: OccupationLabelSuggestion) {
    const professionCodes: ProfessionCode[] = [{
      type: occupation.type,
      value: occupation.code
    }];
    if (occupation.mappings && occupation.mappings['AVAM']) {
      professionCodes.push({
        type: 'AVAM',
        value: occupation.mappings['AVAM']
      });
    }
    return professionCodes;
  }

  private determineStartIndex(occupationLabelAutocomplete, idx) {
    return occupationLabelAutocomplete.occupations.length + idx;
  }

}
