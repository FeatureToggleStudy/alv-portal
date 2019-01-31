import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiUserManagementRepository } from '../../../shared/backend-services/api-user-management/api-user-management-repository';
import { ApiUserManagementRequestMapper } from '../api-user-management-request.mapper';
import { takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';

@Component({
  selector: 'alv-api-user-password-modal',
  templateUrl: './api-user-password-modal.component.html'
})
export class ApiUserPasswordModalComponent extends AbstractSubscriber implements OnInit {

  @Input()
  apiUserId: string;

  form: FormGroup;

  constructor(private fb: FormBuilder,
              public activeModal: NgbActiveModal,
              private apiUserManagementRepository: ApiUserManagementRepository) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      password: [null, Validators.required]
    });
  }

  generatePassword(): void {
    this.form.get('password').setValue(
      this.apiUserManagementRepository.generatePassword()
    );
  }

  onDismiss() {
    this.activeModal.close(null);
  }

  onSubmit() {
    this.apiUserManagementRepository.updatePassword(
      ApiUserManagementRequestMapper.mapPasswordToRequest(this.apiUserId, this.form.get('password').value))
      .pipe(
        takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.activeModal.close(this.apiUserId), () => {});
  }

}
