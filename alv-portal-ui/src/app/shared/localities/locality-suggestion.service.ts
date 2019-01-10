import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalityRepository } from '../backend-services/reference-service/locality.repository';
import { map } from 'rxjs/operators';
import {
  CantonSuggestion,
  LocalitySuggestion
} from '../backend-services/reference-service/locality.types';
import {
  LocalityInputType,
  LocalityMultiTypeaheadItem
} from './locality-multi-typeahead-item';

@Injectable({ providedIn: 'root' })
export class LocalitySuggestionService {

  constructor(private localityRepository: LocalityRepository) {
  }

  public static toLocality(locality: LocalitySuggestion, order = 0) {
    return new LocalityMultiTypeaheadItem(LocalityInputType.LOCALITY, {
        regionCode: locality.regionCode,
        cantonCode: locality.cantonCode,
        communalCode: String(locality.communalCode),
      }, locality.city,
      order);
  }

  public static toCityZip(locality: LocalitySuggestion, order = 0) {
    const { zipCode, city } = locality;

    return new LocalityMultiTypeaheadItem(LocalityInputType.LOCALITY, {
        city, zipCode
      }, (zipCode || '') + (city ? ' ' : '') + (city || ''),
      order);
  }

  fetch(query: string): Observable<LocalityMultiTypeaheadItem[]> {
    return this.localityRepository.suggestLocalities(query).pipe(
      map((localityAutocomplete) => {
        const localities = localityAutocomplete.localities
          .map((o: LocalitySuggestion, index) => LocalitySuggestionService.toLocality(o, index));

        const cantons = localityAutocomplete.cantons
          .map((o: CantonSuggestion, index) =>
            new LocalityMultiTypeaheadItem(LocalityInputType.CANTON, {
              cantonCode: o.code,
            },
              o.name + ' (' + o.code + ')', localities.length + index));
        return [].concat(localities, cantons);
      })
    );
  }

  fetchJobPublicationLocations(query: string): Observable<LocalityMultiTypeaheadItem[]> {
    const localityComparator = (a: LocalitySuggestion, b: LocalitySuggestion) =>
      a.city.localeCompare(b.city) || a.zipCode.localeCompare(b.zipCode);

    return this.localityRepository.suggestLocalities(query, false).pipe(
      map((localityAutocomplete) => localityAutocomplete.localities
        .filter((locality) => locality.zipCode !== '----')
        .sort(localityComparator)
        .map((o: LocalitySuggestion, index) => LocalitySuggestionService.toCityZip(o, index))
      )
    );
  }
}
