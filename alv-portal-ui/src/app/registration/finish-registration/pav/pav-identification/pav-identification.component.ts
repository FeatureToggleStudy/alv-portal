import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OrganizationSuggestion } from '../../../../service/organization/organization.model';
import { from, Observable } from 'rxjs';
import { OrganizationService } from '../../../../service/organization/organization.service';
import { map, mergeMap, toArray } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SingleTypeaheadItem } from '../../../../shared/forms/input/single-typeahead/single-typeahead-item.model';
import { Router } from '@angular/router';
import { RegistrationStep } from '../../../registration-step.enum';
import { AbstractRegistrationStep } from '../../../abstract-registration-step';
import { RegistrationService } from '../../../registration.service';

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
    return this.organizationService.suggest(term).pipe(
        mergeMap(organizations => from(organizations)),
        map(this.mapOrganizationItem),
        toArray()
    );
  }

  private mapOrganizationItem(item: OrganizationSuggestion): SingleTypeaheadItem {
    return new SingleTypeaheadItem(item.externalId, OrganizationService.formatOrganizationName(item), item);
  }

}
