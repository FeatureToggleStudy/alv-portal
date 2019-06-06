import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Notification, NotificationType } from '../../../shared/layout/notifications/notification.model';
import { Observable, of } from 'rxjs';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { IsoCountryService } from '../../../shared/localities/iso-country.service';
import { atLeastOneRequiredValidator } from '../../../shared/forms/input/validators/at-least-one-required.validator';
import { filter, startWith, takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import {
  ApplyChannelsFormValue,
  formPossibleApplyChannels,
  formPossibleResults,
  WorkEffortFormValue,
  WorkLoadFormOption
} from './work-effort-form.mapper';
import { WorkEffortsRepository } from '../../../shared/backend-services/work-efforts/work-efforts.repository';
import { ActivatedRoute } from '@angular/router';
import { patternInputValidator } from '../../../shared/forms/input/input-field/pattern-input.validator';
import { EMAIL_REGEX, URL_REGEX } from '../../../shared/forms/regex-patterns';
import { LinkPanelId } from '../../../shared/layout/link-panel/link-panel.component';
import { ZipCityFormValue } from '../../../job-advertisement/job-publication/job-publication-form/zip-city-input/zip-city-form-value.types';
import { ZipAndCityTypeaheadItem } from '../../../shared/localities/zip-and-city-typeahead-item';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { phoneInputValidator } from '../../../shared/forms/input/input-field/phone-input.validator';

const workLoadPrefix = 'portal.work-efforts.edit-form.work-loads';
const appliedThroughRavPrefix = 'portal.global';

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
  return NgbDate.from({ day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()});
}

interface DefaultValidatorsRepository {
  phone: ValidatorFn[],
  email: ValidatorFn[],
  url: ValidatorFn[],
  rejectionReason: ValidatorFn[],
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
  readonly MIN_MONTHS_DIFF=-4;
  readonly MAX_DAYS_DIFF=5;
  readonly LinkPanelId = LinkPanelId;
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

  //fixme have the list of the default validators per field. Is not used yet
  private defaultDynamicValidators: DefaultValidatorsRepository = {
    email: [
      patternInputValidator(EMAIL_REGEX),
      Validators.maxLength(this.EMAIL_MAX_LENGTH)
    ],
    url: [
      Validators.required,
      patternInputValidator(URL_REGEX),
      Validators.maxLength(this.FORM_URL_MAX_LENGTH)
    ],
    phone: [phoneInputValidator],
    rejectionReason: [Validators.maxLength(this.REJECTION_REASON_MAX_LENGTH)],

  };

  constructor(private fb: FormBuilder,
              private isoCountryService: IsoCountryService,
              private workEffortsRepository: WorkEffortsRepository,
              private route: ActivatedRoute) {

    super();
    this.countryOptions$ = this.isoCountryService.countryOptions$;
    const today = new Date();
    this.minDate = mapDateToNgbDate(deltaDate(today, 0, this.MIN_MONTHS_DIFF, 0));
    this.maxDate = mapDateToNgbDate(deltaDate(today, this.MAX_DAYS_DIFF, 0, 0));
  }

  /**
   * makes a certain control a required field.
   * todo there's a problem: this functions clears all other validators from the form control
   * @param control can be got with formGroup.get('')
   */
  private static makeRequired(control: AbstractControl) {
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

  /**
   * creates a typeahead item for switzerland and fills the zipInput. For other countries doesn't do anything
   * fixme technically it's a mapper, maybe move it to work-effort mappers?
   * @param zipAndCity
   * @param countryIsoCode
   */
  private static createInitialZipAndCityFormValue(zipAndCity: ZipCityFormValue, countryIsoCode: string): ZipCityFormValue {
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
            validator: [atLeastOneRequiredValidator(['street', 'postOfficeBoxNumber'])]
          }),
        }
      ),
      contactPerson: [''],
      companyEmailAndUrl: this.fb.group(
        {
          email: ['', this.defaultDynamicValidators.email],
          url: ['', this.defaultDynamicValidators.url]
        }
      ),
      phone: ['', this.defaultDynamicValidators.phone],
      occupation: ['', [Validators.required, Validators.maxLength(this.OCCUPATION_MAX_LENGTH) ]],
      appliedThroughRav: [false],
      workload: [''],
      results: this.generateResultsGroup(),
      rejectionReason: [''],
    });

    this.initialWorkEffort = this.route.snapshot.data.initialFormValue;
    this.workEffortFormGroup.patchValue(this.initialWorkEffort);

    this.setUpDynamicValidation();

    this.countryIsoCode$ = this.workEffortFormGroup.get('companyAddress').get('countryIsoCode').valueChanges
      .pipe(
        filter((value) => !!value),
        startWith(this.initialWorkEffort.companyAddress.countryIsoCode),
      );
    this.initialZipAndCity = WorkEffortFormComponent.createInitialZipAndCityFormValue(this.initialWorkEffort.companyAddress.zipAndCity, this.initialWorkEffort.companyAddress.countryIsoCode)
  }

  submit() {

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
      WorkEffortFormComponent.makeAtLeastOneInGroupRequired(<FormGroup>this.workEffortFormGroup.get('companyEmailAndUrl'), ['email', 'url']);
      WorkEffortFormComponent.makeRequired(this.workEffortFormGroup.get('companyEmailAndUrl'))
    } else {
      WorkEffortFormComponent.clearValidatorsFromGroup(<FormGroup>this.workEffortFormGroup.get('companyEmailAndUrl'));
      WorkEffortFormComponent.makeOptional(this.workEffortFormGroup.get('companyEmailAndUrl'))
    }

    for (let abstractControlName of ['companyAddress', 'contactPerson', 'phone']) {
      if (requiredMap[abstractControlName]) {
        WorkEffortFormComponent.makeRequired(this.workEffortFormGroup.get(abstractControlName));
      } else {
        WorkEffortFormComponent.makeOptional(this.workEffortFormGroup.get(abstractControlName));
      }
    }
  }

  private generateResultsGroup(): FormGroup {
    return this.generateCheckboxesFormGroup(this.resultsCheckboxNames);
  }

  private generateApplyChannelsGroup(): FormGroup {
    return this.generateCheckboxesFormGroup(this.applyChannelsCheckboxNames);
  }

  private generateCheckboxesFormGroup(checkboxNames: string[]): FormGroup {
    const controlsConfig = {};
    for (const checkbox of checkboxNames) {
      controlsConfig[checkbox] = [false];
    }
    return this.fb.group(controlsConfig);
  }
}
