import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SimpleMultiTypeaheadItem } from '../forms/input/multi-typeahead/simple-multi-typeahead.item';
import { LocalityRepository } from '../backend-services/reference-service/locality.repository';
import { map } from 'rxjs/operators';
import {
  CantonSuggestion,
  LocalitySuggestion
} from '../backend-services/reference-service/locality.types';

export class LocalityInputType {
  static LOCALITY = 'locality';
  static CANTON = 'canton';
}

@Injectable({ providedIn: 'root' })
export class LocalitySuggestionService {


  constructor(private localityRepository: LocalityRepository) {
  }

  fetch(query: string): Observable<SimpleMultiTypeaheadItem[]> {
    return this.localityRepository.suggestLocalities(query).pipe(
      map((localityAutocomplete) => {
        const localities = localityAutocomplete.localities
          .map((o: LocalitySuggestion, index) =>
            new SimpleMultiTypeaheadItem(LocalityInputType.LOCALITY, String(o.communalCode), o.city, index));

        const cantons = localityAutocomplete.cantons
          .map((o: CantonSuggestion, index) =>
            new SimpleMultiTypeaheadItem(LocalityInputType.CANTON, String(o.code),
              o.name + ' (' + o.code + ')', localities.length + index));
        return [].concat(localities, cantons);
      })
    )

  }

}
