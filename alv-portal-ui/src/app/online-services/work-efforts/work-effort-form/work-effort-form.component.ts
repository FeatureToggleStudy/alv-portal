import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Notification, NotificationType } from '../../../shared/layout/notifications/notification.model';
import { Observable, of } from 'rxjs';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { IsoCountryService } from '../../../shared/localities/iso-country.service';
import { atLeastOneRequiredValidator } from '../../../shared/forms/input/validators/at-least-one-required.validator';
import { filter, startWith, takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import {
  ApplyChannelsFormValue,
  emptyWorkEffortFormValue,
  formPossibleApplyChannels,
  formPossibleResults,
  ResultsFormValue,
  WorkEffortFormValue,
  WorkLoadFormOption
} from './work-effort-form.mapper';
import { WorkEffortsRepository } from '../../../shared/backend-services/work-efforts/work-efforts.repository';
import { ActivatedRoute, Router } from '@angular/router';
import { patternInputValidator } from '../../../shared/forms/input/input-field/pattern-input.validator';
import { EMAIL_REGEX, URL_REGEX } from '../../../shared/forms/regex-patterns';
import { LinkPanelId } from '../../../shared/layout/link-panel/link-panel.component';
import { ZipCityFormValue } from '../../../job-advertisement/job-publication/job-publication-form/zip-city-input/zip-city-form-value.types';
import { ZipAndCityTypeaheadItem } from '../../../shared/localities/zip-and-city-typeahead-item';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { phoneInputValidator } from '../../../shared/forms/input/input-field/phone-input.validator';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { ActionsOnClose, SuccessModalComponent } from './success-modal/success-modal.component';

const workLoadPrefix = 'portal.work-efforts.edit-form.work-loads';
const appliedThroughRavPrefix = 'portal.global';


function allErrors(fGroup) {
  return Object
    .keys(fGroup.controls) // go through all the control names
    .reduce((result, name) => {
      const control = <FormGroup | AbstractControl>fGroup.controls[name];

      // if control is FormGroup recursively call its `allErrors`
      if (control instanceof FormGroup) {
        result[name] = {
          __groupErrors: control.errors,
          ...allErrors(control)
        };
      } else if (control instanceof FormArray) {
        // add implementation for array here
      } else {
        // for normal controls add errors here
        result[name] = control.errors;
      }

      return result; // and return the result to the next control
    }, {__groupErrors: fGroup.errors});
}

/**
 * todo move to shared
 * @param input
 * @param days
 * @param months
 * @param years
 */
function deltaDate(input, days, months, years): Date {
  var date = new Date(input);
  date.setDate(date.getDate() + days);
  date.setMonth(date.getMonth() + months);
  date.setFullYear(date.getFullYear() + years);
  return date;
}

/**
 * todo move to shared
 * @param ngbDate
 */
function mapNgbDateToDate(ngbDate: NgbDate): Date {
  return ngbDate ? new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day) : null;
}

/**
 * todo move to shared
 * @param date
 */
function mapDateToNgbDate(date: Date): NgbDate {
  return NgbDate.from({day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()});
}

