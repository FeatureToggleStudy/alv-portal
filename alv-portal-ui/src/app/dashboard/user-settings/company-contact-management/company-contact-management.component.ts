import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { Salutation } from '../../../shared/backend-services/shared.types';
import { phoneInputValidator } from '../../../shared/forms/input/input-field/phone-input.validator';
import { patternInputValidator } from '../../../shared/forms/input/input-field/pattern-input.validator';
import { EMAIL_REGEX, HOUSE_NUMBER_REGEX } from '../../../shared/forms/regex-patterns';
import { CompanyContactFormValue } from '../user-settings-mapper';

@Component({
  selector: 'alv-company-contact-management',
  templateUrl: './company-contact-management.component.html',
  styleUrls: ['./company-contact-management.component.scss']
})
export class CompanyContactManagementComponent implements OnInit {

  @Input()
  parentForm: FormGroup;

  @Input()
  companyContactFormValue: CompanyContactFormValue;

  userForm: FormGroup;

  companyForm: FormGroup;

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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const { salutation, firstName, lastName, email, phone,
      companyName, companyStreet, companyHouseNr, companyZipCode, companyCity } = this.companyContactFormValue;

    this.userForm = this.fb.group({
      salutation: [salutation, [Validators.required]],
      firstName: [{value: firstName, disabled: true}, [Validators.required]],
      lastName: [{value: lastName, disabled: true}, [Validators.required]],
      phone: [phone, [Validators.required, phoneInputValidator()]],
      email: [email, [Validators.required, patternInputValidator(EMAIL_REGEX)]]
    });

    this.companyForm = this.fb.group({
      companyName: [companyName, [Validators.required]],
      companyStreet: [companyStreet, [Validators.required]],
      companyHouseNr: [companyHouseNr, [Validators.required, patternInputValidator(HOUSE_NUMBER_REGEX)]],
      companyZipCode: [companyZipCode, [Validators.required]],
      companyCity: [companyCity, [Validators.required]]
    });

    this.parentForm.addControl('userForm', this.userForm);

    this.parentForm.addControl('companyForm', this.companyForm);
  }

}
