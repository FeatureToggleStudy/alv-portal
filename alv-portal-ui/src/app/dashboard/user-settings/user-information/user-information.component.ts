import { Component, Input, OnInit } from '@angular/core';
import { Notification } from '../../../shared/layout/notifications/notification.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { Salutation } from '../../../shared/backend-services/shared.types';
import { UserInfoRepository } from '../../../shared/backend-services/user-info/user-info-repository';
import { CompanyContactTemplateModel } from '../../../core/auth/company-contact-template-model';
import { User } from '../../../core/auth/user.model';
import { phoneInputValidator } from '../../../shared/forms/input/input-field/phone-input.validator';
import { patternInputValidator } from '../../../shared/forms/input/input-field/pattern-input.validator';
import { EMAIL_REGEX } from '../../../shared/forms/regex-patterns';
import { CompanyContactTemplate } from '../../../shared/backend-services/user-info/user-info.types';

@Component({
  selector: 'alv-user-information',
  templateUrl: './user-information.component.html'
})
export class UserInformationComponent implements OnInit {

  @Input()
  user: User;

  @Input()
  company: CompanyContactTemplateModel;

  alert: Notification;

  userInfoForm: FormGroup;

  salutationOptions$: Observable<SelectableOption[]> = of([
    {
      value: null,
      label: 'candidate-search.no-selection'
    }
  ].concat(
    Object.keys(Salutation).map(i => {
      return {
        value: i,
        label: 'global.contactPerson.salutation.' + i
      };
    })
  ));

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
    this.userInfoForm = this.fb.group({
      salutation: [null, Validators.required],
      firstName: [{ value: null, disabled: true }],
      lastName: [{ value: null, disabled: true }],
      phone: [null, [Validators.required, phoneInputValidator()]],
      email: [null, [Validators.required, patternInputValidator(EMAIL_REGEX)]]
    });

    if (this.company) {
      this.patchFormValues(this.company);
    }
  }

  private patchFormValues(company: CompanyContactTemplateModel) {
    this.userInfoForm.patchValue({
      salutation: company.salutation,
      firstName: company.firstName,
      lastName: company.lastName,
      phone: company.phone,
      email: company.email
    });
  }

  private mapFormValues(): CompanyContactTemplate {
    return null;
  }

}
