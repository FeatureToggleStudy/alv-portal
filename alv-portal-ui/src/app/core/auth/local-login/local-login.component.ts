import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { catchError, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { Router } from '@angular/router';
import {
  Notification,
  NotificationType
} from '../../../shared/layout/notifications/notification.model';

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

  loginFn = this.login.bind(this);

  constructor(public activeModal: NgbActiveModal,
              private authenticationService: AuthenticationService,
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

  private login() {
    this.authenticationService.login({
      username: this.form.get('username').value,
      password: this.form.get('password').value,
      rememberMe: true
    }).pipe(
        catchError(err => {
          this.errorMessage = ERRORS.invalidUsernamePassword;
          return EMPTY;
        }),
        take(1)
    ).subscribe(user => {
      if (user) {
        this.activeModal.close(true);
        this.router.navigate(['/landing']);
      }
    });
  }


}
