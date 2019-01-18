import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { UserInfoRepository } from '../../shared/backend-services/user-info/user-info-repository';
import { patternInputValidator } from '../../shared/forms/input/input-field/pattern-input.validator';
import { EMAIL_REGEX } from '../../shared/forms/regex-patterns';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { UserInfoDTO } from '../../shared/backend-services/user-info/user-info.types';
import { HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { I18nService } from '../../core/i18n.service';
import { UserRole } from '../../core/auth/user.model';
import { Notification, NotificationType } from "../../shared/layout/notifications/notification.model";

@Component({
  selector: 'alv-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent extends AbstractSubscriber  implements OnInit {

  form: FormGroup;

  user: UserInfoDTO = null;

  userRoles: string[] = [];

  error: number = null;

  badges$: Observable<any>;

  alerts: Notification[] = []; // TODO implement ->

  confirmMessage: string;

  constructor(private fb: FormBuilder,
              private userInfoRepository: UserInfoRepository,
              private i18nService: I18nService,
              private authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit() {
    this.form = this.prepareForm();

    this.i18nService.stream('portal.admin.user-info.confirmMessage', {email: `${this.form.get('emailAddress').value}`}).pipe(
        takeUntil(this.ngUnsubscribe))
        .subscribe((translate) => {
          this.confirmMessage = translate;
        });
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
    return window.confirm(`Are you sure you want to unregister ${this.form.get('emailAddress').value} ?`);
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
        .subscribe( (res: HttpResponse<any>) => {
          this.onSubmit();
        }, (error: HttpErrorResponse) => {
          this.error = error.status;
        });
  }

  // TODO format and implement checks for alerts
  onSubmit() {
    this.alerts = [];
    this.userInfoRepository.loadUserByEmail(this.form.get('emailAddress').value).pipe(
        switchMap( (res: HttpResponse<any>) => {
          this.user = res.body;
          return this.userInfoRepository.loadUserRoles(this.user.id);
        }),
        catchError((err: HttpErrorResponse) => {
          this.error = err.status;
          this.setToInit();
          if (err.status === 404) {
            this.alerts.push({
                type: NotificationType.ERROR,
                messageKey: 'portal.admin.user-info.error.user-info-not-found',
                isSticky: true
            });
          } else {
            this.alerts.push({
                type: NotificationType.ERROR,
                messageKey: 'portal.admin.user-info.error.user-info-technical',
                isSticky: true
            });
          }
          return EMPTY;
        }),
        takeUntil(this.ngUnsubscribe))
        .subscribe( (roles) => {
          this.error = null;
          this.userRoles = roles.body;
        }, (err: HttpErrorResponse) => {
          this.setToInit();
          if (err.status === 404) {
              this.alerts.push({
                  type: NotificationType.ERROR,
                  messageKey: 'portal.admin.user-info.error.eIAM-role-not-found',
                  isSticky: true
              });
          } else {
              this.alerts.push({
                  type: NotificationType.ERROR,
                  messageKey: 'portal.admin.user-info.error.eIAM-role-technical',
                  isSticky: true
              });
          }
          return EMPTY;
        });
  }

}
