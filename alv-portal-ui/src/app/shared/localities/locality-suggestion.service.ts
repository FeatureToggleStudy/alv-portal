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
  LocalityTypeaheadItem
} from './locality-typeahead-item';
import { TypeaheadItem } from '../forms/input/typeahead/typeahead-item';
import { ZipAndCity } from '../../job-publication/job-publication-form/zip-city-input/zip-city-form-value.types';

@Injectable({ providedIn: 'root' })
export class LocalitySuggestionService {

  constructor(private localityRepository: LocalityRepository) {
  }

  public static toCityZip(locality: LocalitySuggestion, order: number) {
    const { zipCode, city } = locality;

    return new TypeaheadItem<ZipAndCity>(
      LocalityInputType.LOCALITY,
      { city, zipCode },
      (zipCode || '') + (city ? ' ' : '') + (city || ''),
      order
    );
  }

  public static toLocality(locality: LocalitySuggestion, order = 0) {
    return new LocalityTypeaheadItem(LocalityInputType.LOCALITY, {
        regionCode: locality.regionCode,
        cantonCode: locality.cantonCode,
        communalCode: String(locality.communalCode),
      }, locality.city,
      order);
  }

  fetch(query: string): Observable<LocalityTypeaheadItem[]> {
    return this.localityRepository.suggestLocalities(query).pipe(
      map((localityAutocomplete) => {
        const localities = localityAutocomplete.localities
          .map((o: LocalitySuggestion, index) => LocalitySuggestionService.toLocality(o, index));

        const cantons = localityAutocomplete.cantons
          .map((o: CantonSuggestion, index) =>
            new LocalityTypeaheadItem(LocalityInputType.CANTON, {
              cantonCode: o.code,
            },
              o.name + ' (' + o.code + ')', localities.length + index));
        return [].concat(localities, cantons);
      })
    );
  }

  fetchJobPublicationLocations(query: string): Observable<TypeaheadItem<{ zipCode: string, city: string }>[]> {
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
