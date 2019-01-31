import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { catchError, map, mergeMap, toArray } from 'rxjs/operators';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { from, Observable } from 'rxjs';
import { PavSuggestion } from '../../../shared/backend-services/pav-search/pav-search.types';
import { PavSearchRepository } from '../../../shared/backend-services/pav-search/pav-search.repository';
import { TypeaheadItem } from '../../../shared/forms/input/typeahead/typeahead-item';
import * as _ from 'lodash';


@Component({
  selector: 'alv-add-blacklist-entry-modal',
  templateUrl: './add-blacklist-entry-modal.component.html',
  styleUrls: ['./add-blacklist-entry-modal.component.scss']
})
export class AddBlacklistEntryModalComponent implements OnInit {

  public form: FormGroup;

  public searchOrganizationsFn = this.searchOrganizations.bind(this);

  public selectedOrganisation: PavSuggestion;


  constructor(public modal: NgbActiveModal,
              private authenticationService: AuthenticationService,
              private fb: FormBuilder,
              private pavSearchRepository: PavSearchRepository) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      organization: ['', Validators.required]
    });
  }

  itemSelected(item: TypeaheadItem<PavSuggestion>) {
    this.selectedOrganisation = item.payload;
  }

  public confirmOrganizationAndCloseModal(){
    if (!_.isEmpty(this.selectedOrganisation)){
      this.modal.close(this.selectedOrganisation.externalId);
    }
  }


  private searchOrganizations(term: string): Observable<TypeaheadItem<PavSuggestion>[]> {
    return this.pavSearchRepository.suggest(term).pipe(
      mergeMap(organizations => from(organizations)),
      map(this.mapToItem),
      toArray()
    );
  }

  private mapToItem(pavSuggestion: PavSuggestion, index: number): TypeaheadItem<PavSuggestion> {
    return new TypeaheadItem<PavSuggestion>(
      'pav',
      pavSuggestion,
      PavSearchRepository.formatOrganizationName(pavSuggestion),
      index
    );
  }

}
