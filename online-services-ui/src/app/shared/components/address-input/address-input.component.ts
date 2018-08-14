import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { SubForm } from '../sub-form';

@Component({
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AddressInputComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => AddressInputComponent),
    multi: true
  }],
  selector: 'os-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss']
})
export class AddressInputComponent extends SubForm implements OnInit {

  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      street: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required]
    } as { [p: string]: any });
  }

  ngOnInit(): void {
  }

}
