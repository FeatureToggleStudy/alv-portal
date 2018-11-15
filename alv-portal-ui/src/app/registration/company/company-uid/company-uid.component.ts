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
  selector: 'alv-company-uid',
  templateUrl: './company-uid.component.html',
  styleUrls: ['./company-uid.component.scss']
})
export class CompanyUidComponent extends AbstractRegistrationStep implements OnInit {

  @Output() company = new EventEmitter<Company>();

  companyUidForm: FormGroup;

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
    this.registrationService.getCompanyByUid(this.getCompanyUid())
        .subscribe(
            (company) => {
              this.company.emit(company);
              this.updateStep.emit(RegistrationStep.COMPANY_REQUEST_ACCESS_STEP);
            },
            () => {
              this.notificationsService.error('registrationCompanyDialog.validation.error.notFound');
            });
  }

  backAction() {
    this.updateStep.emit(RegistrationStep.SELECT_ROLE_STEP);
  }

  cancelAction() {
    this.router.navigate(['home']);
  }

  // e.g. CHE-123.456.789 -> 123456789
  private getCompanyUid(): number {
    return parseInt(this.companyUidForm.get('uid')
        .value
        .replace(new RegExp('CHE\-', 'g'), '')
        .replace(new RegExp('\\.', 'g'), '')
        .replace(new RegExp('\-', 'g'), ''), 10);
  }
}
