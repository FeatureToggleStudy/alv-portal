import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  formatOrganizationName,
  OrganizationSuggestion
} from '../../organization/organization.model';
import { Observable } from 'rxjs';
import { OrganizationService } from '../../organization/organization.service';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SingleTypeaheadItem } from '../../../shared/forms/input/single-typeahead/single-typeahead-item.model';
import { Router } from '@angular/router';
import { RegistrationStep } from '../../registration-step.enum';
import { AbstractRegistrationStep } from '../../abstract-registration-step';
import { RegistrationService } from '../../registration.service';

@Component({
  selector: 'alv-pav-identification',
  templateUrl: './pav-identification.component.html',
  styleUrls: ['./pav-identification.component.scss']
})
export class PavIdentificationComponent extends AbstractRegistrationStep implements OnInit {

  @Output() organisationSelected = new EventEmitter<OrganizationSuggestion>();

  pavSteps = this.registrationService.pavSteps;

  pavForm: FormGroup;

  searchOrganizationsFn = this.searchOrganizations.bind(this);

  constructor(private organizationService: OrganizationService,
              private registrationService: RegistrationService,
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
    return this.organizationService.suggest(term, 10).pipe(
        map(organizations => organizations.map(this.mapOrganizationItem))
    );
  }

  private mapOrganizationItem(item: OrganizationSuggestion): SingleTypeaheadItem {
    return new SingleTypeaheadItem(item.externalId, formatOrganizationName(item), item);
  }

}
