import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IsoCountryService } from '../iso-country.service';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { Observable } from 'rxjs/index';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { filter, startWith } from 'rxjs/internal/operators';
import { ValidationErrors } from '@angular/forms/src/directives/validators';
import { CompanyFormValue } from './company-form-value.types';


@Component({
  selector: 'alv-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent extends AbstractSubscriber implements OnInit {
  readonly PO_BOX_MAX_LENGTH = 9;

  @Input()
  parentForm: FormGroup;

  @Input()
  set companyFormValue(value: CompanyFormValue) {
    this._companyFormValue = value;
    this.setFormValue(value);
  }

  get companyFormValue() {
    return this._companyFormValue;
  }

  company: FormGroup;

  countryOptions$: Observable<SelectableOption[]>;

  countryIsoCode$: Observable<String>;

  private _companyFormValue: CompanyFormValue;

  constructor(private fb: FormBuilder,
              private isoCountryService: IsoCountryService) {
    super();

    this.countryOptions$ = this.isoCountryService.countryOptions$;

    this.company = this.fb.group({
      //todo (birom): review validators
      name: [, [
        Validators.required
      ]],
      houseNumber: [, []],
      countryIsoCode: [, []],
      postOfficeBoxNumberOrStreet: this.fb.group({
          street: [, []],
          postOfficeBoxNumber: [, [
            Validators.maxLength(this.PO_BOX_MAX_LENGTH)
          ]],
        },
        { validator: companyGroupValidator }
      )
    });
  }

  ngOnInit(): void {
    this.parentForm.addControl('company', this.company);

    const countryIsoCode = this.company.get('countryIsoCode');
    this.countryIsoCode$ = countryIsoCode.valueChanges
      .pipe(
        filter((value) => !!value),
        startWith(countryIsoCode.value),
      );
  }

  private setFormValue(value: CompanyFormValue) {
    const { name, houseNumber, countryIsoCode, postOfficeBoxNumberOrStreet } = value;
    this.company.patchValue({
      name,
      houseNumber,
      countryIsoCode,
      postOfficeBoxNumberOrStreet
    }, { emitEvent: false });
  }
}

function companyGroupValidator(companyGroup: FormGroup): ValidationErrors | null {
  const streetValue = companyGroup.get('street').value;
  const postOfficeBoxNumberValue = companyGroup.get('postOfficeBoxNumber').value;

  if (!!streetValue || !!postOfficeBoxNumberValue) {
    return null;
  }

  return {
    'postOfficeBoxNumberOrStreetRequired': true
  };
}
