import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { hasAnyAuthorities, User, UserRole } from '../../core/auth/user.model';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { CompanyContactTemplateModel } from '../../core/auth/company-contact-template-model';
import { combineLatest } from 'rxjs';
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

  constructor(private authenticationService: AuthenticationService,
              private loginService: LoginService,
              @Inject(DOCUMENT) private document: any) {
    super();
  }

  ngOnInit() {

    combineLatest(this.authenticationService.getCurrentUser(), this.authenticationService.getCurrentCompany()).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(([user, company]) => {
      this.currentUser = user;
      this.currentCompany = company;
      this.companyOrPav = hasAnyAuthorities(user, [UserRole.ROLE_COMPANY, UserRole.ROLE_PAV]);
      this.eIAMActive = !this.loginService.noEiam;
    });
  }

  goToEIAMProfile() {
    this.document.location.href = '/authentication/profile';
  }

}
