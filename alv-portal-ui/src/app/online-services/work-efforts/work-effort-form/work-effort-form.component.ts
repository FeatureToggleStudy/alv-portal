import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { atLeastOneRequiredValidator } from '../../../shared/forms/input/validators/at-least-one-required.validator';
import { PostAddressFormValue } from '../../../job-advertisement/job-publication/job-publication-form/post-address-form/post-address-form-value.types';
import { Notification, NotificationType } from '../../../shared/layout/notifications/notification.model';
import { of } from 'rxjs';
import { ContractType } from '../../../shared/backend-services/shared.types';
import {
  mockedWorkEffort,
  WorkEffortApplyChannel,
  WorkEffortResult
} from '../../../shared/backend-services/work-efforts/work-efforts.types';

const contractTypePrefix = 'portal.work-efforts.edit-form.contract-types';

@Component({
  selector: 'alv-work-effort-form',
  templateUrl: './work-effort-form.component.html',
  styleUrls: ['./work-effort-form.component.scss']
})
export class WorkEffortFormComponent implements OnInit {

  workEffortFormGroup: FormGroup;
  /**
   * the main input
   */
  public initialWorkEffort = mockedWorkEffort;

  resultOptions = WorkEffortResult;
  resultOptionsKeys: string[] = Object.keys(WorkEffortResult).filter(key => key !== 'ALL');

  applyChannelOptions = WorkEffortApplyChannel;
  applyChannelOptionsKeys: string[] = Object.keys(WorkEffortApplyChannel);

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
      label: contractTypePrefix + '.' + ContractType.TEMPORARY
    },
    {
      value: ContractType.PERMANENT,
      label: contractTypePrefix + '.' + ContractType.PERMANENT
    }
  ]);


  constructor(private fb: FormBuilder) {


  }


  ngOnInit() {

    this.workEffortFormGroup = this.fb.group({
      date: [this.initialWorkEffort.date],
      applyChannel: this.generateApplyChannelGroup(),
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
      result: this.generateResultGroup()
    });
  }

  private generateResultGroup(): FormGroup {
    const controlsConfig = {};

    for (const result of this.resultOptionsKeys) {
      controlsConfig[this.resultOptions[result]] = false;
    }
    for (const result of this.initialWorkEffort.results) {
      controlsConfig[result] = true;
    }
    return this.fb.group(controlsConfig);

  }

  generateApplyChannelGroup(): FormGroup {
    const controlsConfig = {};
    for (const applyChannel of this.applyChannelOptionsKeys) {
      controlsConfig[this.applyChannelOptions[applyChannel]] = false;
    }
    for (const applyChannel of this.initialWorkEffort.applicationForms) {
      controlsConfig[applyChannel] = true;
    }
    return this.fb.group(controlsConfig);
  }


  submit() {

  }

}
