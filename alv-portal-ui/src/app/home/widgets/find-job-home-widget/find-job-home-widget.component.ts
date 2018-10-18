import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { TypeaheadItemModel } from '../../../shared/forms/input/typeahead/typeahead-item.model';

const states = JSON.parse('{"localities":[{"city":"Zuben","communalCode":4681,"cantonCode":"TG","regionCode":"TG05","zipCode":null},{"city":"Zuchwil","communalCode":2534,"cantonCode":"SO","regionCode":"SO01","zipCode":null},{"city":"Zuckenriet","communalCode":3423,"cantonCode":"SG","regionCode":"SG08","zipCode":null},{"city":"Zufikon","communalCode":4083,"cantonCode":"AG","regionCode":"AG10","zipCode":null},{"city":"Oberwil b. Zug","communalCode":1711,"cantonCode":"ZG","regionCode":"ZG01","zipCode":null},{"city":"Zug","communalCode":1711,"cantonCode":"ZG","regionCode":"ZG01","zipCode":null},{"city":"Zugerberg","communalCode":1711,"cantonCode":"ZG","regionCode":"ZG01","zipCode":null},{"city":"Zullwil","communalCode":2622,"cantonCode":"SO","regionCode":"SO05","zipCode":null},{"city":"Zumholz","communalCode":2299,"cantonCode":"FR","regionCode":"FR06","zipCode":null},{"city":"Zumikon","communalCode":160,"cantonCode":"ZH","regionCode":"ZH04","zipCode":null}],"cantons":[{"name":"Zug","code":"ZG"},{"name":"Zürich","code":"ZH"}]}');
function defaultLocalityAutocompleteMapper(localityAutocomplete: LocalityAutocomplete): TypeaheadItemModel[] {
  const localities = localityAutocomplete.localities
      .map((o: LocalitySuggestion, index) =>
          new TypeaheadItemModel(LocalityInputType.LOCALITY, String(o.communalCode), o.city, index));

  const cantons = localityAutocomplete.cantons
      .map((o: CantonSuggestion, index) =>
          new TypeaheadItemModel(LocalityInputType.CANTON, String(o.code),
              o.name + ' (' + o.code + ')', localities.length + index));

  return [...localities, ...cantons];
}
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

export interface GeoPoint {
  latitude: number;
  longitude: number;
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
  selector: 'alv-find-job-home-widget',
  templateUrl: './find-job-home-widget.component.html',
  styleUrls: ['./find-job-home-widget.component.scss']
})
export class FindJobHomeWidgetComponent implements OnInit {

  findJobForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.findJobForm = this.fb.group({
      profession: this.fb.control('', Validators.required),
      skills: this.fb.control('', Validators.required),
      city: this.fb.control('')
    });
  }

  search(text: string) {
    const text$ = of(text);
    return text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(term => defaultLocalityAutocompleteMapper(states))
    );
  }

}
