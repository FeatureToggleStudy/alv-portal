import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IsoCountryService } from '../../../../shared/localities/iso-country.service';
import { SelectableOption } from '../../../../shared/forms/input/selectable-option.model';
import { Observable } from 'rxjs';
import { filter, startWith } from 'rxjs/operators';
import { PostAddressFormValue } from './post-address-form-value.types';
import { patternInputValidator } from '../../../../shared/forms/input/input-field/pattern-input.validator';
import { HOUSE_NUMBER_REGEX, POSITIVE_INTEGER_REGEX } from '../../../../shared/forms/regex-patterns';
import { atLeastOneRequiredValidator } from '../../../../shared/forms/input/validators/at-least-one-required.validator';


@Component({
  selector: 'alv-post-address-form',
  templateUrl: './post-address-form.component.html',
  styleUrls: ['./post-address-form.component.scss']
})
export class PostAddressFormComponent implements OnInit, OnDestroy {

  readonly PO_BOX_MAX_LENGTH = 9;
  readonly HOUSE_NUMBER_MAX_LENGTH = 10;
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
        Validators.maxLength(this.HOUSE_NUMBER_MAX_LENGTH),
        patternInputValidator(HOUSE_NUMBER_REGEX)
      ]],
      countryIsoCode: [countryIsoCode],
      postOfficeBoxNumberOrStreet: this.fb.group({
          street: [postOfficeBoxNumberOrStreet.street, [
            Validators.maxLength(this.STREET_MAX_LENGTH)
          ]],
          postOfficeBoxNumber: [postOfficeBoxNumberOrStreet.postOfficeBoxNumber, [
            Validators.maxLength(this.PO_BOX_MAX_LENGTH),
            Validators.min(0),
            Validators.pattern(POSITIVE_INTEGER_REGEX)
          ]],
        },
        {
          validator: [atLeastOneRequiredValidator(['street', 'postOfficeBoxNumber'])]
        }
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
