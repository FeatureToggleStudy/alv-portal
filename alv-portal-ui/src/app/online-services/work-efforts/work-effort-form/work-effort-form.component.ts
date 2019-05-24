import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { atLeastOneRequiredValidator } from '../../../shared/forms/input/validators/at-least-one-required.validator';
import { PostAddressFormValue } from '../../../job-advertisement/job-publication/job-publication-form/post-address-form/post-address-form-value.types';

@Component({
  selector: 'alv-work-effort-form',
  templateUrl: './work-effort-form.component.html',
  styleUrls: ['./work-effort-form.component.scss']
})
export class WorkEffortFormComponent implements OnInit {

  formGroup: FormGroup;

  postAddressFormValue: PostAddressFormValue = {
    countryIsoCode: 'ch',
    houseNumber: 'aa',
    name: 'mimcaom',
    postOfficeBoxNumberOrStreet: {
      street: 'string'
    },
    zipAndCity: {
      city: 'Lausanne',
      zipCode: '29092'
    }

  };
  constructor(private fb: FormBuilder) {

  }


  ngOnInit() {

    this.formGroup = this.fb.group({
      date: ['someval',],
      onlineCheckbox: [false],
      mailCheckbox: [false],
      personallyCheckbox: [false],
      phoneCheckbox: [false],
      address: this.fb.group({
          name: ['name'],
          houseNumber: [''],
          countryIsoCode: [''],
          postOfficeBoxNumberOrStreet: ['']

        },
        {
          validator: [atLeastOneRequiredValidator(['street', 'postOfficeBoxNumber'])]
        }
      )

    });
  }

  submit() {

  }

}
