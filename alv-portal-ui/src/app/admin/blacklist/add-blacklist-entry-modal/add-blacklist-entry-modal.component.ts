import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { catchError, map, mergeMap, toArray } from 'rxjs/operators';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { from, Observable } from 'rxjs';
import { SingleTypeaheadItem } from '../../../shared/forms/input/single-typeahead/single-typeahead-item.model';
import { PavSuggestion } from '../../../shared/backend-services/pav-search/pav-search.types';
import { PavSearchRepository } from '../../../shared/backend-services/pav-search/pav-search.repository';


@Component({
  selector: 'alv-add-blacklist-entry-modal',
  templateUrl: './add-blacklist-entry-modal.component.html',
  styleUrls: ['./add-blacklist-entry-modal.component.scss']
})
export class AddBlacklistEntryModalComponent implements OnInit {

  form: FormGroup;

  searchOrganizationsFn = this.searchOrganizations.bind(this);


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

  itemSelected(item: SingleTypeaheadItem<PavSuggestion>) {
    // this.pavSelected.emit(item.payload);
  }

  private searchOrganizations(term: string): Observable<SingleTypeaheadItem<PavSuggestion>[]> {
    return this.pavSearchRepository.suggest(term).pipe(
      mergeMap(organizations => from(organizations)),
      map(this.mapToItem),
      toArray()
    );
  }

  private mapToItem(pavSuggestion: PavSuggestion): SingleTypeaheadItem<PavSuggestion> {
    return new SingleTypeaheadItem(
      pavSuggestion.externalId,
      PavSearchRepository.formatOrganizationName(pavSuggestion),
      pavSuggestion
    );
  }

}
