import { Component, Input, OnInit } from '@angular/core';
import { Notification } from '../../../shared/layout/notifications/notification.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { Salutation } from '../../../shared/backend-services/shared.types';
import { UserInfoRepository } from '../../../shared/backend-services/user-info/user-info-repository';
import { patternInputValidator } from '../../../shared/forms/input/input-field/pattern-input.validator';
import { EMAIL_REGEX } from '../../../shared/forms/regex-patterns';
import { ContactFormValue } from '../user-settings-mapper';

@Component({
  selector: 'alv-user-information',
  templateUrl: './user-information.component.html'
})
export class UserInformationComponent implements OnInit {

  @Input()
  userId: string;

  @Input()
  contactFormValue: ContactFormValue;

  contactForm: FormGroup;

  alert: Notification;

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
    const { salutation, firstName, lastName, email, phone } = this.contactFormValue;

    this.contactForm = this.fb.group({
      salutation: [salutation, [Validators.required]],
      firstName: [firstName, [Validators.required]],
      lastName: [lastName, [Validators.required]],
      phone: [phone, [Validators.required]],
      email: [email, [Validators.required, patternInputValidator(EMAIL_REGEX)]]
    });

  }

  onSubmit() {

  }

  onReset() {

  }

}
