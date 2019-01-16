import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Salutation } from '../../../shared/backend-services/shared.types';
import { of } from 'rxjs';
import { phoneInputValidator } from '../../../shared/forms/input/input-field/phone-input.validator';
import { EMAIL_REGEX } from '../../../shared/forms/regex-patterns';
import { PublicContactFormValue } from './public-contact-form-value.types';
import { patternInputValidator } from '../../../shared/forms/input/input-field/pattern-input.validator';

@Component({
  selector: 'alv-public-contact',
  templateUrl: './public-contact.component.html',
  styleUrls: ['./public-contact.component.scss']
})
export class PublicContactComponent implements OnInit {

  readonly FIELDS_MAX_LENGTH = 50;

  @Input()
  parentForm: FormGroup;

  @Input()
  set publicContactFormValue(value: PublicContactFormValue) {
    this.publicContact.patchValue(value, { emitEvent: false });
  }

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
    this.publicContact = this.fb.group({
      salutation: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.maxLength(this.FIELDS_MAX_LENGTH)]],
      lastName: ['', [Validators.required, Validators.maxLength(this.FIELDS_MAX_LENGTH)]],
      phone: ['', [phoneInputValidator()]],
      email: ['', [patternInputValidator(EMAIL_REGEX), Validators.maxLength(this.FIELDS_MAX_LENGTH)]]
    }, { validator: publicContactGroupValidator });
  }

  ngOnInit() {
    this.parentForm.addControl('publicContact', this.publicContact);
  }
}

function publicContactGroupValidator(companyGroup: FormGroup): ValidationErrors | null {
  const phone = companyGroup.get('phone').value;
  const email = companyGroup.get('email').value;

  if (!!phone || !!email) {
    return null;
  }

  return {
    'phoneOrEmailRequired': true
  };
}
