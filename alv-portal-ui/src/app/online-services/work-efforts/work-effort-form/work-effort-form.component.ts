import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { atLeastOneRequiredValidator } from '../../../shared/forms/input/validators/at-least-one-required.validator';
import { PostAddressFormValue } from '../../../job-advertisement/job-publication/job-publication-form/post-address-form/post-address-form-value.types';
import { Notification, NotificationType } from '../../../shared/layout/notifications/notification.model';
import { of } from 'rxjs';
import { ContractType } from '../../../shared/backend-services/shared.types';

@Component({
  selector: 'alv-work-effort-form',
  templateUrl: './work-effort-form.component.html',
  styleUrls: ['./work-effort-form.component.scss']
})
export class WorkEffortFormComponent implements OnInit {

  workEffortFormGroup: FormGroup;

  bottomAlert: Notification = {
    isSticky: true,
    type: NotificationType.WARNING,
    messageKey: 'portal.work-efforts.edit-form.note.note-text'
  };

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

  contractTypeOptions$ = of([
    {
      value: ContractType.TEMPORARY,
      label: 'portal.work-efforts.edit-form.contract-types.temporary'
    },
    {
      value: ContractType.PERMANENT,
      label: 'portal.work-efforts.edit-form.contract-types.permanent'
    },

  ]);

  get resultFormGroup(): FormGroup {
    return this.workEffortFormGroup.get('workload') as FormGroup;
  }

  constructor(private fb: FormBuilder) {


  }


  ngOnInit() {

    this.workEffortFormGroup = this.fb.group({
      date: [''],
      communicationChannel: this.fb.array([
          this.fb.control(''),
          this.fb.control(''),
          this.fb.control(''),
          this.fb.control(''),
        ]
      ),
      onlineCheckbox: [false],
      mailCheckbox: [false],
      personallyCheckbox: [false],
      phoneCheckbox: [false],
      address: this.fb.group({
          name: ['name'],
          houseNumber: [''],
          countryIsoCode: [''],
          postOfficeBoxNumberOrStreet: [''],
        },
        {
          validator: [atLeastOneRequiredValidator(['street', 'postOfficeBoxNumber'])]
        }
      ),
      email: [''],
      url: [''],
      phone: [''],
      occupation: [''],
      ravJobCheckBox: [false],
      workload: [''],
      result: ['']


    });
  }

  submit() {

  }

}
