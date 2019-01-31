import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IsoCountryService } from '../iso-country.service';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { Observable } from 'rxjs/index';
import { filter, startWith } from 'rxjs/operators';
import { ValidationErrors } from '@angular/forms/src/directives/validators';
import { PostAddressFormValue } from './post-address-form-value.types';
import { patternInputValidator } from '../../../shared/forms/input/input-field/pattern-input.validator';
import { HOUSE_NUMBER_REGEX } from '../../../shared/forms/regex-patterns';


@Component({
  selector: 'alv-post-address-form',
  templateUrl: './post-address-form.component.html',
  styleUrls: ['./post-address-form.component.scss']
})
export class PostAddressFormComponent implements OnInit, OnDestroy {

  readonly PO_BOX_MAX_LENGTH = 9;
  readonly STREET_MAX_LENGTH = 60;
  readonly NAME_MAX_LENGTH = 255;

  @Input()
  legend: string;

  @Input()
  groupName: string;

  @Input()
  parentForm: FormGroup;

  @Input()
  postAddressFormValue: PostAddressFormValue;

  postAddress: FormGroup;

  countryOptions$: Observable<SelectableOption[]>;

  countryIsoCode$: Observable<String>;

  constructor(private fb: FormBuilder,
              private isoCountryService: IsoCountryService) {

    this.countryOptions$ = this.isoCountryService.countryOptions$;
  }

  ngOnInit(): void {
    const { name, houseNumber, countryIsoCode, postOfficeBoxNumberOrStreet } = this.postAddressFormValue;

    this.postAddress = this.fb.group({
      name: [name, [
        Validators.required,
        Validators.maxLength(this.NAME_MAX_LENGTH)
      ]],
      houseNumber: [houseNumber, [
        patternInputValidator(HOUSE_NUMBER_REGEX)
      ]],
      countryIsoCode: [countryIsoCode],
      postOfficeBoxNumberOrStreet: this.fb.group({
          street: [postOfficeBoxNumberOrStreet.street, [
            Validators.maxLength(this.STREET_MAX_LENGTH)
          ]],
          postOfficeBoxNumber: [postOfficeBoxNumberOrStreet.postOfficeBoxNumber, [
            Validators.maxLength(this.PO_BOX_MAX_LENGTH)
          ]],
        },
        { validator: postOfficeBoxNumberOrStreetRequiredValidator }
      )
    });

    this.parentForm.addControl(this.groupName, this.postAddress);

    this.countryIsoCode$ = this.postAddress.get('countryIsoCode').valueChanges
      .pipe(
        filter((value) => !!value),
        startWith(countryIsoCode),
      );
  }

  ngOnDestroy(): void {
    this.parentForm.removeControl(this.groupName);
  }
}

function postOfficeBoxNumberOrStreetRequiredValidator(postOfficeBoxNumberOrStreet: FormGroup): ValidationErrors | null {
  const streetValue = postOfficeBoxNumberOrStreet.get('street').value;
  const postOfficeBoxNumberValue = postOfficeBoxNumberOrStreet.get('postOfficeBoxNumber').value;

  if (!!streetValue || !!postOfficeBoxNumberValue) {
    return null;
  }

  return {
    postOfficeBoxNumberOrStreetRequired: true
  };
}
