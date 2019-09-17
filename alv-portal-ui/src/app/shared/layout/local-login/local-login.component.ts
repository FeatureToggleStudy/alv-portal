import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { catchError, withLatestFrom } from 'rxjs/operators';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { Router } from '@angular/router';
import { Notification, NotificationType } from '../notifications/notification.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppContextService } from '../../../core/app-context/app-context.service';
import { homeUrlMap } from '../../../core/app-context/app-context.types';

const ERRORS = {
  invalidUsernamePassword: {
    type: NotificationType.WARNING,
    messageKey: 'Invalid username or password',
    isSticky: true
  } as Notification
};

@Component({
  selector: 'alv-local-login',
  templateUrl: './local-login.component.html',
  styleUrls: ['./local-login.component.scss']
})
export class LocalLoginComponent implements OnInit {

  form: FormGroup;

  errorMessage: Notification;

  constructor(public modal: NgbActiveModal,
              private authenticationService: AuthenticationService,
              private appContextService: AppContextService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.form = this.fb.group({
        username: this.fb.control('', Validators.required),
        password: this.fb.control('', Validators.required)
      }
    );
  }

  login() {
    this.authenticationService.localLogin({
      username: this.form.get('username').value,
      password: this.form.get('password').value,
      rememberMe: false
    }).pipe(
      catchError(err => {
        this.errorMessage = ERRORS.invalidUsernamePassword;
        return EMPTY;
      }),
      withLatestFrom(this.appContextService.getAppContext())
    ).subscribe(([user, appContext]) => {
      if (user) {
        this.modal.close();
        this.router.navigate(homeUrlMap[appContext]);
      }
    });
  }

}
