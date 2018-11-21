import { Component, Input, OnInit } from '@angular/core';
import { AbstractRegistrationStep } from '../../abstract-registration-step';
import { RegistrationStep } from '../../registration-step.enum';
import { Router } from '@angular/router';
import { Company } from '../../registration.model';
import { FormGroup } from '@angular/forms';
import { RegistrationService } from '../../registration.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'alv-company-request-access-code',
  templateUrl: './company-request-access-code.component.html',
  styleUrls: ['./company-request-access-code.component.scss']
})
export class CompanyRequestAccessCodeComponent extends AbstractRegistrationStep {

  @Input() company: Company;

  companySteps = this.registrationService.companySteps;

  homeLabel: string;

  disableSubmit: boolean;

  isSubmitted: boolean;

  constructor(private router: Router,
              private registrationService: RegistrationService) {
    super();
  }

  requestActivationCode() {
    this.disableSubmit = true;
    this.registrationService.requestEmployerAccessCode(this.company.uid).pipe(
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
