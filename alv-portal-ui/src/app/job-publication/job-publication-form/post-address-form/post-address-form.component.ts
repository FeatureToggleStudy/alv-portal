import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IsoCountryService } from '../iso-country.service';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { Observable } from 'rxjs/index';
import { filter, startWith } from 'rxjs/internal/operators';
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
  set postAddressFormValue(value: PostAddressFormValue) {
    this._postAddressFormValue = value;
    if (value) {
      this.setFormValue(value);
    }
  }

  get postAddressFormValue() {
    return this._postAddressFormValue;
  }

  postAddress: FormGroup;

  countryOptions$: Observable<SelectableOption[]>;

  countryIsoCode$: Observable<String>;

  private _postAddressFormValue: PostAddressFormValue;

  constructor(private fb: FormBuilder,
              private isoCountryService: IsoCountryService) {

    this.countryOptions$ = this.isoCountryService.countryOptions$;

    this.postAddress = this.fb.group({
      name: [null, [
        Validators.required,
        Validators.maxLength(this.NAME_MAX_LENGTH)
      ]],
      houseNumber: [null, [
        patternInputValidator(HOUSE_NUMBER_REGEX)
      ]],
      countryIsoCode: [null, []],
      postOfficeBoxNumberOrStreet: this.fb.group({
          street: [null, [
            Validators.maxLength(this.STREET_MAX_LENGTH)
          ]],
          postOfficeBoxNumber: [null, [
            Validators.maxLength(this.PO_BOX_MAX_LENGTH)
          ]],
        },
        { validator: postOfficeBoxNumberOrStreetRequiredValidator }
      )
    });
  }

  ngOnInit(): void {
    this.parentForm.addControl(this.groupName, this.postAddress);

    const countryIsoCode = this.postAddress.get('countryIsoCode');
    this.countryIsoCode$ = countryIsoCode.valueChanges
      .pipe(
        filter((value) => !!value),
        startWith(countryIsoCode.value),
      );
  }

  ngOnDestroy(): void {
    this.parentForm.removeControl(this.groupName);
  }

  private setFormValue(value: PostAddressFormValue) {
    const { name, houseNumber, countryIsoCode, postOfficeBoxNumberOrStreet } = value;
    this.postAddress.patchValue({
      name,
      houseNumber,
      countryIsoCode,
      postOfficeBoxNumberOrStreet
    }, { emitEvent: false });
  }
}

function postOfficeBoxNumberOrStreetRequiredValidator(postOfficeBoxNumberOrStreet: FormGroup): ValidationErrors | null {
  const streetValue = postOfficeBoxNumberOrStreet.get('street').value;
  const postOfficeBoxNumberValue = postOfficeBoxNumberOrStreet.get('postOfficeBoxNumber').value;

  if (!!streetValue || !!postOfficeBoxNumberValue) {
    return null;
  }

  return {
    'postOfficeBoxNumberOrStreetRequired': true
  };
}
