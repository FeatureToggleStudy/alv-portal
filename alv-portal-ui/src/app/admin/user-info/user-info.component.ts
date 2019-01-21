import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInfoRepository } from '../../shared/backend-services/user-info/user-info-repository';
import { patternInputValidator } from '../../shared/forms/input/input-field/pattern-input.validator';
import { EMAIL_REGEX } from '../../shared/forms/regex-patterns';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { UserInfoDTO } from '../../shared/backend-services/user-info/user-info.types';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { catchError, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { I18nService } from '../../core/i18n.service';
import { UserRole } from '../../core/auth/user.model';
import { Notification, NotificationType } from '../../shared/layout/notifications/notification.model';
import { UserInfoBadge, UserInfoBadgesMapperService } from './user-info-badges-mapper.service';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { ConfirmModalConfig } from '../../shared/layout/modal/confirm-modal/confirm-modal-config.model';

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

  alert: Notification = null;

  isUserInfoFilled: boolean;

  isOnlyEIAMRoles: boolean;

  private confirmMessage: string;

  constructor(private fb: FormBuilder,
              private userInfoRepository: UserInfoRepository,
              private i18nService: I18nService,
              private modalService: ModalService,
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

  private setActions(): void {
    this.isUserInfoFilled = !!this.user || !this.isUserRoleEmpty();
    this.isOnlyEIAMRoles = this.user == null && !this.isUserRoleEmpty() && this.userRoles.includes('ALLOW');
  }

  private determineRoleToBeRemoved(): string {
    let role = 'NO_ROLE';
    if (this.isUserRoleEmpty()) {
      return role;
    }
    if (this.userRoles.includes(`${UserRole.ROLE_JOB_SEEKER}`)) {
      role = 'JOB_SEEKER';
    } else if (this.userRoles.includes(`${UserRole.ROLE_COMPANY}`)) {
      role = 'COMPANY';
    } else if (this.userRoles.includes(`${UserRole.ROLE_PAV}`)) {
      role = 'PRIVATE_AGENT';
    }
    return role;
  }

  formatAccountability(accountability): string {
    return `${accountability.companyName}, ${accountability.companyExternalId}, ${accountability.companySource}`;
  }

  dismissAlert() {
    this.alert = null;
  }

  onUnregister(): void {
    this.modalService.openConfirm({
      title: 'portal.admin.user-info.actions.unregister.title',
      content: 'portal.admin.user-info.confirmMessage',
      contentParams: { email: this.form.get('emailAddress').value },
      confirmLabel: 'portal.admin.user-info.confirm-dialog.yes',
      cancelLabel: 'portal.admin.user-info.confirm-dialog.no'
    } as ConfirmModalConfig).result
      .then(
        () => this.userInfoRepository.unregisterUser(this.form.get('emailAddress').value, this.determineRoleToBeRemoved())
          .subscribe(() => {
            this.alert = ALERTS.unregisterSuccess;
            this.onSubmit();
          }, () => {
            this.alert = ALERTS.unregisterTechError;
          }),
        () => {});
  }

  onSubmit() {
    this.userInfoRepository.loadUserByEmail(this.form.get('emailAddress').value).pipe(
      withLatestFrom(this.i18nService.stream(
        'portal.admin.user-info.confirmMessage', { email: this.form.get('emailAddress').value }
      )),
      switchMap(([res, message]) => {
        this.user = res.body;
        this.setActions();
        this.confirmMessage = message;
        this.badges = this.userInfoBadgesMapperService.map(this.user);
        return this.userInfoRepository.loadUserRoles(this.user.id);
      }),
      catchError((err: HttpErrorResponse) => {
        this.setToInit();
        if (err.status === 404) {
          this.alert = ALERTS.userNotFound;
        } else {
          this.alert = ALERTS.userTechError;
        }
        return EMPTY;
      }),
      takeUntil(this.ngUnsubscribe))
      .subscribe((roles: HttpResponse<any>) => {
        this.userRoles = roles.body;
      }, (err: HttpErrorResponse) => {
        this.setToInit();
        if (err.status === 404) {
          this.alert = ALERTS.userRoleNotFound;
        } else {
          this.alert = ALERTS.userRoleTechError;
        }
        return EMPTY;
      });
  }

}
