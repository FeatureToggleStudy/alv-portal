import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OrganizationSuggestion } from '../../../../service/pav-search/pav-search.types';
import { from, Observable } from 'rxjs';
import { PavSearchRepository } from '../../../../service/pav-search/pav-search.repository';
import { map, mergeMap, toArray } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SingleTypeaheadItem } from '../../../../shared/forms/input/single-typeahead/single-typeahead-item.model';
import { Router } from '@angular/router';
import { RegistrationStep } from '../../../registration-step.enum';
import { AbstractRegistrationStep } from '../../../abstract-registration-step';
import { RegistrationRepository } from '../../../../service/registration/registration.repository';
import { pavSteps } from '../pav-steps.config';

@Component({
  selector: 'alv-pav-identification',
  templateUrl: './pav-identification.component.html',
  styleUrls: ['./pav-identification.component.scss']
})
export class PavIdentificationComponent extends AbstractRegistrationStep implements OnInit {

  @Output() organisationSelected = new EventEmitter<OrganizationSuggestion>();

  pavSteps = pavSteps;

  pavForm: FormGroup;

  searchOrganizationsFn = this.searchOrganizations.bind(this);

  constructor(private pavSearchService: PavSearchRepository,
              private registrationService: RegistrationRepository,
              private fb: FormBuilder,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.pavForm = this.fb.group({
      organization: ['', Validators.required]
    });
  }

  itemSelected(item: SingleTypeaheadItem) {
    this.organisationSelected.emit(item.model);
  }

  goToRequestAccessCodeStep() {
    this.updateStep.emit(RegistrationStep.PAV_REQUEST_ACCESS_STEP);
  }

  returnToRoleSelection() {
    this.updateStep.emit(RegistrationStep.SELECT_ROLE_STEP);
  }

  returnToHome() {
    this.router.navigate(['home']);
  }

  private searchOrganizations(term: string): Observable<SingleTypeaheadItem[]> {
    return this.pavSearchService.suggest(term).pipe(
        mergeMap(organizations => from(organizations)),
        map(this.mapOrganizationItem),
        toArray()
    );
  }

  private mapOrganizationItem(item: OrganizationSuggestion): SingleTypeaheadItem {
    return new SingleTypeaheadItem(item.externalId, PavSearchRepository.formatOrganizationName(item), item);
  }

}