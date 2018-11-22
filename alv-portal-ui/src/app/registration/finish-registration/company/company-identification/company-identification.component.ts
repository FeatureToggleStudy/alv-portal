import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMPANY_UID_REGEX } from '../../../../shared/forms/regex-patterns';
import { AbstractRegistrationStep } from '../../../abstract-registration-step';
import { RegistrationStep } from '../../../registration-step.enum';
import { Router } from '@angular/router';
import { NotificationsService } from '../../../../core/notifications.service';
import { RegistrationService } from '../../../registration.service';
import { CompanyService } from '../../../../service/company/company.service';
import { Company } from '../../../../service/company/company.model';
import { NotificationType } from '../../../../shared/layout/notifications/notification.model';

@Component({
  selector: 'alv-company-identification',
  templateUrl: './company-identification.component.html',
  styleUrls: ['./company-identification.component.scss']
})
export class CompanyIdentificationComponent extends AbstractRegistrationStep implements OnInit {

  @Output() companySelected = new EventEmitter<Company>();

  companyUidForm: FormGroup;

  companySteps = this.registrationService.companySteps;

  uidInfoNotification = {
    type: NotificationType.INFO,
    messageKey: 'portal.registration.company.uid.help.info',
    isSticky: true
  };

  constructor(private fb: FormBuilder,
              private router: Router,
              private registrationService: RegistrationService,
              private companyService: CompanyService) {
    super();
  }

  ngOnInit() {
    this.companyUidForm = this.fb.group({
      uid: ['', [Validators.required, Validators.pattern(COMPANY_UID_REGEX)]]
    });
  }

  findCompanyByUid() {
    const extractedUid = this.companyService.extractCompanyUid(this.companyUidForm.get('uid').value);
    this.companyService.getCompanyByUid(extractedUid)
        .subscribe(
            (company) => {
              this.companySelected.emit(company);
              this.updateStep.emit(RegistrationStep.COMPANY_REQUEST_ACCESS_STEP);
            },
            () => {
              this.companyUidForm.reset();
            });
  }

  returnToRoleSelection() {
    this.updateStep.emit(RegistrationStep.SELECT_ROLE_STEP);
  }

  returnToHome() {
    this.router.navigate(['home']);
  }

}
