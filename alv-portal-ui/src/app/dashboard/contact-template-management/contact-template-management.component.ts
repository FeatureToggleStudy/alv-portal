import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMAIL_REGEX, HOUSE_NUMBER_REGEX } from '../../shared/forms/regex-patterns';
import { takeUntil, tap } from 'rxjs/operators';
import { CompanyContactTemplateModel } from '../../core/auth/company-contact-template-model';
import { Observable, of } from 'rxjs';
import { SelectableOption } from '../../shared/forms/input/selectable-option.model';
import { Salutation } from '../../shared/backend-services/shared.types';
import { User } from '../../core/auth/user.model';
import { UserInfoRepository } from '../../shared/backend-services/user-info/user-info-repository';
import { CompanyContactTemplate } from '../../shared/backend-services/user-info/user-info.types';
import {
  Notification,
  NotificationType
} from '../../shared/layout/notifications/notification.model';
import { phoneInputValidator } from '../../shared/forms/input/input-field/phone-input.validator';


@Component({
  selector: 'alv-contact-template-management',
  templateUrl: './contact-template-management.component.html',
  styleUrls: ['./contact-template-management.component.scss']
})
export class ContactTemplateManagementComponent extends AbstractSubscriber implements OnInit {

  alerts: Notification[] = [];

  contactTemplateForm: FormGroup;

  salutationOptions$: Observable<SelectableOption[]> = of([
    {
      value: null,
      label: 'candidate-search.no-selection'
    }
  ].concat(
    Object.keys(Salutation).map(i => {
      return {
        value: i,
        label: 'global.contactPerson.salutation.' + i
      };
    })
  ));

  currentCompany: CompanyContactTemplateModel;

  private user: User;

  constructor(private fb: FormBuilder,
              private userInfoRepository: UserInfoRepository,
              private authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit() {
    this.contactTemplateForm = this.prepareForm();

    this.authenticationService.getCurrentUser().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(user => this.user = user);

    this.authenticationService.getCurrentCompany().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(currentCompany => {
      this.currentCompany = currentCompany;
      this.patchFormValues(currentCompany);
    });
  }

  onSubmit() {
    this.alerts = [];
    const companyContactTemplate = this.preparePayload();
    this.userInfoRepository.createCompanyContactTemplate(this.user.id, companyContactTemplate).pipe(
      tap(() => this.authenticationService.updateCompanyContactTemplate(companyContactTemplate))
    ).subscribe(() => {
      this.alerts.push({
        type: NotificationType.SUCCESS,
        messageKey: 'contact-template-management.successSaveMessage',
        isSticky: true
      });
    }, () => {
      this.alerts.push({
        type: NotificationType.ERROR,
        messageKey: 'contact-template-management.failureSaveMessage',
        isSticky: true
      });
    });
  }

  onReset() {
    this.contactTemplateForm.reset();
    this.patchFormValues(this.currentCompany);
  }

  dismissAlert(alert: Notification, alerts: Notification[]) {
    alerts.splice(alerts.indexOf(alert), 1);
  }

  private prepareForm(): FormGroup {
    return this.fb.group({
      salutation: [null, Validators.required],
      firstName: [{ value: null, disabled: true }],
      lastName: [{ value: null, disabled: true }],
      phone: [null, [Validators.required, phoneInputValidator()]],
      email: [null, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      companyName: [null, Validators.required],
      companyStreet: [null, Validators.required],
      companyHouseNr: [null, Validators.pattern(HOUSE_NUMBER_REGEX)],
      companyZipCode: [null, Validators.required],
      companyCity: [null, Validators.required]
    });
  }

  private patchFormValues(selectedTemplate: CompanyContactTemplateModel): void {
    if (selectedTemplate == null) {
      return;
    }
    this.contactTemplateForm.patchValue({
      salutation: selectedTemplate.salutation,
      firstName: selectedTemplate.firstName,
      lastName: selectedTemplate.lastName,
      phone: selectedTemplate.phone,
      email: selectedTemplate.email,
      companyName: selectedTemplate.companyName,
      companyStreet: selectedTemplate.companyStreet,
      companyHouseNr: selectedTemplate.companyHouseNr,
      companyZipCode: selectedTemplate.companyZipCode,
      companyCity: selectedTemplate.companyCity,
    });
  }

  private preparePayload(): CompanyContactTemplate {
    return {
      salutation: this.contactTemplateForm.value.salutation,
      phone: this.contactTemplateForm.value.phone,
      email: this.contactTemplateForm.value.email,
      companyId: this.currentCompany.companyId,
      companyName: this.contactTemplateForm.value.companyName,
      companyStreet: this.contactTemplateForm.value.companyStreet,
      companyHouseNr: this.contactTemplateForm.value.companyHouseNr,
      companyZipCode: this.contactTemplateForm.value.companyZipCode,
      companyCity: this.contactTemplateForm.value.companyCity,
    };
  }
}
