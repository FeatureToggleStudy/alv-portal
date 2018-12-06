import { Component, Input } from '@angular/core';
import { AbstractRegistrationStep } from '../../../abstract-registration-step';
import { RegistrationStep } from '../../../registration-step.enum';
import { Router } from '@angular/router';
import { finalize, switchMap } from 'rxjs/operators';
import { companySteps } from '../company-steps.config';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { UidCompany } from '../../../../shared/backend-services/uid-search/uid.types';
import { RegistrationRepository } from '../../../../shared/backend-services/registration/registration.repository';

@Component({
  selector: 'alv-company-request-access-code',
  templateUrl: './company-request-access-code.component.html',
  styleUrls: ['./company-request-access-code.component.scss']
})
export class CompanyRequestAccessCodeComponent extends AbstractRegistrationStep {

  @Input() company: UidCompany;

  companySteps = companySteps;

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
    this.registrationRepository.requestEmployerAccessCode(this.company.uid).pipe(
      switchMap(() => {
        return this.authenticationService.reloadCurrentUser();
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
