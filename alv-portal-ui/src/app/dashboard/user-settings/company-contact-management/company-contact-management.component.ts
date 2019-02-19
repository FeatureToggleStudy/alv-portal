import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { Salutation } from '../../../shared/backend-services/shared.types';
import { phoneInputValidator } from '../../../shared/forms/input/input-field/phone-input.validator';
import { patternInputValidator } from '../../../shared/forms/input/input-field/pattern-input.validator';
import { EMAIL_REGEX, HOUSE_NUMBER_REGEX } from '../../../shared/forms/regex-patterns';

import { UserInfoRepository } from '../../../shared/backend-services/user-info/user-info-repository';
import { NotificationsService } from '../../../core/notifications.service';
import { takeUntil, tap } from 'rxjs/operators';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { CompanyContactTemplateModel } from '../../../core/auth/company-contact-template-model';
import { CompanyContactTemplate } from '../../../shared/backend-services/user-info/user-info.types';

interface CompanyContactFormValue {
  salutation: Salutation;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  companyName: string;
  companyStreet: string;
  companyHouseNr: string;
  companyZipCode: string;
  companyCity: string;
}

@Component({
  selector: 'alv-company-contact-management',
  templateUrl: './company-contact-management.component.html',
  styleUrls: ['./company-contact-management.component.scss']
})
export class CompanyContactManagementComponent extends AbstractSubscriber implements OnInit {

  form: FormGroup;

  currentCompany: CompanyContactTemplateModel;

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

  private userId: string;

  constructor(private fb: FormBuilder,
              private userInfoRepository: UserInfoRepository,
              private authenticationService: AuthenticationService,
              private notificationsService: NotificationsService) {
    super();
  }

  ngOnInit() {
    combineLatest(this.authenticationService.getCurrentUser(), this.authenticationService.getCurrentCompany()).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(([user, company]) => {
      this.userId = user.id;
      this.currentCompany = company;
      this.prepareForm(company);
    });
  }

  onSubmit() {
    const formValue = <CompanyContactFormValue>(this.form.value);
    const companyContactTemplate = this.mapToCompanyContactTemplate(this.currentCompany.companyId, formValue);
    this.userInfoRepository.createCompanyContactTemplate(this.userId, companyContactTemplate).pipe(
      tap(() => this.authenticationService.updateCompanyContactTemplate(companyContactTemplate))
    ).subscribe(() => {
      this.notificationsService.success('portal.dashboard.user-settings.message.success', false);
    }, () => {
      this.notificationsService.error('portal.dashboard.user-settings.message.failure', false);
    });
  }

  onReset() {
    this.form.reset(this.currentCompany);
  }

  private prepareForm(company: CompanyContactTemplateModel) {
    this.form = this.fb.group({
      salutation: [<Salutation>company.salutation, [Validators.required]],
      firstName: [{value: company.firstName, disabled: true}, [Validators.required]],
      lastName: [{value: company.lastName, disabled: true}, [Validators.required]],
      phone: [company.phone, [Validators.required, phoneInputValidator()]],
      email: [company.email, [Validators.required, patternInputValidator(EMAIL_REGEX)]],
      companyName: [company.companyName, [Validators.required]],
      companyStreet: [company.companyStreet, [Validators.required]],
      companyHouseNr: [company.companyHouseNr, [Validators.required, patternInputValidator(HOUSE_NUMBER_REGEX)]],
      companyZipCode: [company.companyZipCode, [Validators.required]],
      companyCity: [company.companyCity, [Validators.required]]
    });
  }

  private mapToCompanyContactTemplate(companyId: string, companyContactFormValue: CompanyContactFormValue): CompanyContactTemplate {
    return {
      companyId: companyId,
      companyName: companyContactFormValue.companyName,
      companyStreet: companyContactFormValue.companyStreet,
      companyHouseNr: companyContactFormValue.companyHouseNr,
      companyZipCode: companyContactFormValue.companyZipCode,
      companyCity: companyContactFormValue.companyCity,
      phone: companyContactFormValue.phone,
      email: companyContactFormValue.email,
      salutation: <Salutation>companyContactFormValue.salutation
    };
  }

}
