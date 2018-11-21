import { Component, Input } from '@angular/core';
import { OrganizationSuggestion } from '../../../../service/organization/organization.model';
import { AbstractRegistrationStep } from '../../../abstract-registration-step';
import { RegistrationStep } from '../../../registration-step.enum';
import { Router } from '@angular/router';
import { RegistrationService } from '../../../registration.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'alv-pav-request-access-code',
  templateUrl: './pav-request-access-code.component.html',
  styleUrls: ['./pav-request-access-code.component.scss']
})
export class PavRequestAccessCodeComponent extends AbstractRegistrationStep {

  @Input() organization: OrganizationSuggestion;

  pavSteps = this.registrationService.pavSteps;

  homeLabel: string;

  disableSubmit: boolean;

  isSubmitted: boolean;

  constructor(private router: Router,
              private registrationService: RegistrationService) {
    super();
  }

  requestActivationCode() {
    this.disableSubmit = true;
    this.registrationService.requestAgentAccessCode(this.organization.externalId).pipe(
        finalize(() => this.disableSubmit = false)
    )
        .subscribe(() => {
          this.isSubmitted = true;
          this.homeLabel = 'registrationPavDialog.returnToHomepage';
        });
  }

  returnToPavIdentification() {
    this.updateStep.emit(RegistrationStep.PAV_IDENTIFICATION_STEP);
  }

  returnToHome() {
    this.router.navigate(['home']);
  }

}
