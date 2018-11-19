import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MultiTypeaheadItemModel } from '../shared/forms/input/multi-typeahead/multi-typeahead-item.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

export class LocalityInputType {
  static LOCALITY = 'locality';
  static CANTON = 'canton';
}

export interface LocalitySuggestion {
  city: string;
  communalCode: number;
  cantonCode: string;
  regionCode: string;
  zipCode: string;
}

export interface CantonSuggestion {
  code: string;
  name: string;
}

export interface LocalityAutocomplete {
  localities: LocalitySuggestion[];
  cantons: CantonSuggestion[];
}

@Component({
  selector: 'alv-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {

  typeaheadControl = new FormControl();

  itemLoaderFn = this.fetchSuggestions.bind(this);

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  fetchSuggestions(prefix: string, distinctByLocalityCity = true): Observable<MultiTypeaheadItemModel[]> {
    const params = new HttpParams()
        .set('prefix', prefix)
        .set('resultSize', '10')
        .set('distinctByLocalityCity', distinctByLocalityCity.toString());

    const _resultMapper = this.defaultLocalityAutocompleteMapper;

    return this.http.get('/referenceservice/api/_search/localities', { params })
        .pipe(
            map(_resultMapper)
        );
  }

  private defaultLocalityAutocompleteMapper(localityAutocomplete: LocalityAutocomplete): MultiTypeaheadItemModel[] {
    const localities = localityAutocomplete.localities
        .map((o: LocalitySuggestion, index) =>
            new MultiTypeaheadItemModel(LocalityInputType.LOCALITY, String(o.communalCode), o.city, index));

    const cantons = localityAutocomplete.cantons
        .map((o: CantonSuggestion, index) =>
            new MultiTypeaheadItemModel(LocalityInputType.CANTON, String(o.code),
                o.name + ' (' + o.code + ')', localities.length + index));

    return [...localities, ...cantons];
  }
}

