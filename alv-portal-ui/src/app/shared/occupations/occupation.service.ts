import { Injectable } from '@angular/core';
import { OccupationLabelRepository } from '../backend-services/reference-service/occupation-label.repository';
import { ProfessionCode } from '../backend-services/job-advertisement/job-advertisement.types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OccupationService {

  constructor(private occupationLabelRepository: OccupationLabelRepository) {
  }

  findLabel(code: ProfessionCode, lang: string): Observable<GenderAwareOccupationLabel> {
    return this.occupationLabelRepository.getOccupationLabelsByKey(code.type, code.value, lang)
      .pipe(map((occupationLabelData) => {
        return {
          default: occupationLabelData['default'],
          male: occupationLabelData['m'],
          female: occupationLabelData['f']
        }
      }))
  }
}

export interface GenderAwareOccupationLabel {
  default: string;
  male: string;
  female: string;
}
