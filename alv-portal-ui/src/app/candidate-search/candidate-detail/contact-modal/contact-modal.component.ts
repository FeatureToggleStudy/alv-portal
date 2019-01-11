import { Component, Input, OnInit } from '@angular/core';
import { CandidateProfile } from '../../../shared/backend-services/candidate/candidate.types';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { I18nService } from '../../../core/i18n.service';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { takeUntil, withLatestFrom } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { phoneInputValidator } from '../../../shared/forms/input/phone-input/phone-input.validator';
import { EMAIL_REGEX, HOUSE_NUMBER_REGEX } from '../../../shared/forms/regex-patterns';
import { CompanyContactTemplateModel } from '../../../core/auth/company-contact-template-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
        'global.reference.canton.CH',
        'candidate-detail.anonymous-contact.mail-body-preamble'
    ];

    @Input()
    candidate: CandidateProfile;

    form: FormGroup;

    countryValue: string;
    mailBodyPreamble: string;

    constructor(private authenticationService: AuthenticationService,
                private i18nService: I18nService,
                private fb: FormBuilder,
                public activeModal: NgbActiveModal) {
        super();
    }

    ngOnInit() {

        this.form = this.prepareForm();

        this.authenticationService.getCurrentCompany().pipe(
            withLatestFrom(this.i18nService.stream(this.LABEL_VALUES)),
            takeUntil(this.ngUnsubscribe))
            .subscribe( ([company, translate]) => {
                this.countryValue = translate[this.LABEL_VALUES[2]];
                this.mailBodyPreamble = translate[this.LABEL_VALUES[3]];
                this.patchFormValues(company, translate);
            });

        this.form.get('postCheckbox').valueChanges.pipe(
            withLatestFrom(this.authenticationService.getCurrentCompany()))
            .subscribe(([postCheckBoxEnabled, company]) => {
                if (postCheckBoxEnabled) {
                    this.form.addControl('company', this.fb.group({
                        contactPerson: [null, Validators.required],
                        companyName: [null, Validators.required],
                        companyStreet: [null, Validators.required],
                        companyHouseNr: [null, [Validators.required, Validators.pattern(HOUSE_NUMBER_REGEX)]],
                        companyZipCode: [null, Validators.required],
                        companyCity: [null, Validators.required],
                        companyCountry: [null, Validators.required]
                    }));
                    this.patchCompanyValues(company);
                } else {
                    this.form.removeControl('company');
                }
            });

        this.form.get('phoneCheckbox').valueChanges.pipe(
            withLatestFrom(this.authenticationService.getCurrentCompany()))
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
            withLatestFrom(this.authenticationService.getCurrentCompany()))
            .subscribe(([emailCheckBoxEnabled, company]) => {
                if (emailCheckBoxEnabled) {
                    this.form.get('email').setValidators([Validators.required, Validators.pattern(EMAIL_REGEX)]);
                    this.patchEmailValue(company.email);
                } else {
                    this.form.get('email').clearValidators();
                    this.patchEmailValue(null);
                }
            });

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
            body: [null, Validators.required],
            companyName: [null, Validators.required],
            phoneCheckbox: [false],
            phone: [null],
            emailCheckbox: [false],
            email: [null],
            postCheckbox: [false]
        }, {
            validator: [ atLeastOneRequiredValidator ]
        });

    }

    private patchFormValues(company: CompanyContactTemplateModel, translate: Object): void {

        this.form.patchValue({
            subject: translate[this.LABEL_VALUES[0]],
            body: translate[this.LABEL_VALUES[1]],
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
            contactPerson: company.lastName + ', ' + company.firstName,
            companyName: company.companyName,
            companyStreet: company.companyStreet,
            companyHouseNr: company.companyHouseNr,
            companyZipCode: company.companyZipCode,
            companyCity: company.companyCity,
            companyCountry: this.countryValue
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

    onSubmit() {

        if (this.form.invalid) {
            return;
        }
        // TODO send email
        this.activeModal.close();
    }

}
