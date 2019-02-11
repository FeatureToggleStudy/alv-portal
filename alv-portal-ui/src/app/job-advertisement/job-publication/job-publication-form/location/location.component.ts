import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectableOption } from '../../../../shared/forms/input/selectable-option.model';
import { AbstractSubscriber } from '../../../../core/abstract-subscriber';
import { IsoCountryService } from '../../../../shared/localities/iso-country.service';
import { filter, startWith } from 'rxjs/operators';
import { LocationFormValue } from './location-form-value.types';
import { JobPublicationFormValueKeys } from '../job-publication-form-value.types';

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

  location: FormGroup;

  countryOptions$: Observable<SelectableOption[]>;

  countryIsoCode$: Observable<String>;

  constructor(private fb: FormBuilder,
              private isoCountryService: IsoCountryService) {
    super();

    this.countryOptions$ = this.isoCountryService.countryOptions$;
  }

  ngOnInit(): void {
    const { countryIsoCode, remarks } = this.locationFormValue;

    this.location = this.fb.group({
      countryIsoCode: [countryIsoCode],
      remarks: [remarks, [
        Validators.maxLength(this.REMARK_MAX_LENGTH)
      ]]
    });

    this.parentForm.addControl(JobPublicationFormValueKeys.location, this.location);

    this.countryIsoCode$ = this.location.get('countryIsoCode').valueChanges
      .pipe(
        filter((value) => !!value),
        startWith(countryIsoCode),
      );
  }
}
