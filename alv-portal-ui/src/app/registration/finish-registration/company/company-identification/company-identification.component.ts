import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMPANY_UID_REGEX } from '../../../../shared/forms/regex-patterns';
import { AbstractRegistrationStep } from '../../../abstract-registration-step';
import { RegistrationStep } from '../../../registration-step.enum';
import { Router } from '@angular/router';
import { NotificationsService } from '../../../../core/notifications.service';
import { NotificationType } from '../../../../shared/layout/notifications/notification.model';
import { companySteps } from '../company-steps.config';
import { RegistrationRepository } from '../../../../shared/backend-services/registration/registration.repository';
import { UidCompany } from '../../../../shared/backend-services/uid-search/uid.types';
import { UidSearchRepository } from '../../../../shared/backend-services/uid-search/uid-search.repository';

@Component({
  selector: 'alv-company-identification',
  templateUrl: './company-identification.component.html',
  styleUrls: ['./company-identification.component.scss']
})
export class CompanyIdentificationComponent extends AbstractRegistrationStep implements OnInit {

  @Output() companySelected = new EventEmitter<UidCompany>();

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
              private registrationService: RegistrationRepository,
              private notificationsService: NotificationsService,
              private uidSearchRepository: UidSearchRepository) {
    super();
  }

  ngOnInit() {
    this.companyUidForm = this.fb.group({
      uid: ['', [Validators.required, Validators.pattern(COMPANY_UID_REGEX)]]
    });
  }

  findCompanyByUid() {
    const extractedUid = this.extractCompanyUid(this.companyUidForm.get('uid').value);
    this.uidSearchRepository.getCompanyByUid(extractedUid)
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

  // e.g. CHE-123.456.789 -> 123456789
  extractCompanyUid(uid: string): number {
    return parseInt(uid
      .replace(new RegExp('CHE\-', 'g'), '')
      .replace(new RegExp('\\.', 'g'), '')
      .replace(new RegExp('\-', 'g'), ''), 10);
  }
}
