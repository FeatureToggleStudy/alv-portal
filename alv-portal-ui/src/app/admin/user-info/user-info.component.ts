import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  UserInfoRepository,
  UserSearchParameterTypes
} from '../../shared/backend-services/user-info/user-info-repository';
import { patternInputValidator } from '../../shared/forms/input/input-field/pattern-input.validator';
import { EMAIL_REGEX, PERSON_NUMBER_REGEX } from '../../shared/forms/regex-patterns';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { UserInfoDTO } from '../../shared/backend-services/user-info/user-info.types';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY, of } from 'rxjs';
import { catchError, distinctUntilChanged, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { UserRole } from '../../core/auth/user.model';
import { Notification, NotificationType } from '../../shared/layout/notifications/notification.model';
import { UserInfoBadge, UserInfoBadgesMapperService } from './user-info-badges-mapper.service';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { ConfirmModalConfig } from '../../shared/layout/modal/confirm-modal/confirm-modal-config.model';
import { emailInputValidator } from '../../shared/forms/input/input-field/email-input.validator';

const ALERTS = {
  userNotFoundByEmail: {
    type: NotificationType.ERROR,
    messageKey: 'portal.admin.user-info.alert.user-info-not-found-by-email',
    isSticky: true
  } as Notification,
  userNotFoundByPersonNr: {
    type: NotificationType.ERROR,
    messageKey: 'portal.admin.user-info.alert.user-info-not-found-by-person-nr',
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

const NO_ROLE = 'NO_ROLE';

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

  formPlaceholder: string;

  formLabel: string;

  constructor(private fb: FormBuilder,
              private userInfoRepository: UserInfoRepository,
              private modalService: ModalService,
              private userInfoBadgesMapperService: UserInfoBadgesMapperService) {
    super();
  }

  searchParameterTypeOptions = of([
    {
      label: 'portal.admin.user-info.use.search.parameter.option.email',
      value: UserSearchParameterTypes.EMAIL
    },
    {
      label: 'portal.admin.user-info.use.search.parameter.option.person-nr',
      value: UserSearchParameterTypes.PERSON_NR
    }
  ]);

  ngOnInit() {
    this.form = this.fb.group({
      searchParam: [null],
      searchParameterType: [UserSearchParameterTypes.EMAIL]
    });

    this.form.get('searchParameterType').valueChanges.pipe(
      startWith(this.form.get('searchParameterType').value),
      distinctUntilChanged(),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(searchParameterType => {
      this.searchParamValidator(searchParameterType);
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
    return NO_ROLE;
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
      contentParams: { searchParam: this.form.get('searchParam').value },
      confirmLabel: 'portal.admin.user-info.confirm-dialog.yes',
      cancelLabel: 'portal.admin.user-info.confirm-dialog.no'
    } as ConfirmModalConfig).result
      .then(
        () => this.userInfoRepository.unregisterUser(this.form.value.searchParameterType, this.form.get('searchParam').value, this.determineRoleToBeRemoved())
          .subscribe(() => {
            this.alert = ALERTS.unregisterSuccess;
            this.onSubmit();
          }, () => {
            this.alert = ALERTS.unregisterTechError;
          }),
        () => {
        });
  }

  onSubmit() {
    this.dismissAlert();
    this.determineUserInfoObservable().pipe(
      switchMap((userInfo: UserInfoDTO) => {
        this.user = userInfo;
        this.setActions();
        this.badges = this.userInfoBadgesMapperService.map(this.user);
        return this.userInfoRepository.loadUserRoles(this.user.id);
      }),
      catchError((err: HttpErrorResponse) => {
        this.setToInit();
        if (err.status === 404) {
          if (this.form.value.searchParameterType === UserSearchParameterTypes.EMAIL) {
            this.alert = ALERTS.userNotFoundByEmail;
          } else {
            this.alert = ALERTS.userNotFoundByPersonNr;
          }
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

  private searchParamValidator(newValue: UserSearchParameterTypes) {
    let validator = null;
    if (newValue === UserSearchParameterTypes.EMAIL) {
      this.formPlaceholder = 'portal.admin.user-info.use.search.placeholders.email';
      this.formLabel = 'portal.admin.user-info.user-info.email';
      validator = emailInputValidator();
    } else {
      this.formPlaceholder = 'portal.admin.user-info.use.search.placeholders.person-nr';
      this.formLabel = 'portal.admin.user-info.stes-info.pn';
      validator = patternInputValidator(PERSON_NUMBER_REGEX);
    }

    this.form.get('searchParam').setValidators([Validators.required, validator]);
  }

  private determineUserInfoObservable() {
    if (this.form.value.searchParameterType === UserSearchParameterTypes.EMAIL) {
      return this.userInfoRepository.loadUserByEmail(this.form.get('searchParam').value);
    } else {
      return this.userInfoRepository.loadUserByPersonNr(this.form.get('searchParam').value);
    }
  }

}
