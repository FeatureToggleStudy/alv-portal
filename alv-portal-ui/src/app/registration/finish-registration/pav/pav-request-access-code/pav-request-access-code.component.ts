import { Component, Input } from '@angular/core';
import { AbstractRegistrationStep } from '../../../abstract-registration-step';
import { RegistrationStep } from '../../../registration-step.enum';
import { Router } from '@angular/router';
import { finalize, switchMap } from 'rxjs/operators';
import { pavSteps } from '../pav-steps.config';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { PavSuggestion } from '../../../../shared/backend-services/pav-search/pav-search.types';
import { RegistrationRepository } from '../../../../shared/backend-services/registration/registration.repository';

@Component({
  selector: 'alv-pav-request-access-code',
  templateUrl: './pav-request-access-code.component.html',
  styleUrls: ['./pav-request-access-code.component.scss']
})
export class PavRequestAccessCodeComponent extends AbstractRegistrationStep {

  @Input() selectedPav: PavSuggestion;

  pavSteps = pavSteps;

  homeLabel: string;

  disableSubmit: boolean;

  isSubmitted: boolean;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private registrationRepository: RegistrationRepository) {
    super();
  }

  requestActivationCode() {
    this.disableSubmit = true;
    this.registrationRepository.requestAgentAccessCode(this.selectedPav.externalId).pipe(
      switchMap(() => {
        return this.authenticationService.refreshCurrentUser();
      }),
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
