import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMPANY_UID_REGEX } from '../../../../shared/forms/regex-patterns';
import { AbstractRegistrationStep } from '../../../abstract-registration-step';
import { RegistrationStep } from '../../../registration-step.enum';
import { Router } from '@angular/router';
import { NotificationsService } from '../../../../core/notifications.service';
import { RegistrationService } from '../../../../service/registration/registration.service';
import { UidService } from '../../../../service/uid/uid.service';
import { Company } from '../../../../service/uid/uid.model';
import { NotificationType } from '../../../../shared/layout/notifications/notification.model';
import { companySteps } from '../company-steps.config';

@Component({
  selector: 'alv-company-identification',
  templateUrl: './company-identification.component.html',
  styleUrls: ['./company-identification.component.scss']
})
export class CompanyIdentificationComponent extends AbstractRegistrationStep implements OnInit {

  @Output() companySelected = new EventEmitter<Company>();

  companyUidForm: FormGroup;

  companySteps = companySteps;

  uidInfoNotification = {
    type: NotificationType.INFO,
    messageKey: 'portal.registration.company.uid.help.info',
    isSticky: true
  };

  readonly UID_MAX_LENGTH = 15;

  constructor(private fb: FormBuilder,
              private router: Router,
              private registrationService: RegistrationService,
              private notificationsService: NotificationsService,
              private uidService: UidService) {
    super();
  }

  ngOnInit() {
    this.companyUidForm = this.fb.group({
      uid: ['', [Validators.required, Validators.pattern(COMPANY_UID_REGEX)]]
    });
  }

  findCompanyByUid() {
    const extractedUid = this.uidService.extractCompanyUid(this.companyUidForm.get('uid').value);
    this.uidService.getCompanyByUid(extractedUid)
        .subscribe(
            (company) => {
              this.companySelected.emit(company);
              this.updateStep.emit(RegistrationStep.COMPANY_REQUEST_ACCESS_STEP);
            },
            () => {
              this.notificationsService.error('registrationCompanyDialog.validation.error.notFound');
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
