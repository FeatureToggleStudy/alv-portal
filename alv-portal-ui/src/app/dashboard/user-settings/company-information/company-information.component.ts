import { Component, Input, OnInit } from '@angular/core';
import { Notification } from '../../../shared/layout/notifications/notification.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInfoRepository } from '../../../shared/backend-services/user-info/user-info-repository';
import { CompanyContactTemplateModel } from '../../../core/auth/company-contact-template-model';
import { User } from '../../../core/auth/user.model';
import { patternInputValidator } from '../../../shared/forms/input/input-field/pattern-input.validator';
import { HOUSE_NUMBER_REGEX } from '../../../shared/forms/regex-patterns';
import { CompanyContactTemplate } from '../../../shared/backend-services/user-info/user-info.types';
import { CompanyFormValue } from '../user-settings-mapper';

@Component({
  selector: 'alv-company-information',
  templateUrl: './company-information.component.html'
})
export class CompanyInformationComponent implements OnInit {

  @Input()
  userId: string;

  @Input()
  companyFormValue: CompanyFormValue;

  alert: Notification;

  companyInfoForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userInfoRepository: UserInfoRepository) { }

  ngOnInit() {
    this.prepareForm();
  }

  onSubmit() {

  }

  onReset() {

  }

  private prepareForm() {
    this.companyInfoForm = this.fb.group({
      companyName: [null, Validators.required],
      companyStreet: [null, Validators.required],
      companyHouseNr: [null, patternInputValidator(HOUSE_NUMBER_REGEX)],
      companyZipCode: [null, Validators.required],
      companyCity: [null, Validators.required]
    });
  }

  private patchFormValues(company: CompanyFormValue) {
    this.companyInfoForm.patchValue({
      companyName: company.companyName,
      companyStreet: company.companyStreet,
      companyHouseNr: company.companyHouseNr,
      companyZipCode: company.companyZipCode,
      companyCity: company.companyCity
    });
  }

}
