import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IsoCountryService } from '../iso-country.service';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { Observable } from 'rxjs/index';


@Component({
  selector: 'alv-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  @Input()
  parentForm: FormGroup;

  countryOptions$: Observable<SelectableOption[]>;

  constructor(private fb: FormBuilder,
              private isoCountryService: IsoCountryService) {
    this.countryOptions$ = this.isoCountryService.countryOptions$;
  }

  ngOnInit(): void {
    this.parentForm.addControl('company', this.buildCompanyGroup());
  }

  private buildCompanyGroup(): FormGroup {
    return this.fb.group({
      name: ['', [
        Validators.required
      ]],
      street: ['', []],
      houseNumber: ['', []],
      countryIsoCode: [IsoCountryService.ISO_CODE_SWITZERLAND]
    });
  }

  get companyGroup(): FormGroup {
    return <FormGroup>this.parentForm.get('company');
  }
}
