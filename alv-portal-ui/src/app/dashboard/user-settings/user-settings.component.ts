import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { hasAnyAuthorities, User, UserRole } from '../../core/auth/user.model';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { takeUntil, tap } from 'rxjs/operators';
import { CompanyContactTemplateModel } from '../../core/auth/company-contact-template-model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserInfoRepository } from '../../shared/backend-services/user-info/user-info-repository';
import { combineLatest } from 'rxjs';
import {
  CompanyFormValue,
  ContactFormValue, emptyCompanyFormValue, emptyContactFormValue, mapToCompanyContactTemplate,
  mapToCompanyFormValue,
  mapToContactFormValue
} from './user-settings-mapper';
import { CompanyContactTemplate } from '../../shared/backend-services/user-info/user-info.types';
import { Notification, NotificationType } from '../../shared/layout/notifications/notification.model';

@Component({
  selector: 'alv-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent extends AbstractSubscriber implements OnInit {

  readonly EIAM_ACCOUNT_LIST = [
    'portal.dashboard.user-settings.eiam-account.name',
    'portal.dashboard.user-settings.eiam-account.password',
    'portal.dashboard.user-settings.eiam-account.seq-question',
    'portal.dashboard.user-settings.eiam-account.e-mail',
    'portal.dashboard.user-settings.eiam-account.telephone',
    'portal.dashboard.user-settings.eiam-account.language'];

  companyOrPav: boolean;

  titleName: string;

  currentUser: User;

  currentCompany: CompanyContactTemplateModel;

  form: FormGroup;

  initialContactValue: ContactFormValue = emptyContactFormValue;

  initialCompanyValue: CompanyFormValue = emptyCompanyFormValue;

  alert: Notification;

  constructor(private fb: FormBuilder,
              private userInfoRepository: UserInfoRepository,
              private authenticationService: AuthenticationService,
              @Inject(DOCUMENT) private document: any) {
    super();
  }

  ngOnInit() {

    this.form = this.fb.group({});

    combineLatest(this.authenticationService.getCurrentUser(), this.authenticationService.getCurrentCompany()).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(([user, company]) => {
      this.currentUser = user;
      this.currentCompany = company;
      this.titleName = user.displayName;
      this.companyOrPav = hasAnyAuthorities(user, [UserRole.ROLE_COMPANY, UserRole.ROLE_PAV]);
      if(this.companyOrPav) {
        this.initialContactValue = mapToContactFormValue(this.currentCompany);
        this.initialCompanyValue = mapToCompanyFormValue(this.currentCompany);
        this.addCompanyToTitle();
      }
    });
  }

  goToEIAMProfile() {
    this.document.location.href = '/authentication/profile';
  }

  onSubmit() {
    this.alert = null;
    const contactFormValue = <ContactFormValue>this.form.controls.contactForm.value;
    const companyFormValue = <CompanyFormValue>this.form.controls.companyForm.value;
    const companyContactTemplate: CompanyContactTemplate = mapToCompanyContactTemplate(this.currentCompany.companyId, contactFormValue, companyFormValue);
    this.userInfoRepository.createCompanyContactTemplate(this.currentUser.id, companyContactTemplate).pipe(
      tap(() => this.authenticationService.updateCompanyContactTemplate(companyContactTemplate))
    ).subscribe(() => {
      this.alert = {
        type: NotificationType.SUCCESS,
        messageKey: 'portal.dashboard.user-settings.message.success',
        isSticky: true
      };
    }, () => {
      this.alert = {
        type: NotificationType.ERROR,
        messageKey: 'portal.dashboard.user-settings.message.failure',
        isSticky: true
      };
    });
  }

  onResetContact() {
    if(this.form.controls.contactForm) {
      this.form.controls.contactForm.reset();
      this.form.controls.contactForm.patchValue(this.initialContactValue);
    }
  }

  onResetCompany() {
    if(this.form.controls.companyForm) {
      this.form.controls.companyForm.reset();
      this.form.controls.companyForm.patchValue(this.initialCompanyValue);
    }
  }

  private addCompanyToTitle() {
    this.titleName = `${this.titleName}, ${this.currentCompany.companyName}`;
  }

}
