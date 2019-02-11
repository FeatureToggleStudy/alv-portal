import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Salutation } from '../../../../shared/backend-services/shared.types';
import { of } from 'rxjs';
import { phoneInputValidator } from '../../../../shared/forms/input/input-field/phone-input.validator';
import { EMAIL_REGEX } from '../../../../shared/forms/regex-patterns';
import { ContactFormValue } from './contact-form-value.types';
import { patternInputValidator } from '../../../../shared/forms/input/input-field/pattern-input.validator';
import { JobPublicationFormValueKeys } from '../job-publication-form-value.types';

@Component({
  selector: 'alv-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  readonly FIRST_NAME_MAX_LENGTH = 50;

  readonly LAST_NAME_MAX_LENGTH = 50;

  //This is intentionally shorter than the application email address. See the AVAM interface
  //spec for more information.
  readonly EMAIL_MAX_LENGTH = 50;

  readonly CONTACT_LANGUAGES = ['de', 'fr', 'it', 'en'];

  @Input()
  parentForm: FormGroup;

  @Input()
  contactFormValue: ContactFormValue;

  contact: FormGroup;

  contactLanguageOptions$ = of(
    this.CONTACT_LANGUAGES.map(language => {
      return {
        value: language,
        label: 'global.reference.language.' + language
      };
    })
  );

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
    const { languageIsoCode, salutation, firstName, lastName, email, phone } = this.contactFormValue;

    this.contact = this.fb.group({
      languageIsoCode: [languageIsoCode],
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
        Validators.required,
        phoneInputValidator()
      ]],
      email: [email, [
        Validators.required, patternInputValidator(EMAIL_REGEX),
        Validators.maxLength(this.EMAIL_MAX_LENGTH)
      ]]
    });

    this.parentForm.addControl(JobPublicationFormValueKeys.contact, this.contact);
  }
}
