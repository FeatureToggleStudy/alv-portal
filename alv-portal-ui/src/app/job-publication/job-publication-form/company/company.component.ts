import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IsoCountryService } from '../iso-country.service';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { Observable } from 'rxjs/index';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { filter, startWith } from 'rxjs/internal/operators';
import { ValidationErrors } from '@angular/forms/src/directives/validators';
import { CompanyGroup } from './company-group.types';


@Component({
  selector: 'alv-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent extends AbstractSubscriber implements OnInit {

  @Input()
  parentForm: FormGroup;

  @Input()
  groupValue: CompanyGroup;

  countryOptions$: Observable<SelectableOption[]>;

  countryIsoCode$: Observable<String>;


  constructor(private fb: FormBuilder,
              private isoCountryService: IsoCountryService) {
    super();
    this.countryOptions$ = this.isoCountryService.countryOptions$;
  }

  ngOnInit(): void {
    this.parentForm.addControl('company', this.buildCompanyGroup(this.groupValue));

    this.countryIsoCode$ = this.countryIsoCode.valueChanges
      .pipe(
        filter((value) => !!value),
        startWith(this.countryIsoCode.value),
      );
  }

  private buildCompanyGroup(value: CompanyGroup): FormGroup {
    const { name, houseNumber, countryIsoCode, postOfficeBoxNumberOrStreet } = value;

    return this.fb.group({
      name: [name, [
        Validators.required
      ]],
      houseNumber: [houseNumber, []],
      countryIsoCode: [countryIsoCode, []],
      postOfficeBoxNumberOrStreet: this.fb.group({
          street: [postOfficeBoxNumberOrStreet.street, []],
          postOfficeBoxNumber: [postOfficeBoxNumberOrStreet.postOfficeBoxNumber, [
            Validators.maxLength(6)
          ]],
        },
        { validator: companyGroupValidator }
      )
    });
  }

  get companyGroup(): FormGroup {
    return <FormGroup>this.parentForm.get('company');
  }

  get countryIsoCode(): FormControl {
    return <FormControl>this.companyGroup.get('countryIsoCode');
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
