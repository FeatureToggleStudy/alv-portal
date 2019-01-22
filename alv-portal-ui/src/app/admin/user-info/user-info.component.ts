import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInfoRepository } from '../../shared/backend-services/user-info/user-info-repository';
import { patternInputValidator } from '../../shared/forms/input/input-field/pattern-input.validator';
import { EMAIL_REGEX } from '../../shared/forms/regex-patterns';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { UserInfoDTO } from '../../shared/backend-services/user-info/user-info.types';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
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

const NO_ROLE: string = 'NO_ROLE';

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

  constructor(private fb: FormBuilder,
              private userInfoRepository: UserInfoRepository,
              private modalService: ModalService,
              private userInfoBadgesMapperService: UserInfoBadgesMapperService) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      emailAddress: [null, [Validators.required, patternInputValidator(EMAIL_REGEX)]]
    });
  }

  private setToInit() {
    this.user = null;
    this.userRoles = [];
    this.isUserInfoFilled = false;
    this.isOnlyEIAMRoles = false;
  }

  private isUserRoleEmpty(): boolean {
    return this.userRoles == null || this.userRoles.length < 1;
  }

  private setActions(): void {
    this.isUserInfoFilled = !!this.user || !this.isUserRoleEmpty();
    this.isOnlyEIAMRoles = this.user == null && !this.isUserRoleEmpty() && this.userRoles.includes('ALLOW');
  }

  private determineRoleToBeRemoved(): string {
    if (this.isUserRoleEmpty()) {
      return NO_ROLE;
    }
    if (this.userRoles.includes(`${UserRole.ROLE_JOB_SEEKER}`)) {
      return 'JOB_SEEKER';
    } else if (this.userRoles.includes(`${UserRole.ROLE_COMPANY}`)) {
      return 'COMPANY';
    } else if (this.userRoles.includes(`${UserRole.ROLE_PAV}`)) {
      return 'PRIVATE_AGENT';
    }
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
      switchMap((userInfo: UserInfoDTO) => {
        this.user = userInfo;
        this.setActions();
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
      .subscribe((roles: string[]) => {
        this.userRoles = roles;
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
