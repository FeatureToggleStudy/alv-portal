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
  CompanyInfoFormValue,
  UserInfoFormValue,
  emptyCompanyFormValue,
  emptyUserFormValue,
  mapToCompanyContactTemplate,
  mapToCompanyInfoFormValue,
  mapToUserInfoFormValue
} from './user-settings-mapper';
import { CompanyContactTemplate } from '../../shared/backend-services/user-info/user-info.types';
import { NotificationsService } from '../../core/notifications.service';

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

  currentUser: User;

  currentCompany: CompanyContactTemplateModel;

  form: FormGroup;

  initialUserValue: UserInfoFormValue = emptyUserFormValue;

  initialCompanyValue: CompanyInfoFormValue = emptyCompanyFormValue;

  constructor(private fb: FormBuilder,
              private userInfoRepository: UserInfoRepository,
              private authenticationService: AuthenticationService,
              private notificationsService: NotificationsService,
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
      this.companyOrPav = hasAnyAuthorities(user, [UserRole.ROLE_COMPANY, UserRole.ROLE_PAV]);
      this.setInitialValues(company);
    });
  }

  goToEIAMProfile() {
    this.document.location.href = '/authentication/profile';
  }

  onSubmitUser() {
    const userFormValue = <UserInfoFormValue>this.form.controls.userForm.value;
    this.form.controls.companyForm.patchValue(this.initialCompanyValue);
    const companyContactTemplate = mapToCompanyContactTemplate(
      this.currentCompany.companyId, userFormValue, this.initialCompanyValue);
    this.submit(companyContactTemplate);
  }

  onSubmitCompany() {
    const companyFormValue = <CompanyInfoFormValue>this.form.controls.companyForm.value;
    this.form.controls.userForm.patchValue(this.initialUserValue);
    const companyContactTemplate = mapToCompanyContactTemplate(
      this.currentCompany.companyId, this.initialUserValue, companyFormValue);
    this.submit(companyContactTemplate);
  }

  onResetUser() {
    if (this.form.controls.userForm) {
      this.form.controls.userForm.reset(this.initialUserValue);
    }
  }

  onResetCompany() {
    if (this.form.controls.companyForm) {
      this.form.controls.companyForm.reset(this.initialCompanyValue);
    }
  }

  private setInitialValues(company: CompanyContactTemplateModel) {
    if (this.companyOrPav) {
      this.initialUserValue = mapToUserInfoFormValue(company);
      this.initialCompanyValue = mapToCompanyInfoFormValue(company);
    }
  }

  private submit(company: CompanyContactTemplate) {
    this.userInfoRepository.createCompanyContactTemplate(this.currentUser.id, company).pipe(
      tap(() => this.authenticationService.updateCompanyContactTemplate(company))
    ).subscribe(() => {
      this.notificationsService.success('portal.dashboard.user-settings.message.success', false);
    }, () => {
      this.notificationsService.error('portal.dashboard.user-settings.message.failure', false);
    });
  }

}
