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
  CompanyContactFormValue,
  emptyCompanyContactFormValue,
  mapToCompanyContactFormValue,
  mapToCompanyContactTemplate
} from './user-settings-mapper';
import { NotificationsService } from '../../core/notifications.service';
import { LoginService } from '../../shared/auth/login.service';

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

  eIAMActive: boolean;

  currentUser: User;

  currentCompany: CompanyContactTemplateModel;

  form: FormGroup;

  initialCompanyContactValue: CompanyContactFormValue = emptyCompanyContactFormValue;

  constructor(private fb: FormBuilder,
              private userInfoRepository: UserInfoRepository,
              private authenticationService: AuthenticationService,
              private notificationsService: NotificationsService,
              private loginService: LoginService,
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
      this.eIAMActive = !this.loginService.noEiam;
      if (this.companyOrPav) {
        this.initialCompanyContactValue = mapToCompanyContactFormValue(company);
      }
    });
  }

  goToEIAMProfile() {
    this.document.location.href = '/authentication/profile';
  }

  onSubmit() {
    const formValue = <CompanyContactFormValue>{...this.form.controls.userForm.value, ...this.form.controls.companyForm.value};
    const companyContactTemplate = mapToCompanyContactTemplate(this.currentCompany.companyId, formValue);
    this.userInfoRepository.createCompanyContactTemplate(this.currentUser.id, companyContactTemplate).pipe(
      tap(() => this.authenticationService.updateCompanyContactTemplate(companyContactTemplate))
    ).subscribe(() => {
      this.notificationsService.success('portal.dashboard.user-settings.message.success', false);
    }, () => {
      this.notificationsService.error('portal.dashboard.user-settings.message.failure', false);
    });
  }

  onReset() {
    this.form.controls.userForm.reset(this.initialCompanyContactValue);
    this.form.controls.companyForm.reset(this.initialCompanyContactValue);
  }

}
