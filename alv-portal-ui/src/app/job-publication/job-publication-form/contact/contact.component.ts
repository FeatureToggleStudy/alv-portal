import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Salutation } from '../../../shared/backend-services/shared.types';
import { of } from 'rxjs';
import { phoneInputValidator } from '../../../shared/forms/input/input-field/phone-input.validator';
import { EMAIL_REGEX } from '../../../shared/forms/regex-patterns';
import { take, tap } from 'rxjs/operators';
import { I18nService } from '../../../core/i18n.service';
import { EmploymentFormValue } from '../employment/employment-form-value.types';
import { ContactFormValue } from './contact-form-value.types';
import { patternInputValidator } from '../../../shared/forms/input/input-field/pattern-input.validator';

@Component({
  selector: 'alv-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  readonly FIELDS_MAX_LENGTH = 50;

  readonly CONTACT_LANGUAGES = ['de', 'fr', 'it', 'en'];

  @Input()
  parentForm: FormGroup;

  @Input()
  set contactFormValue(value: ContactFormValue) {
    this.contact.patchValue(value, { emitEvent: false });
  }

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

  constructor(private fb: FormBuilder,
              private i18nService: I18nService) {
    this.contact = this.fb.group({
      languageIsoCode: [null],
      salutation: [null, Validators.required],
      firstName: [null, [Validators.required, Validators.maxLength(this.FIELDS_MAX_LENGTH)]],
      lastName: [null, [Validators.required, Validators.maxLength(this.FIELDS_MAX_LENGTH)]],
      phone: [null, [Validators.required, phoneInputValidator()]],
      email: [null, [Validators.required, patternInputValidator(EMAIL_REGEX), Validators.maxLength(this.FIELDS_MAX_LENGTH)]]
    });
  }

  ngOnInit() {
    this.parentForm.addControl('contact', this.contact);

    this.setDefaultLanguageOption();
  }

  private setDefaultLanguageOption() {
    this.i18nService.currentLanguage$.pipe(
      take(1)
    ).subscribe((lang: string) => {
      this.contact.get('languageIsoCode').setValue(lang);
    });
  }
}
