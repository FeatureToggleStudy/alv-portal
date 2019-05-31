import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Notification, NotificationType } from '../../../shared/layout/notifications/notification.model';
import { Observable, of } from 'rxjs';
import { ContractType } from '../../../shared/backend-services/shared.types';
import {
  mockedWorkEffort,
  WorkEffortApplyChannel,
  WorkEffortResult
} from '../../../shared/backend-services/work-efforts/work-efforts.types';
import { Company } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { IsoCountryService } from '../../../shared/localities/iso-country.service';
import { atLeastOneRequiredValidator } from '../../../shared/forms/input/validators/at-least-one-required.validator';

const contractTypePrefix = 'portal.work-efforts.edit-form.contract-types';

@Component({
  selector: 'alv-work-effort-form',
  templateUrl: './work-effort-form.component.html',
  styleUrls: ['./work-effort-form.component.scss']
})
export class WorkEffortFormComponent implements OnInit {

  readonly PO_BOX_MAX_LENGTH = 6;
  readonly HOUSE_NUMBER_MAX_LENGTH = 10;
  readonly STREET_MAX_LENGTH = 60;
  readonly NAME_MAX_LENGTH = 255;

  workEffortFormGroup: FormGroup;
  /**
   * the main input
   */
  public initialWorkEffort = mockedWorkEffort;

  public initialCompany: Company;

  resultOptions = WorkEffortResult;
  resultOptionsKeys: string[] = Object.keys(WorkEffortResult).filter(key => key !== 'ALL');

  applyChannelOptions = WorkEffortApplyChannel;
  applyChannelOptionsKeys: string[] = Object.keys(WorkEffortApplyChannel);

  countryOptions$: Observable<SelectableOption[]>;

  bottomAlert: Notification = {
    isSticky: true,
    type: NotificationType.WARNING,
    messageKey: 'portal.work-efforts.edit-form.note.note-text'
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


  constructor(private fb: FormBuilder, private isoCountryService: IsoCountryService) {

    this.countryOptions$ = this.isoCountryService.countryOptions$;
    this.initialCompany = this.initialWorkEffort.company;
  }


  ngOnInit() {

    this.workEffortFormGroup = this.fb.group({
      date: [this.initialWorkEffort.date],
      applyChannel: this.generateApplyChannelGroup(),
      companyDetails: this.fb.group({
          name: [''],
          postOfficeBoxNumberOrStreet: this.fb.group({
            street: [''],
            houseNumber: [''],
            postOfficeBoxNumber: [''],
          }, {
            validator: [atLeastOneRequiredValidator(['street', 'postOfficeBoxNumber'])]
          }),
          countryIsoCode: ['']
        }
      ),
      companyName: [''],
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
