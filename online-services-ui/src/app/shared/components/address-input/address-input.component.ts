import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';
import { SubForm } from '../sub-form';
import { AddressFormGroup } from './address-form-group';

@Component({
  selector: 'os-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss']
})
export class AddressInputComponent implements OnInit {

  @Input() form: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
  }

}