interface DefaultValidatorsRepository {
  phone: ValidatorFn[],
  email: ValidatorFn[],
  url: ValidatorFn[],
  rejectionReason: ValidatorFn[],
  companyAddress: ValidatorFn[],
  postOfficeBoxNumberOrStreet: ValidatorFn[],
  contactPerson: ValidatorFn[],
  companyEmailAndUrl: ValidatorFn[],
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
  readonly REJECTION_REASON_MAX_LENGTH = 120;
  readonly OCCUPATION_MAX_LENGTH = 100;
  readonly EMAIL_MAX_LENGTH = 255;
  readonly FORM_URL_MAX_LENGTH = 255;
  readonly MIN_MONTHS_DIFF = -4;
  readonly MAX_DAYS_DIFF = 5;
  readonly LinkPanelId = LinkPanelId;
  allErrors = allErrors;
  countryIsoCode$: Observable<String>;
  workEffortFormGroup: FormGroup;
  initialWorkEffort: WorkEffortFormValue;
  resultsCheckboxNames = formPossibleResults;
  applyChannelsCheckboxNames = formPossibleApplyChannels;
  countryOptions$: Observable<SelectableOption[]>;
  bottomAlert: Notification = {
    isSticky: true,
    type: NotificationType.WARNING,
    messageKey: 'portal.work-efforts.edit-form.note.note-text'
  };
  workLoadOptions$ = of(Object.values(WorkLoadFormOption).map(value => ({
    value: value,
    label: workLoadPrefix + '.' + value
  })));
  appliedThroughRavOptions$ = of([{
    value: false,
    label: appliedThroughRavPrefix + '.' + 'no'
  }, {
    value: true,
    label: appliedThroughRavPrefix + '.' + 'yes'
  }]);
  initialZipAndCity: ZipCityFormValue;
  minDate: NgbDate;
  maxDate: NgbDate;

  /**
   * For each form control in this.workEffortFormGroup and its subgroups we list all the default validators,
   * EXCEPT the required validator.
   * This is done to dynamically make a control required or optional without losing all validators.
   * This solution is temporary before there will be AbstractControl.getValidators() function available.
   * See https://github.com/angular/angular/issues/13461 for the details of the problem
   */
  private readonly defaultDynamicValidators: DefaultValidatorsRepository = {
    email: [
      patternInputValidator(EMAIL_REGEX),
      Validators.maxLength(this.EMAIL_MAX_LENGTH)
    ],
    url: [
      patternInputValidator(URL_REGEX),
      Validators.maxLength(this.FORM_URL_MAX_LENGTH)
    ],
    phone: [phoneInputValidator],
    rejectionReason: [Validators.maxLength(this.REJECTION_REASON_MAX_LENGTH)],
    companyAddress: [],
    postOfficeBoxNumberOrStreet: [atLeastOneRequiredValidator(['street', 'postOfficeBoxNumber'])],
    contactPerson: [],
    companyEmailAndUrl: [atLeastOneRequiredValidator(['email', 'url'])],
  };
  private previousResultsValue;

  constructor(private fb: FormBuilder,
              private isoCountryService: IsoCountryService,
              private workEffortsRepository: WorkEffortsRepository,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: ModalService) {

    super();
    this.countryOptions$ = this.isoCountryService.countryOptions$;
    const today = new Date();
    this.minDate = mapDateToNgbDate(deltaDate(today, 0, this.MIN_MONTHS_DIFF, 0));
    this.maxDate = mapDateToNgbDate(deltaDate(today, this.MAX_DAYS_DIFF, 0, 0));
  }

  /**
   * creates a typeahead item for switzerland and fills the zipInput. For other countries doesn't do anything
   * fixme technically it's a mapper, maybe move it to work-effort mappers?
   * @param zipAndCity
   * @param countryIsoCode
   */
  private static createInitialZipAndCityFormValue(zipAndCity: ZipCityFormValue = {zipCode: '', city: ''},
                                                  countryIsoCode: string): ZipCityFormValue {
    const {zipCode, city} = zipAndCity;

    if (countryIsoCode === IsoCountryService.ISO_CODE_SWITZERLAND && zipCode && city) {
      const {zipCode, city} = zipAndCity;
      const label = zipCode + ' ' + city;
      return {
        ...zipAndCity,
        zipCityAutoComplete: new ZipAndCityTypeaheadItem({zipCode, city}, label, 0) //fixme maybe this logic should reside in zip input instead, because there's no reason WorkEffort should know about typeahead items.
      }
    }
    return zipAndCity;
  }

