import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SelectableOption } from '../shared/forms/input/selectable-option.model';
import { NotificationsService } from '../core/notifications.service';
import { ModalService } from '../shared/layout/modal/modal.service';
import { SimpleMultiTypeaheadItem } from '../shared/forms/input/multi-typeahead/simple-multi-typeahead.item';

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

  selectControl = new FormControl();

  selectOptions$: Observable<SelectableOption[]> = of([
    {
      label: 'Demo Value 1',
      value: 'value1'
    },
    {
      label: 'Demo Value 2',
      value: 'value1'
    },
    {
      label: 'Demo Value 3',
      value: 'value1'
    }
  ]);
  confirmModalDemoText: string;

  constructor(private http: HttpClient,
              private notificationService: NotificationsService,
              private modalService: ModalService) {
  }

  ngOnInit() {
  }

  fetchSuggestions(prefix: string, distinctByLocalityCity = true): Observable<SimpleMultiTypeaheadItem[]> {
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

  private defaultLocalityAutocompleteMapper(localityAutocomplete: LocalityAutocomplete): SimpleMultiTypeaheadItem[] {
    const localities = localityAutocomplete.localities
        .map((o: LocalitySuggestion, index) =>
          new SimpleMultiTypeaheadItem(LocalityInputType.LOCALITY, String(o.communalCode), o.city, index));

    const cantons = localityAutocomplete.cantons
        .map((o: CantonSuggestion, index) =>
          new SimpleMultiTypeaheadItem(LocalityInputType.CANTON, String(o.code),
                o.name + ' (' + o.code + ')', localities.length + index));

    return [...localities, ...cantons];
  }
}

