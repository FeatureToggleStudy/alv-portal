import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInfoRepository } from '../../shared/backend-services/user-info/user-info-repository';
import { patternInputValidator } from '../../shared/forms/input/input-field/pattern-input.validator';
import { EMAIL_REGEX } from '../../shared/forms/regex-patterns';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { UserInfoDTO } from '../../shared/backend-services/user-info/user-info.types';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { catchError, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { I18nService } from '../../core/i18n.service';
import { UserRole } from '../../core/auth/user.model';
import { Notification, NotificationType } from '../../shared/layout/notifications/notification.model';
import { UserInfoBadge, UserInfoBadgesMapperService } from './user-info-badges-mapper.service';

const ALERTS = {
  userNotFound: {
    type: NotificationType.ERROR,
    messageKey: 'portal.admin.user-info.alert.user-info-not-found',
    isSticky: true
  } as Notification,
  userTechError: {
    type: NotificationType.ERROR,
    messageKey: 'portal.admin.user-info.alert.user-info-technical',
    isSticky: true
  } as Notification,
  userRoleNotFound: {
    type: NotificationType.ERROR,
    messageKey: 'portal.admin.user-info.alert.eIAM-role-not-found',
    isSticky: true
  } as Notification,
  userRoleTechError: {
    type: NotificationType.ERROR,
    messageKey: 'portal.admin.user-info.alert.eIAM-role-technical',
    isSticky: true
  } as Notification,
  unregisterTechError: {
    type: NotificationType.ERROR,
    messageKey: 'portal.admin.user-info.alert.unregister-technical',
    isSticky: true
  } as Notification,
  unregisterSuccess: {
    type: NotificationType.SUCCESS,
    messageKey: 'portal.admin.user-info.alert.unregister-success',
    isSticky: true
  } as Notification
};

@Component({
  selector: 'alv-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent extends AbstractSubscriber implements OnInit {

  form: FormGroup;

  user: UserInfoDTO = null;

  userRoles: string[] = [];

  badges: UserInfoBadge[] = [];

  alerts: Notification[] = [];

  private confirmMessage: string;

  constructor(private fb: FormBuilder,
              private userInfoRepository: UserInfoRepository,
              private i18nService: I18nService,
              private userInfoBadgesMapperService: UserInfoBadgesMapperService) {
    super();
  }

  ngOnInit() {
    this.form = this.prepareForm();

    this.i18nService.currentLanguage$.pipe(
      switchMap(() => {
        const email = this.form.get('emailAddress').value || '';
        return this.i18nService.stream('portal.admin.user-info.confirmMessage', {email: email});
      }),
      takeUntil(this.ngUnsubscribe))
      .subscribe((message) => this.confirmMessage = message);
  }

  private prepareForm(): FormGroup {
    return this.fb.group({
      emailAddress: [null, [Validators.required, patternInputValidator(EMAIL_REGEX)]]
    });
  }

  private setToInit() {
    this.user = null;
    this.userRoles = [];
  }

  private isUserRoleEmpty(): boolean {
    return this.userRoles == null || this.userRoles.length < 1;
  }

  private confirmUnregister(): boolean {
    return window.confirm(this.confirmMessage);
  }

  private getParams(): HttpParams {
    let params = new HttpParams()
      .set('eMail', this.form.get('emailAddress').value)
      .set('role', 'NO_ROLE');

    if (this.isUserRoleEmpty()) {
      return params;
    }
    if (this.userRoles.includes(`${UserRole.ROLE_JOB_SEEKER}`)) {
      params = params.set('role', 'JOB_SEEKER');
    } else if (this.userRoles.includes(`${UserRole.ROLE_COMPANY}`)) {
      params = params.set('role', 'COMPANY');
    } else if (this.userRoles.includes(`${UserRole.ROLE_PAV}`)) {
      params = params.set('role', 'PRIVATE_AGENT');
    }
    return params;
  }

  dismissAlert(alert: Notification, alerts: Notification[]) {
    alerts.splice(alerts.indexOf(alert), 1);
  }

  isUserInfoEmpty(): boolean {
    return this.user == null || this.isUserRoleEmpty();
  }

  onlyEIAMRoles(): boolean {
    return this.user == null && !this.isUserRoleEmpty() && this.userRoles.includes('ALLOW');
  }

  formatAccountability(accountability): string {
    return `${accountability.companyName}, ${accountability.companyExternalId}, ${accountability.companySource}`;
  }

  onUnregister(): void {
    if (!this.confirmUnregister()) {
      return;
    }
    this.userInfoRepository.unregisterUser(this.getParams())
      .subscribe(() => {
        this.alerts.push(ALERTS.unregisterSuccess);
        this.onSubmit();
      }, () => {
        this.alerts.push(ALERTS.unregisterTechError);
      });
  }

  onSubmit() {
    this.userInfoRepository.loadUserByEmail(this.form.get('emailAddress').value).pipe(
      withLatestFrom(this.i18nService.stream('portal.admin.user-info.confirmMessage', {email: this.form.get('emailAddress').value})),
      switchMap(([res, message]) => {
        this.user = res.body;
        this.confirmMessage = message;
        this.badges = this.userInfoBadgesMapperService.map(this.user);
        return this.userInfoRepository.loadUserRoles(this.user.id);
      }),
      catchError((err: HttpErrorResponse) => {
        this.setToInit();
        if (err.status === 404) {
          this.alerts.push(ALERTS.userNotFound);
        } else {
          this.alerts.push(ALERTS.userTechError);
        }
        return EMPTY;
      }),
      takeUntil(this.ngUnsubscribe))
      .subscribe((roles) => {
        this.userRoles = roles.body;
      }, (err: HttpErrorResponse) => {
        this.setToInit();
        if (err.status === 404) {
          this.alerts.push(ALERTS.userRoleNotFound);
        } else {
          this.alerts.push(ALERTS.userRoleTechError);
        }
        return EMPTY;
      });
  }

}