  ngOnInit() {

    this.workEffortFormGroup = this.fb.group({
      date: ['', Validators.required],
      applyChannels: this.generateApplyChannelsGroup(),
      companyName: ['', Validators.required],

      companyAddress: this.fb.group({
          countryIsoCode: [''],
          postOfficeBoxNumberOrStreet: this.fb.group({
            street: [''],
            houseNumber: [''],
            postOfficeBoxNumber: [''],
          }, {
            validator: this.defaultDynamicValidators.companyAddress
          }),
        }
      ),
      contactPerson: ['', this.defaultDynamicValidators.contactPerson],
      companyEmailAndUrl: this.fb.group(
        {
          email: ['', this.defaultDynamicValidators.email],
          url: ['', this.defaultDynamicValidators.url]
        }
      ),
      phone: ['', this.defaultDynamicValidators.phone],
      occupation: ['', [Validators.required, Validators.maxLength(this.OCCUPATION_MAX_LENGTH)]],
      appliedThroughRav: ['', Validators.required,],
      workload: [''],
      results: this.generateResultsGroup(),
      rejectionReason: [''],
    });

    this.initialWorkEffort = this.route.snapshot.data.initialFormValue || emptyWorkEffortFormValue;
    debugger;
    this.workEffortFormGroup.patchValue(this.initialWorkEffort);

    this.setUpDynamicValidation();
    this.previousResultsValue = {...this.initialWorkEffort.results};
    this.setUpUnclicking({
      PENDING: ['EMPLOYED', 'REJECTED'],
      REJECTED: ['EMPLOYED', 'PENDING'],
      EMPLOYED: ['REJECTED', 'PENDING'],
      INTERVIEW: []
    });

    this.countryIsoCode$ = this.workEffortFormGroup.get('companyAddress').get('countryIsoCode').valueChanges
      .pipe(
        filter((value) => !!value),
        startWith(this.initialWorkEffort.companyAddress.countryIsoCode),
      );
    this.initialZipAndCity = WorkEffortFormComponent.createInitialZipAndCityFormValue(this.initialWorkEffort.companyAddress.zipAndCity, this.initialWorkEffort.companyAddress.countryIsoCode)
  }

  async submit() {
    await this.openSuccessModal();
  }

  async openSuccessModal() {
    debugger;
    // if all fields in the the form are okay
    const successModalRef = this.modalService.openLarge(SuccessModalComponent);
    const res = await successModalRef.result;
    if (res === ActionsOnClose.RECORD_NEW) {
      await this.router.navigate(['work-efforts', 'create'])
    } else if (res === ActionsOnClose.GO_TO_LIST) {
      await this.router.navigate(['work-efforts']);
    }
  }

  /**
   * makes a certain control a required field.
   * todo there's a problem: this functions clears all other validators from the form control
   * @param control can be got with formGroup.get('')
   * @param name
   */
  private makeRequired(control: AbstractControl, name: string) {
    const defaultValidators = this.defaultDynamicValidators[name];
    if (defaultValidators) {
      control.setValidators([Validators.required].concat(defaultValidators));
      control.updateValueAndValidity();
    } else {
      throw new Error(`Problem with setting validators for the field ${name}. You need to add all default validators to the list in this.defaultDynamicValidators`);
    }
  }

  /**
   * clears all validators from the field, making it optional
   * todo: all validators will be cleared. We need to set them up back again.
   * @param control can be got with formGroup.get('')
   * @param name of the form control to search in defaultDynamicValidators;
   */
  private makeOptional(control: AbstractControl, name: string) {
    const defaultValidators = this.defaultDynamicValidators[name];
    if (defaultValidators) {
      control.setValidators(this.defaultDynamicValidators[name]);
      control.updateValueAndValidity();
    } else {
      throw new Error(`Problem with setting validators for the field ${name}. You need to add all default validators to the list in this.defaultDynamicValidators`)
    }

  }

  private clearValidatorsFromGroup(group: FormGroup, name: string) {
    const defaultValidators = this.defaultDynamicValidators[name];
    if (defaultValidators) {

      group.clearValidators();
      group.updateValueAndValidity();
    } else {
      throw new Error(`Problem with setting validators for the field ${name}. You need to add all default validators to the list in this.defaultDynamicValidators`)
    }
  }

