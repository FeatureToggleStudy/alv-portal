import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/index';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { IsoCountryService } from '../iso-country.service';
import { filter, startWith } from 'rxjs/internal/operators';
import { LocationFormValue } from './location-form-value.types';

@Component({
  selector: 'alv-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent extends AbstractSubscriber implements OnInit {

  readonly REMARK_MAX_LENGTH = 50;

  @Input()
  parentForm: FormGroup;

  @Input()
  locationFormValue: LocationFormValue;

  countryOptions$: Observable<SelectableOption[]>;

  countryIsoCode$: Observable<String>;

  constructor(private fb: FormBuilder,
              private isoCountryService: IsoCountryService) {
    super();
    this.countryOptions$ = this.isoCountryService.countryOptions$;
  }

  ngOnInit(): void {
    this.parentForm.addControl('location', this.buildLocationGroup(this.locationFormValue));


    this.countryIsoCode$ = this.countryIsoCode.valueChanges
      .pipe(
        filter((value) => !!value),
        startWith(this.countryIsoCode.value),
      );
  }

  private buildLocationGroup(value: LocationFormValue): FormGroup {
    const { countryIsoCode, remarks } = value;

    return this.fb.group({
      countryIsoCode: [countryIsoCode],
      remarks: [remarks, [
        Validators.maxLength(this.REMARK_MAX_LENGTH)
      ]]
    });
  }

  get locationGroup(): FormGroup {
    return <FormGroup>this.parentForm.get('location');
  }

  get countryIsoCode(): FormControl {
    return <FormControl>this.locationGroup.get('countryIsoCode');
  }
}
