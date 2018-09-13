import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mockDocument1 } from '../../forms.mock';
import { EmploymentsModel } from './employments.model';
import { of } from 'rxjs';
import { HelpTextService } from '../../../../shared/components/help-button/help-text.service';
import { DateIntervalFormGroup } from '../../../../shared/components/date-interval-input/date-interval-form-group';
import { AddressFormGroup } from '../../../../shared/components/address-input/address-form-group';

@Component({
  selector: 'os-employments',
  templateUrl: './employments.component.html',
  styleUrls: ['./employments.component.scss']
})
export class EmploymentsComponent implements OnInit {

  @Input()
  model: EmploymentsModel;
  form: FormGroup;

  options$ = of([
    {
      label: 'Yes',
      value: true
    },
    {
      label: 'No',
      value: false
    }

  ]);

  constructor(private fb: FormBuilder,
              public helpTextService: HelpTextService) {
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
          period: new DateIntervalFormGroup({
            from: this.fb.control({year: 2018, month: 9, day: 29}, Validators.required),
            to: this.fb.control({year: 2018, month: 10, day: 18}, Validators.required)
          }),
          employer: this.fb.control('someone', Validators.required),
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
      period: new DateIntervalFormGroup({
        from: this.fb.control('', Validators.required),
        to: this.fb.control('', Validators.required)
      })
    }));
  }

  removeEmployment(i) {
    this.employments.removeAt(i);
  }
}
