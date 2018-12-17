import { Observable, of } from 'rxjs';
import { OccupationLabelData, OccupationLabelService } from './occupation-label.service';
import { Injectable } from '@angular/core';
import { OccupationCode } from './occupation-code';
import { map, tap } from 'rxjs/operators';


// todo: Review if it is possible to use the same model interface for the TypeaheadMultiselect and a suggest input field.
export interface OccupationOption {
  key: string;
  label: string;
}

export interface GenderAwareOccupationLabel {
  default: string;
  male: string;
  female: string;
}

interface OccupationLabelDataCache {
  [key: string]: OccupationLabelData;
}

@Injectable({
    providedIn: 'root'
  }
)
export class OccupationPresentationService {
  private occupationLabelDataCache: OccupationLabelDataCache = {};

  constructor(private occupationLabelService: OccupationLabelService) {
  }

  findOccupationLabelsByAvamCode(avamCode: number | string, language: string): Observable<GenderAwareOccupationLabel> {

    const extractCode = () => {
      if (typeof avamCode === 'string') {
        return +avamCode.split(':')[1];
      }
      return avamCode;
    };
    return this.findOccupationLabelsByCode(new OccupationCode(extractCode(), 'avam').toString(), language);
  }

  findOccupationLabelsByCode(occupationCodeString: string, language: string): Observable<GenderAwareOccupationLabel> {
    const labelDataMapper = (labelData: OccupationLabelData) => Object.assign({}, {
      default: labelData['default'],
      male: labelData['m'],
      female: labelData['f']
    });

    const cacheKey = occupationCodeString + '_' + language;
    const cachedOccupation = this.occupationLabelDataCache[cacheKey];
    if (cachedOccupation) {
      return of(this.occupationLabelDataCache[cacheKey]).pipe(
        map(labelDataMapper));
    } else {
      return this.occupationLabelService.getOccupationLabelsByKey(occupationCodeString).pipe(
        tap((labelData: OccupationLabelData) => this.occupationLabelDataCache[cacheKey] = labelData),
        map(labelDataMapper));
    }
  }

  occupationFormatter = (occupationOption: OccupationOption) => occupationOption.label ? occupationOption.label : '';
}
