import { Component, Input, OnInit } from '@angular/core';
import { CandidateProfile } from '../../../shared/backend-services/candidate/candidate.types';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { I18nService } from '../../../core/i18n.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    @Input()
    candidate: CandidateProfile;

    form: FormGroup;

    constructor(private authenticationService: AuthenticationService,
                private i18nService: I18nService,
                private fb: FormBuilder,
                private activeModal: NgbActiveModal) {
        super();
    }

    ngOnInit() {

        this.form = this.prepareForm();

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

        this.authenticationService.getCurrentCompany().pipe(
            takeUntil(this.ngUnsubscribe))
            .subscribe(company => this.patchFormValues(company));
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            subject: [null, Validators.required],
            body: [null, Validators.required],
            companyName: [null, Validators.required],
            phoneCheckbox: [false],
            phone: [null],
            emailCheckbox: [false],
            email: [null],
            postCheckbox: [false]
        });
    }

    private patchFormValues(company: CompanyContactTemplateModel): void {

        this.form.patchValue({
            subject: 'Title translate',
            body: 'Message translate',
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
            companyCountry: 'global.reference.canton.CH translate'
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
        console.log(this.form.value);
    }
}
