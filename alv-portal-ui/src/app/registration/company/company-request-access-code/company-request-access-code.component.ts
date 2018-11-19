import { Component, Input, OnInit } from '@angular/core';
import { AbstractRegistrationStep } from '../../abstract-registration-step';
import { RegistrationStep } from '../../registration-step.enum';
import { Router } from '@angular/router';
import { Company } from '../../registration.model';
import { FormGroup } from '@angular/forms';
import { RegistrationService } from '../../registration.service';

@Component({
  selector: 'alv-company-request-access-code',
  templateUrl: './company-request-access-code.component.html',
  styleUrls: ['./company-request-access-code.component.scss']
})
export class CompanyRequestAccessCodeComponent extends AbstractRegistrationStep implements OnInit {

  @Input() company: Company;

  homeLabel: string;

  constructor(private router: Router,
              private registrationService: RegistrationService) {
    super();
  }

  ngOnInit() {

  }
  /*
  requestActivationCode() {
    this.disableSubmit = true;
    this.registrationService.requestEmployerAccessCode(this.getCompanyUid())
        .finally(() => this.disableSubmit = false)
        .subscribe(() => this.isSubmitted = true);
  }
*/
  backAction() {
    this.updateStep.emit(RegistrationStep.COMPANY_UID_STEP);
  }

  cancelAction() {
    this.router.navigate(['home']);
  }

}
