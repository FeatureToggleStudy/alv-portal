import { Component, Input } from '@angular/core';
import { AbstractRegistrationStep } from '../../../abstract-registration-step';
import { RegistrationStep } from '../../../registration-step.enum';
import { Router } from '@angular/router';
import { RegistrationRepository } from '../../../../service/registration/registration.repository';
import { finalize, switchMap } from 'rxjs/operators';
import { Company } from '../../../../service/uid/uid.types';
import { companySteps } from '../company-steps.config';
import { AuthenticationService } from '../../../../core/auth/authentication.service';

@Component({
  selector: 'alv-company-request-access-code',
  templateUrl: './company-request-access-code.component.html',
  styleUrls: ['./company-request-access-code.component.scss']
})
export class CompanyRequestAccessCodeComponent extends AbstractRegistrationStep {

  @Input() company: Company;

  companySteps = companySteps;

  homeLabel: string;

  disableSubmit: boolean;

  isSubmitted: boolean;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private registrationService: RegistrationRepository) {
    super();
  }

  requestActivationCode() {
    this.disableSubmit = true;
    this.registrationService.requestEmployerAccessCode(this.company.uid).pipe(
      switchMap(() => {
        return this.authenticationService.refreshCurrentUser();
      }),
      finalize(() => this.disableSubmit = false)
    )
      .subscribe(() => {
        this.isSubmitted = true;
        this.homeLabel = 'registrationCompanyDialog.returnToHomepage';
      });
  }

  returnToPavIdentification() {
    this.updateStep.emit(RegistrationStep.COMPANY_IDENTIFICATION_STEP);
  }

  returnToHome() {
    this.router.navigate(['home']);
  }

}
