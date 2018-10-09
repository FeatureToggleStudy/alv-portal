import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'alv-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss']
})
export class AddressInputComponent implements OnInit {

  @Input() form: FormGroup;

  // TODO: Get countries list from backend
  countries = of([
    {
      label: 'Switzerland',
      value: 'CH'
    },
    {
      label: 'Germany',
      value: 'DE'
    },
    {
      label: 'Austria',
      value: 'AT'
    },
    {
      label: 'France',
      value: 'FR'
    },
    {
      label: 'Italy',
      value: 'IT'
    }]);

  constructor() {
  }

  ngOnInit(): void {
  }

}
