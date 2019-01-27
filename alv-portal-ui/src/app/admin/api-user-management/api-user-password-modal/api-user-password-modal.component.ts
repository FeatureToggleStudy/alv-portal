import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiUserManagementRepository } from '../../../shared/backend-services/api-user-management/api-user-management-repository';
import { ApiUserManagementRequestMapper } from '../api-user-management-request.mapper';

@Component({
  selector: 'alv-api-user-password-modal',
  templateUrl: './api-user-password-modal.component.html'
})
export class ApiUserPasswordModalComponent implements OnInit {

  @Input()
  apiUserId: string;

  form: FormGroup;

  constructor(private fb: FormBuilder,
              public activeModal: NgbActiveModal,
              private apiUserManagementRepository: ApiUserManagementRepository) { }

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
    this.activeModal.close();
  }

  onSubmit() {
    this.apiUserManagementRepository.updatePassword(
      ApiUserManagementRequestMapper.mapPasswordToRequest(this.apiUserId, this.form.get('password').value)
    ).subscribe(() => this.activeModal.close());
  }

}
