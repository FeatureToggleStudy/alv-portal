import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';

const contractTypePrefix = 'portal.work-efforts.edit-form.contract-types';

// todo this interface doesn't depend on the WorkEffortApplyChannel interface, so if something is changed there, we will  need to change it here as well. Probably it's possible to specify this interface in a nicer way.
interface ApplyChannelFormValue {
  ELECTRONIC: boolean,
  MAIL: boolean,
  PERSONAL: boolean,
  PHONE: boolean,
}

@Component({
  selector: 'alv-work-effort-form',
  templateUrl: './work-effort-form.component.html',
  styleUrls: ['./work-effort-form.component.scss']
})
export class WorkEffortFormComponent extends AbstractSubscriber implements OnInit {

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

    super();
    this.countryOptions$ = this.isoCountryService.countryOptions$;
    this.initialCompany = this.initialWorkEffort.company;
  }


  ngOnInit() {

    this.workEffortFormGroup = this.fb.group({
      date: [this.initialWorkEffort.date],
      applyChannel: this.generateApplyChannelGroup(),
      name: ['', Validators.required],

      address: this.fb.group({
          countryIsoCode: [''],
          postOfficeBoxNumberOrStreet: this.fb.group({
            street: [''],
            houseNumber: [''],
            postOfficeBoxNumber: [''],
          }, {
            validator: [atLeastOneRequiredValidator(['street', 'postOfficeBoxNumber'])]
          }),
        }
      ),
      contactPerson: [''],
      companyEmailAndUrl: this.fb.group(
        {
          email: [''],
          url: ['']
        }
      ),
      phone: [''],
      occupation: ['', Validators.required],
      ravJobCheckBox: [false],
      workload: [''],
      result: this.generateResultGroup()
    });

    this.workEffortFormGroup.get('applyChannel').valueChanges.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(this.updateRequiredOptionalFields.bind(this));

  }

  /**
   * checks the values of the various applychannels and manages which fields of the form must be optional or required
   * @param newApplyChannel
   */
  private updateRequiredOptionalFields(newApplyChannel: ApplyChannelFormValue) {
    const requiredMap = {
      address: newApplyChannel.MAIL || newApplyChannel.PERSONAL || newApplyChannel.PHONE,
      contactPerson: newApplyChannel.PERSONAL || newApplyChannel.PHONE,
      companyEmailAndUrl: newApplyChannel.ELECTRONIC,
      phone: newApplyChannel.PHONE
    };

    if (requiredMap.companyEmailAndUrl) {
      WorkEffortFormComponent.makeAtLeastOneInGroupRequired(<FormGroup>this.workEffortFormGroup.get('companyEmailAndUrl'), ['email', 'url']);
      WorkEffortFormComponent.makeRequired(this.workEffortFormGroup.get('companyEmailAndUrl'))
    } else {
      WorkEffortFormComponent.clearValidatorsFromGroup(<FormGroup>this.workEffortFormGroup.get('companyEmailAndUrl'));
      WorkEffortFormComponent.makeOptional(this.workEffortFormGroup.get('companyEmailAndUrl'))
    }

    for (let abstractControlName of ['address', 'contactPerson', 'phone']) {
      if (requiredMap[abstractControlName]) {
        WorkEffortFormComponent.makeRequired(this.workEffortFormGroup.get(abstractControlName));
      } else {
        WorkEffortFormComponent.makeOptional(this.workEffortFormGroup.get(abstractControlName));
      }
    }


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

  private generateApplyChannelGroup(): FormGroup {
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

  /**
   * makes a certain control a required field.
   * todo there's a problem: this functions clears all other validators from the form control
   * @param control can be got with formGroup.get('')
   */
  private static  makeRequired(control: AbstractControl) {
    control.setValidators(Validators.required);
    control.updateValueAndValidity();
  }

  /**
   * clears all validators from the field, making it optional
   * todo: all validators will be cleared. We need to set them up back again.
   * @param control can be got with formGroup.get('')
   */
  private static makeOptional(control: AbstractControl) {
    control.clearValidators();
    control.updateValueAndValidity();
  }

  private static clearValidatorsFromGroup(group: FormGroup) {
    group.clearValidators();
    group.updateValueAndValidity();
  }

  private static makeAtLeastOneInGroupRequired(group: FormGroup, fields: string[]) {
    group.setValidators(atLeastOneRequiredValidator(fields));
    group.updateValueAndValidity();
  }
}
