import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMPANY_UID_REGEX } from '../../../shared/forms/regex-patterns';
import { AbstractRegistrationStep } from '../../abstract-registration-step';
import { RegistrationStep } from '../../registration-step.enum';
import { Router } from '@angular/router';
import { Company } from '../../registration.model';
import { NotificationsService } from '../../../core/notifications.service';
import { RegistrationService } from '../../registration.service';

@Component({
  selector: 'alv-company-identification',
  templateUrl: './company-identification.component.html',
  styleUrls: ['./company-identification.component.scss']
})
export class CompanyIdentificationComponent extends AbstractRegistrationStep implements OnInit {

  @Output() companySelected = new EventEmitter<Company>();

  companyUidForm: FormGroup;

  companySteps = this.registrationService.companySteps;

  constructor(private fb: FormBuilder,
              private router: Router,
              private registrationService: RegistrationService,
              private notificationsService: NotificationsService) {
    super();
  }

  ngOnInit() {
    this.companyUidForm = this.fb.group({
      uid: ['', [Validators.required, Validators.pattern(COMPANY_UID_REGEX)]]
    });
  }

  findCompanyByUid() {
    this.registrationService.getCompanyByUid(
        this.registrationService.extractCompanyUid(this.companyUidForm.get('uid').value)
    )
        .subscribe(
            (company) => {
              this.companySelected.emit(company);
              this.updateStep.emit(RegistrationStep.COMPANY_REQUEST_ACCESS_STEP);
            },
            () => {
              this.notificationsService.error('registrationCompanyDialog.validation.error.notFound');
            });
  }

  returnToRoleSelection() {
    this.updateStep.emit(RegistrationStep.SELECT_ROLE_STEP);
  }

  returnToHome() {
    this.router.navigate(['home']);
  }

}
