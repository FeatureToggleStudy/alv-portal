import { Component, Input, OnInit } from '@angular/core';
import { ApiUser } from '../../../shared/backend-services/api-user-management/api-user-management.types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiUserManagementRepository } from '../../../shared/backend-services/api-user-management/api-user-management-repository';
import { patternInputValidator } from '../../../shared/forms/input/input-field/pattern-input.validator';
import { EMAIL_REGEX } from '../../../shared/forms/regex-patterns';

@Component({
  selector: 'alv-api-user-edit-modal',
  templateUrl: './api-user-edit-modal.component.html'
})
export class ApiUserEditModalComponent implements OnInit {

  @Input()
  apiUser: ApiUser;

  form: FormGroup;

  constructor(private fb: FormBuilder,
              public activeModal: NgbActiveModal,
              private apiUserManagementRepository: ApiUserManagementRepository) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, Validators.required],
      companyName: [null, Validators.required],
      companyEmail: [null, [Validators.required, patternInputValidator(EMAIL_REGEX)]],
      technicalContactName: [null, Validators.required],
      technicalContactEmail: [null, [Validators.required, patternInputValidator(EMAIL_REGEX)]]
    });

    this.patchFormValues();
  }

  onDismiss() {
    this.activeModal.close();
  }

  onSubmit() {
    const user = this.mapFormValuesToApiUser(this.form.value);
    if (this.apiUser) {
      this.apiUserManagementRepository.update(user)
        .subscribe((updatedUser) => this.activeModal.close(updatedUser));
    } else {
      this.apiUserManagementRepository.save(user)
        .subscribe((updatedUser) => this.activeModal.close(updatedUser));
    }
  }

  generatePassword(): void {
    this.form.get('password').setValue(
      this.apiUserManagementRepository.generatePassword());
  }

  private mapFormValuesToApiUser(formValue: any): ApiUser {
    return {
      id: this.apiUser ? this.apiUser.id : null,
      username: formValue.username,
      companyName: formValue.companyName,
      companyEmail: formValue.companyEmail,
      technicalContactName: formValue.technicalContactName,
      technicalContactEmail: formValue.technicalContactEmail,
      password: this.apiUser ? this.apiUser.password : formValue.password,
      active: this.apiUser ? this.apiUser.active : formValue.active
    };
  }

  private patchFormValues(): void {
    if (!this.apiUser) {
      this.form.addControl('password', this.fb.control(null, Validators.required));
      this.form.addControl('active', this.fb.control(true));
    } else {
      this.form.patchValue({
        username: this.apiUser.username,
        companyName: this.apiUser.companyName,
        companyEmail: this.apiUser.companyEmail,
        technicalContactName: this.apiUser.technicalContactName,
        technicalContactEmail: this.apiUser.technicalContactEmail
      });
    }
  }

}
