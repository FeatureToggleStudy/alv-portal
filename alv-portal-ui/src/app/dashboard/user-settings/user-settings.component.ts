import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CompanyContactTemplateModel } from '../../core/auth/company-contact-template-model';
import { hasAnyAuthorities, User, UserRole } from '../../core/auth/user.model';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { takeUntil, tap } from 'rxjs/operators';
import { UserInfoRepository } from '../../shared/backend-services/user-info/user-info-repository';
import {
  CompanyFormValue,
  ContactFormValue,
  mapToCompanyContactTemplate,
  mapToCompanyFormValue,
  mapToContactFormValue
} from './user-settings-mapper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import { patternInputValidator } from '../../shared/forms/input/input-field/pattern-input.validator';
import { EMAIL_REGEX, HOUSE_NUMBER_REGEX } from '../../shared/forms/regex-patterns';
import { Notification, NotificationType } from '../../shared/layout/notifications/notification.model';
import { SelectableOption } from '../../shared/forms/input/selectable-option.model';
import { Salutation } from '../../shared/backend-services/shared.types';
import { CompanyContactTemplate } from '../../shared/backend-services/user-info/user-info.types';
import { phoneInputValidator } from '../../shared/forms/input/input-field/phone-input.validator';

@Component({
  selector: 'alv-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent extends AbstractSubscriber implements OnInit {

  currentUser: User;

  currentCompany: CompanyContactTemplateModel;

  form: FormGroup;

  contactForm: FormGroup;

  companyForm: FormGroup;

  initialContactFormValue: ContactFormValue;

  initialCompanyFormValue: CompanyFormValue;

  alert: Notification;

  companyOrPav: boolean;

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
              private userInfoRepository: UserInfoRepository,
              private authenticationService: AuthenticationService,
              @Inject(DOCUMENT) private document: any) {
    super();
  }

  ngOnInit() {

    this.prepareContactForm();
    this.prepareCompanyForm();

    combineLatest(this.authenticationService.getCurrentUser(), this.authenticationService.getCurrentCompany()).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(([user, company]) => {
      this.currentUser = user;
      this.companyOrPav = hasAnyAuthorities(user, [UserRole.ROLE_COMPANY, UserRole.ROLE_PAV]);
      this.currentCompany = company;
      this.patchContactFormValue(mapToContactFormValue(this.currentCompany));
      this.patchCompanyFormValue(mapToCompanyFormValue(this.currentCompany));
    });
  }

  goToEIAMProfile() {
    this.document.location.href = '/authentication/profile';
  }

  onSubmit() {
    this.alert = null;
    const contactFormValue = <ContactFormValue>this.contactForm.value;
    const companyFormValue = <CompanyFormValue>this.companyForm.value;
    const companyContactTemplate: CompanyContactTemplate = mapToCompanyContactTemplate(this.currentCompany.companyId, contactFormValue, companyFormValue);
    this.userInfoRepository.createCompanyContactTemplate(this.currentUser.id, companyContactTemplate).pipe(
      tap(() => this.authenticationService.updateCompanyContactTemplate(companyContactTemplate))
    ).subscribe(() => {
      this.alert = {
        type: NotificationType.SUCCESS,
        messageKey: 'contact-template-management.successSaveMessage',
        isSticky: true
      };
    }, () => {
      this.alert = {
        type: NotificationType.ERROR,
        messageKey: 'contact-template-management.failureSaveMessage',
        isSticky: true
      };
    });
  }

  onResetContact() {
    this.contactForm.reset();
    this.patchContactFormValue(this.initialContactFormValue);
  }

  onResetCompany() {
    this.companyForm.reset();
    this.patchCompanyFormValue(this.initialCompanyFormValue);
  }

  private prepareContactForm() {
    this.contactForm = this.fb.group({
      salutation: [null, [Validators.required]],
      firstName: [{ value: null, disabled: true }, [Validators.required]],
      lastName: [{ value: null, disabled: true }, [Validators.required]],
      phone: [null, [Validators.required, phoneInputValidator()]],
      email: [null, [Validators.required, patternInputValidator(EMAIL_REGEX)]]
    });
  }

  private patchContactFormValue(contact: ContactFormValue) {
    this.contactForm.patchValue({
      salutation: contact.salutation,
      firstName: contact.firstName,
      lastName: contact.lastName,
      phone: contact.phone,
      email: contact.email
    });
  }

  private prepareCompanyForm() {
    this.companyForm = this.fb.group({
      companyName: [null, [Validators.required]],
      companyStreet: [null, [Validators.required]],
      companyHouseNr: [null, [patternInputValidator(HOUSE_NUMBER_REGEX)]],
      companyZipCode: [null, [Validators.required]],
      companyCity: [null, [Validators.required]]
    });
  }

  private patchCompanyFormValue(company: CompanyFormValue) {
    this.companyForm.patchValue({
      companyName: company.companyName,
      companyStreet: company.companyStreet,
      companyHouseNr: company.companyHouseNr,
      companyZipCode: company.companyZipCode,
      companyCity: company.companyCity
    });
  }

}
