import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IsoCountryService } from '../iso-country.service';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { Observable } from 'rxjs/index';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { filter, startWith } from 'rxjs/internal/operators';


@Component({
  selector: 'alv-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent extends AbstractSubscriber implements OnInit {

  @Input()
  parentForm: FormGroup;

  countryOptions$: Observable<SelectableOption[]>;

  countryIsoCode$: Observable<String>;

  constructor(private fb: FormBuilder,
              private isoCountryService: IsoCountryService) {
    super();
    this.countryOptions$ = this.isoCountryService.countryOptions$;
  }

  ngOnInit(): void {
    this.parentForm.addControl('company', this.buildCompanyGroup());

    this.countryIsoCode$ = this.countryIsoCode.valueChanges
      .pipe(
        filter((value) => !!value),
        startWith(this.countryIsoCode.value),
      );
  }

  private buildCompanyGroup(): FormGroup {
    return this.fb.group({
      name: ['', [
        Validators.required
      ]],
      street: ['', []],
      houseNumber: ['', []],
      countryIsoCode: [IsoCountryService.ISO_CODE_SWITZERLAND],
      postOfficeBoxNumber: ['', [Validators.maxLength(6)]],
    });
  }

  get companyGroup(): FormGroup {
    return <FormGroup>this.parentForm.get('company');
  }

  get countryIsoCode(): FormControl {
    return <FormControl>this.companyGroup.get('countryIsoCode');
  }
}
