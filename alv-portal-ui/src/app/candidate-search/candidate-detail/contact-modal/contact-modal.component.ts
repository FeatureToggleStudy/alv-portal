import { Component, Input, OnInit } from '@angular/core';
import { CandidateProfile, EmailContactModal } from '../../../shared/backend-services/candidate/candidate.types';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { I18nService } from '../../../core/i18n.service';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { distinctUntilChanged, filter, startWith, takeUntil, withLatestFrom } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { EMAIL_REGEX, HOUSE_NUMBER_REGEX } from '../../../shared/forms/regex-patterns';
import { CompanyContactTemplateModel } from '../../../core/auth/company-contact-template-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { phoneInputValidator } from '../../../shared/forms/input/input-field/phone-input.validator';
import { combineLatest, Observable } from 'rxjs';
import { CandidateContactRepository } from '../../../shared/backend-services/candidate/candidate-contact-repository';
import { patternInputValidator } from '../../../shared/forms/input/input-field/pattern-input.validator';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { IsoCountryService } from '../../../job-advertisement/job-publication/job-publication-form/iso-country.service';

@Component({
  selector: 'alv-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss']
})
export class ContactModalComponent extends AbstractSubscriber implements OnInit {

  readonly TITLE_MAX_LENGTH = 150;

  readonly MESSAGE_MAX_LENGTH = 1000;

  readonly LABEL_VALUES: string[] = [
    'candidate-detail.candidate-anonymous-contact.subject',
    'candidate-detail.anonymous-contact.personal-message',
    'candidate-detail.anonymous-contact.mail-body-preamble'
  ];

  @Input()
  candidate: CandidateProfile;

  countryOptions$: Observable<SelectableOption[]>;

  countryIsoCode$: Observable<String>;

  form: FormGroup;

  mailBodyPreamble: string;

  constructor(private authenticationService: AuthenticationService,
              private i18nService: I18nService,
              private isoCountryService: IsoCountryService,
              private fb: FormBuilder,
              private candidateContactRepository: CandidateContactRepository,
              public activeModal: NgbActiveModal) {
    super();
  }

  ngOnInit() {

    this.form = this.prepareForm();

    this.countryOptions$ = this.isoCountryService.countryOptionsSortedWithMainCountriesFirst$;

    combineLatest(this.authenticationService.getCurrentCompany(), this.i18nService.stream(this.LABEL_VALUES)).pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe(([company, translate]) => {
        this.mailBodyPreamble = translate[this.LABEL_VALUES[2]];
        this.patchAllFormValues(company, translate);
      });

    this.form.get('postCheckbox').valueChanges.pipe(
      distinctUntilChanged(),
      withLatestFrom(this.authenticationService.getCurrentCompany()),
      takeUntil(this.ngUnsubscribe))
      .subscribe(([postCheckBoxEnabled, company]) => {
        if (postCheckBoxEnabled) {
          this.form.addControl('company', this.generateCompanyFormGroup());
          this.patchCompanyValues(company);
        } else {
          this.form.removeControl('company');
        }
      });

    this.form.get('phoneCheckbox').valueChanges.pipe(
      distinctUntilChanged(),
      withLatestFrom(this.authenticationService.getCurrentCompany()),
      takeUntil(this.ngUnsubscribe))
      .subscribe(([phoneCheckBoxEnabled, company]) => {
        if (phoneCheckBoxEnabled) {
          this.form.get('phone').setValidators([Validators.required, phoneInputValidator()]);
          this.patchPhoneValue(company.phone);
        } else {
          this.form.get('phone').clearValidators();
          this.patchPhoneValue(null);
        }
      });

    this.form.get('emailCheckbox').valueChanges.pipe(
      distinctUntilChanged(),
      withLatestFrom(this.authenticationService.getCurrentCompany()),
      takeUntil(this.ngUnsubscribe))
      .subscribe(([emailCheckBoxEnabled, company]) => {
        if (emailCheckBoxEnabled) {
          this.form.get('email').setValidators([Validators.required, patternInputValidator(EMAIL_REGEX)]);
          this.patchEmailValue(company.email);
        } else {
          this.form.get('email').clearValidators();
          this.patchEmailValue(null);
        }
      });

    this.countryIsoCode$ = this.form.controls.company.get('countryIsoCode').valueChanges
      .pipe(
        filter((value) => !!value),
        startWith(IsoCountryService.ISO_CODE_SWITZERLAND),
      );

  }

  onSubmit() {
    this.candidateContactRepository.sendContactModalEmail(this.mapEmailContent(this.form.value))
      .subscribe(() => this.activeModal.close());
  }

  private prepareForm(): FormGroup {

    const atLeastOneRequiredValidator: ValidatorFn = (formGroup: FormGroup) => {
      const phone = formGroup.get('phoneCheckbox').value;
      const email = formGroup.get('emailCheckbox').value;
      const post = formGroup.get('postCheckbox').value;
      return phone || email || post ? null : { atLeastOneRequired: true };
    };

    return this.fb.group({
      subject: [null, Validators.required],
      company: this.generateCompanyFormGroup(),
      personalMessage: [null, Validators.required],
      companyName: [null, Validators.required],
      phoneCheckbox: [true],
      phone: [null, [Validators.required, phoneInputValidator()]],
      emailCheckbox: [true],
      email: [null, [Validators.required, patternInputValidator(EMAIL_REGEX)]],
      postCheckbox: [true]
    }, {
      validator: [atLeastOneRequiredValidator]
    });
  }

  private generateCompanyFormGroup() {
    return this.fb.group({
      contactPerson: [null, Validators.required],
      companyName: [null, Validators.required],
      companyStreet: [null, Validators.required],
      companyHouseNr: [null, [Validators.required, patternInputValidator(HOUSE_NUMBER_REGEX)]],
      companyZipCode: [null, Validators.required],
      companyCity: [null, Validators.required],
      countryIsoCode: [null, Validators.required]
    });
  }

  private patchAllFormValues(company: CompanyContactTemplateModel, translate: Object): void {

    this.form.patchValue({
      subject: translate[this.LABEL_VALUES[0]],
      personalMessage: translate[this.LABEL_VALUES[1]],
      companyName: company.companyName,
      phone: company.phone,
      email: company.email
    });

    if (this.form.controls.company) {
      this.patchCompanyValues(company);
    }
  }

  private patchCompanyValues(company: CompanyContactTemplateModel) {
    const companyForm = this.form.controls.company;
    companyForm.patchValue({
      contactPerson: company.displayName,
      companyName: company.companyName,
      companyStreet: company.companyStreet,
      companyHouseNr: company.companyHouseNr,
      companyZipCode: company.companyZipCode,
      companyCity: company.companyCity,
      countryIsoCode: IsoCountryService.ISO_CODE_SWITZERLAND
    });
  }

  private patchPhoneValue(phone: string) {
    this.form.patchValue({
      phone: phone
    });
  }

  private patchEmailValue(email: string) {
    this.form.patchValue({
      email: email
    });
  }

  private mapEmailContent(formValue: any): EmailContactModal {
    return {
      candidateId: this.candidate.id,
      company: formValue.company,
      companyName: formValue.companyName,
      email: formValue.email,
      phone: formValue.phone,
      personalMessage: formValue.personalMessage,
      subject: formValue.subject
    };
  }

}
