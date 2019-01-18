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
import { takeUntil } from 'rxjs/operators';
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
  set applicationFormValue(value: ApplicationFormValue) {
    this._applicationFormValue = value;

    const selectedApplicationTypes = {
      form: !!value.formUrl,
      email: !!value.emailAddress,
      phone: !!value.phoneNumber,
      post: !!value.postAddress,
    };
    this.toggleAll(selectedApplicationTypes);
    this.selectedApplicationTypes.patchValue(selectedApplicationTypes, { emitEvent: false });

    this.setFormValue(value);
  }

  application: FormGroup;

  selectedApplicationTypes: FormGroup;

  postAddressFormValue: PostAddressFormValue;

  private _applicationFormValue: ApplicationFormValue;


  constructor(private fb: FormBuilder,
              private cdRef: ChangeDetectorRef) {
    super();

    this.selectedApplicationTypes = this.fb.group({
      form: [false],
      email: [false],
      phone: [false],
      post: [false],
    }, { validator: atLeastOneRequiredValidator });

    this.application = this.fb.group({
      additionalInfo: [null, [
        Validators.maxLength(this.ADDITIONAL_INFO_MAX_LENGTH)
      ]]
    });
  }

  ngOnInit(): void {
    this.parentForm.addControl(JobPublicationFormValueKeys.application, this.application);

    this.selectedApplicationTypes.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(this.toggleAll.bind(this));
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

  private setFormValue(value: ApplicationFormValue) {
    const { formUrl, emailAddress, phoneNumber, additionalInfo, postAddress } = value;
    this.application.patchValue({
      formUrl,
      emailAddress,
      phoneNumber,
      additionalInfo
    }, { emitEvent: false });

    this.postAddressFormValue = postAddress || emptyPostAddressFormValue;
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
