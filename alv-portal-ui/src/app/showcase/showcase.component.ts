import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TypeaheadItemModel } from '../shared/forms/input/typeahead/typeahead-item.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ModalService } from '../core/auth/modal.service';

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

  confirmModalDemoText: string;

  constructor(private http: HttpClient,
              private modalService: ModalService) {
  }

  ngOnInit() {
  }

  fetchSuggestions(prefix: string, distinctByLocalityCity = true): Observable<TypeaheadItemModel[]> {
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

  openConfirmModal() {
    this.modalService.openConfirm({
      title: 'Confirm Title',
      textHtml: '<em>This is</em> <code>HTML</code> <strong>text</strong>.'
    }).result.then(result => {
          // On confirm
          this.confirmModalDemoText = result;
          this.confirmAction();
        },
        reason => {
          // On cancel
          this.confirmModalDemoText = reason;
        });
  }

  private confirmAction() {
    of('some backend request').subscribe(result => {
    });
  }

  private defaultLocalityAutocompleteMapper(localityAutocomplete: LocalityAutocomplete): TypeaheadItemModel[] {
    const localities = localityAutocomplete.localities
        .map((o: LocalitySuggestion, index) =>
            new TypeaheadItemModel(LocalityInputType.LOCALITY, String(o.communalCode), o.city, index));

    const cantons = localityAutocomplete.cantons
        .map((o: CantonSuggestion, index) =>
            new TypeaheadItemModel(LocalityInputType.CANTON, String(o.code),
                o.name + ' (' + o.code + ')', localities.length + index));

    return [...localities, ...cantons];
  }
}

