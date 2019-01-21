import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { ApplicationFormValue } from './application-form-value.types';
import { phoneInputValidator } from '../../../shared/forms/input/input-field/phone-input.validator';
import { patternInputValidator } from '../../../shared/forms/input/input-field/pattern-input.validator';
import { EMAIL_REGEX, URL_REGEX } from '../../../shared/forms/regex-patterns';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { startWith, takeUntil } from 'rxjs/operators';
import {
  emptyPostAddressFormValue,
  PostAddressFormValue
} from '../post-address-form/post-address-form-value.types';
import { JobPublicationFormValueKeys } from '../job-publication-form-value.types';


interface SelectedApplicationTypes {
  form: boolean;
  email: boolean;
  phone: boolean;
  post: boolean;
}

@Component({
  selector: 'alv-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent extends AbstractSubscriber implements OnInit {

  readonly ADDITIONAL_INFO_MAX_LENGTH = 240;

  @Input()
  parentForm: FormGroup;

  @Input()
  applicationFormValue: ApplicationFormValue;

  application: FormGroup;

  selectedApplicationTypes: FormGroup;

  postAddressFormValue: PostAddressFormValue;

  constructor(private fb: FormBuilder,
              private cdRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    const { additionalInfo, formUrl, emailAddress, phoneNumber, postAddress } = this.applicationFormValue;

    this.selectedApplicationTypes = this.fb.group({
      form: [!!formUrl],
      email: [!!emailAddress],
      phone: [!!phoneNumber],
      post: [!!postAddress]
    }, { validator: atLeastOneRequiredValidator });

    this.application = this.fb.group({
      selectedApplicationTypes: this.selectedApplicationTypes,
      additionalInfo: [additionalInfo, [
        Validators.maxLength(this.ADDITIONAL_INFO_MAX_LENGTH)
      ]]
    });

    this.parentForm.addControl(JobPublicationFormValueKeys.application, this.application);

    this.selectedApplicationTypes.valueChanges
      .pipe(
        startWith(this.selectedApplicationTypes.value),
        takeUntil(this.ngUnsubscribe)
      ).subscribe(this.toggleAll.bind(this));

    this.postAddressFormValue = this.applicationFormValue.postAddress || emptyPostAddressFormValue;
  }

  copyPhoneNumberFromPublicContact() {
    const publicContactPhoneNumber = this.parentForm.get('publicContact.phone').value;
    this.parentForm.get('application.phoneNumber').setValue(publicContactPhoneNumber);
  }

  copyEmailFromPublicContact() {
    const publicContactEmail = this.parentForm.get('publicContact.email').value;
    this.parentForm.get('application.emailAddress').setValue(publicContactEmail);
  }

  copyAddressFromCompany() {
    const company = this.parentForm.get('company').value;
    this.application.get('postAddress.countryIsoCode').setValue(this.parentForm.get('company.countryIsoCode').value);
    setTimeout(() => {
      this.application.get('postAddress').setValue(company);
      this.cdRef.detectChanges();
    });
  }

  private toggleAll(selectedApplicationTypes: SelectedApplicationTypes) {
    const { form, email, phone, post } = selectedApplicationTypes;

    this.toggleFormUrl(form);
    this.toggleEmailAddress(email);
    this.togglePhoneNumber(phone);
    this.togglePostAddress(post);
  }

  private toggleFormUrl(enabled: boolean) {
    if (enabled) {
      this.application.addControl('formUrl', new FormControl(null, [
        Validators.required,
        patternInputValidator(URL_REGEX)
      ]));
    } else {
      this.application.removeControl('formUrl');
    }
  }

  private toggleEmailAddress(enabled: boolean) {
    if (enabled) {
      this.application.addControl('emailAddress', new FormControl(null, [
        Validators.required,
        patternInputValidator(EMAIL_REGEX)
      ]));
    } else {
      this.application.removeControl('emailAddress');
    }
  }

  private togglePhoneNumber(enabled: boolean) {
    if (enabled) {
      this.application.addControl('phoneNumber', new FormControl(null, [
        Validators.required,
        phoneInputValidator()
      ]));
    } else {
      this.application.removeControl('phoneNumber');
    }
  }

  private togglePostAddress(enabled: boolean) {
    //nothing to do
  }
}

function atLeastOneRequiredValidator(formGroup: FormGroup): ValidationErrors | null {
  const formUrl = formGroup.get('form').value;
  const emailAddress = formGroup.get('email').value;
  const phoneNumber = formGroup.get('phone').value;
  const postAddress = formGroup.get('post').value;

  const valid = formUrl || emailAddress || phoneNumber || postAddress;

  return valid ? null : { atLeastOneRequired: true };
}
