import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Subscription } from 'rxjs';
import { FeatureCodeListRepository } from '../../../shared/backend-services/feature-code-list/feature-code-list.repository';
import { Router } from '@angular/router';
import { catchError, flatMap } from 'rxjs/operators';
import { FeatureCodeListErrors } from '../../../shared/backend-services/feature-code-list/feature-code-list.types';
import { NotificationsService } from '../../../core/notifications.service';
import { AuthenticationService } from '../../../core/auth/authentication.service';

@Component({
  selector: 'alv-pilot-activation',
  templateUrl: './pilot-activation.component.html',
  styleUrls: ['./pilot-activation.component.scss']
})
export class PilotActivationComponent implements OnInit {

  form: FormGroup;

  loadingSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private router: Router,
              private notificationsService: NotificationsService,
              private authenticationService: AuthenticationService,
              private featureCodeListRepository: FeatureCodeListRepository) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      activationCode: ['', [Validators.required]] // TODO: validation? max length? min length?
    });
  }

  onSubmit() {
    this.loadingSubscription = this.featureCodeListRepository.activateFeature(this.form.value.activationCode).pipe(
      catchError(err => {
        if (err.status === 412 && err.error.type === FeatureCodeListErrors.NOT_FOUND_OR_ALREADY_TAKEN) {
          this.notificationsService.error('portal.online-forms.pilot-activation.notification.code-invalid');
          return EMPTY;
        }
        throw err;
      }),
      flatMap(() => this.authenticationService.reloadCurrentUser())
    )
      .subscribe(() => {
        this.router.navigate(['home']);
      });
  }

  onCancel() {
    this.router.navigate(['home']);
  }

  isLoading(): boolean {
    return this.loadingSubscription && !this.loadingSubscription.closed;
  }

  toUppercase() {
    this.form.get('activationCode').setValue(this.form.value.activationCode.toUpperCase(), {emitEvent: false});
  }
}
