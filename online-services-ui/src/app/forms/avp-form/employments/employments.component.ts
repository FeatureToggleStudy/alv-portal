import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mockDocument1 } from '../../forms.mock';
import { EmploymentsModel } from './employments.model';
import { AddressFormGroup } from '../../../shared/components/address-input/address-form-group';

@Component({
  selector: 'os-employments',
  templateUrl: './employments.component.html',
  styleUrls: ['./employments.component.scss']
})
export class EmploymentsComponent implements OnInit {

  @Input()
  model: EmploymentsModel;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  get employments(): FormArray {
    return this.form.get('employments') as FormArray;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      worked: this.fb.control(true),
      ownField: this.fb.control('', Validators.required),
      employments: this.fb.array([
        this.fb.group({
          period: this.fb.control({
            from: {
              year: 2018,
              month: 9,
              day: 29
            },
            to: {
              year: 2018,
              month: 10,
              day: 18
            }
          }),
          employer: this.fb.control('someone'),
          address: this.fb.group(new AddressFormGroup(this.fb)),
          docs: this.fb.control(mockDocument1) // here multiple docs will be instead of one

        })
      ]),
      selfEmployed: this.fb.control(''),
      labourMarketMeasures: this.fb.control('')
    });
  }

  addEmployment() {
    this.employments.push(this.fb.group({
      employer: this.fb.control(''),
      address: this.fb.group(new AddressFormGroup(this.fb)),
      period: this.fb.control('')
    }));
  }

  removeEmployment(i) {
    this.employments.removeAt(i);
  }
}