  private makeAtLeastOneInGroupRequired(group: FormGroup, name: string, fields: string[]) {
    const defaultValidators = this.defaultDynamicValidators[name];
    if (defaultValidators) {
      group.setValidators([atLeastOneRequiredValidator(fields)].concat(defaultValidators));
      group.updateValueAndValidity();
    } else {
      throw new Error(`Problem with setting validators for the field ${name}. You need to add all default validators to the list in this.defaultDynamicValidators`)
    }
  }

  private setUpDynamicValidation(): void {
    this.workEffortFormGroup.get('applyChannels').valueChanges.pipe(
      takeUntil(this.ngUnsubscribe)
    )
      .subscribe(this.updateRequiredOptionalFields.bind(this));
  }

  /**
   * checks the values of the various applychannels and manages which fields of the form must be optional or required
   * @param newApplyChannel
   */
  private updateRequiredOptionalFields(newApplyChannel: ApplyChannelsFormValue) {
    const requiredMap = {
      companyAddress: newApplyChannel.MAIL || newApplyChannel.PERSONAL || newApplyChannel.PHONE,
      contactPerson: newApplyChannel.PERSONAL || newApplyChannel.PHONE,
      companyEmailAndUrl: newApplyChannel.ELECTRONIC,
      phone: newApplyChannel.PHONE
    };

    if (requiredMap.companyEmailAndUrl) {
      this.makeAtLeastOneInGroupRequired(<FormGroup>this.workEffortFormGroup.get('companyEmailAndUrl'), 'companyEmailAndUrl', ['email', 'url']);
    } else {
      this.clearValidatorsFromGroup(<FormGroup>this.workEffortFormGroup.get('companyEmailAndUrl'), 'companyEmailAndUrl');
    }

    for (let abstractControlName of ['companyAddress', 'contactPerson', 'phone']) {
      if (requiredMap[abstractControlName]) {
        this.makeRequired(this.workEffortFormGroup.get(abstractControlName), abstractControlName);
      } else {
        this.makeOptional(this.workEffortFormGroup.get(abstractControlName), abstractControlName);
      }
    }
  }

  private generateResultsGroup(): FormGroup {
    return this.generateCheckboxesFormGroup(this.resultsCheckboxNames, {
      validators: atLeastOneRequiredValidator(this.resultsCheckboxNames)
    });
  }

  private generateApplyChannelsGroup(): FormGroup {
    return this.generateCheckboxesFormGroup(this.applyChannelsCheckboxNames, {
      validators: atLeastOneRequiredValidator(this.applyChannelsCheckboxNames)
    });
  }

  private generateCheckboxesFormGroup(checkboxNames: string[], options: AbstractControlOptions | null = null): FormGroup {
    const controlsConfig = {};
    for (const checkbox of checkboxNames) {
      controlsConfig[checkbox] = [null];
    }
    return this.fb.group(controlsConfig, options);
  }

  /**
   * Certain results are mutually exclusive, for example if the result of the work effort is rejection,
   * you can't also click an employed checkbox. We unset the mutually exclusive checkboxes each time the user
   * clicks on a results checkbox group.
   * @param clearingRules keys are checkbox keys. Values are checkboxes you wanna unset if the key is set
   */
  private setUpUnclicking(clearingRules: { [key: string]: string[] }) {
    this.workEffortFormGroup.get('results').valueChanges.pipe(
      takeUntil(this.ngUnsubscribe)
    )
      .subscribe((next: ResultsFormValue) => {
        const prev = this.previousResultsValue;
        const keySetToTrue: string = Object.keys(prev).filter(key => !prev[key] && next[key])[0];
        const valueToPatch: ResultsFormValue = {...next};
        if (keySetToTrue) {
          for (const key of clearingRules[keySetToTrue]) {
            valueToPatch[key] = false;
          }
        }
        this.previousResultsValue = {...valueToPatch};
        this.workEffortFormGroup.get('results').setValue(valueToPatch, {emitEvent: false});
      })
  }
}
