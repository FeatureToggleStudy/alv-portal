import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { patternInputValidator } from '../../../shared/forms/input/input-field/pattern-input.validator';
import { HOUSE_NUMBER_REGEX } from '../../../shared/forms/regex-patterns';
import { CompanyFormValue } from '../user-settings-mapper';

@Component({
  selector: 'alv-company-information',
  templateUrl: './company-information.component.html'
})
export class CompanyInformationComponent implements OnInit {

  @Input()
  parentForm: FormGroup;

  @Input()
  companyFormValue: CompanyFormValue;

  companyForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const { companyName, companyStreet, companyHouseNr, companyZipCode, companyCity } = this.companyFormValue;

    this.companyForm = this.fb.group({
      companyName: [companyName, [Validators.required]],
      companyStreet: [companyStreet, [Validators.required]],
      companyHouseNr: [companyHouseNr, [Validators.required, patternInputValidator(HOUSE_NUMBER_REGEX)]],
      companyZipCode: [companyZipCode, [Validators.required]],
      companyCity: [companyCity, [Validators.required]]
    });

    this.parentForm.addControl('companyForm', this.companyForm);

  }

}
