import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { UserInfoRepository } from '../../shared/backend-services/user-info/user-info-repository';
import { patternInputValidator } from '../../shared/forms/input/input-field/pattern-input.validator';
import { EMAIL_REGEX } from '../../shared/forms/regex-patterns';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { UserInfo } from '../../shared/backend-services/user-info/user-info.types';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'alv-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent extends AbstractSubscriber  implements OnInit {

  form: FormGroup;

  user: UserInfo;

  userRoles: string[];

  error: number;

  alert: Notification[]; // TODO implement ->

  constructor(private fb: FormBuilder,
              private userInfoRepository: UserInfoRepository,
              private authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit() {
    this.setToInit();
    this.error = null;
    this.form = this.prepareForm();
  }

  private setToInit() {
    this.user = null;
    this.userRoles = [];
  }

  private prepareForm(): FormGroup {
    return this.fb.group({
      emailAddress: [null, [Validators.required, patternInputValidator(EMAIL_REGEX)]]
    });
  }

  private isUserRoleEmpty(): boolean {
    return this.userRoles == null || this.userRoles.length == 0;
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

  unregister(): void {
    console.log('unregister');
  }

  // TODO format and implement checks for alerts
  onSubmit() {
    console.log(this.form.value);
    this.userInfoRepository.loadUserByEmail(this.form.get('emailAddress').value).pipe(
        switchMap( (res: HttpResponse<any>) => {
          this.user = res.body;
          console.log('user: ', this.user);
          return this.userInfoRepository.loadUserRoles(this.user.id);
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.error = err.status;
            this.setToInit();
            console.log('errorMessage :', this.error);
          }
          return EMPTY;
        }),
        takeUntil(this.ngUnsubscribe))
        .subscribe( (roles) => {
          this.error = null;
          this.userRoles = roles.body;
          console.log('userRoles', this.userRoles);
        }, () => {
          this.error = 404;
          this.setToInit();
          console.log('error from rules');
          return EMPTY;
        });
  }

}
