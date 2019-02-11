import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Salutation } from '../../../../shared/backend-services/shared.types';
import { of } from 'rxjs';
import { phoneInputValidator } from '../../../../shared/forms/input/input-field/phone-input.validator';
import { EMAIL_REGEX } from '../../../../shared/forms/regex-patterns';
import { PublicContactFormValue } from './public-contact-form-value.types';
import { patternInputValidator } from '../../../../shared/forms/input/input-field/pattern-input.validator';
import { JobPublicationFormValueKeys } from '../job-publication-form-value.types';
import { atLeastOneRequiredValidator } from '../../../../shared/forms/input/validators/at-least-one-required.validator';

@Component({
  selector: 'alv-public-contact',
  templateUrl: './public-contact.component.html',
  styleUrls: ['./public-contact.component.scss']
})
export class PublicContactComponent implements OnInit {

  readonly FIRST_NAME_MAX_LENGTH = 50;

  readonly LAST_NAME_MAX_LENGTH = 50;

  //This is intentionally shorter than the application email address. See the AVAM interface
  //spec for more information.
  readonly EMAIL_MAX_LENGTH = 50;

  @Input()
  parentForm: FormGroup;

  @Input()
  publicContactFormValue: PublicContactFormValue;

  publicContact: FormGroup;

  salutationOptions$ = of([
      {
        value: null,
        label: 'home.tools.job-publication.no-selection'
      },
      ...Object.keys(Salutation).map(language => {
        return {
          value: language,
          label: 'global.contactPerson.salutation.' + language
        };
      })
    ]
  );

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    const { salutation, firstName, lastName, phone, email } = this.publicContactFormValue;

    this.publicContact = this.fb.group({
      salutation: [salutation, [
        Validators.required
      ]],
      firstName: [firstName, [
        Validators.required,
        Validators.maxLength(this.FIRST_NAME_MAX_LENGTH),
      ]],
      lastName: [lastName, [
        Validators.required,
        Validators.maxLength(this.LAST_NAME_MAX_LENGTH),
      ]],
      phone: [phone, [
        phoneInputValidator()
      ]],
      email: [email, [
        patternInputValidator(EMAIL_REGEX),
        Validators.maxLength(this.EMAIL_MAX_LENGTH)
      ]]
    }, {
      validator: [atLeastOneRequiredValidator(['phone', 'email'])]
    });

    this.parentForm.addControl(JobPublicationFormValueKeys.publicContact, this.publicContact);
  }
}
