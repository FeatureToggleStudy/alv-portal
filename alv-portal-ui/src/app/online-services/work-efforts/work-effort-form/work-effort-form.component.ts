import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Notification, NotificationType } from '../../../shared/layout/notifications/notification.model';
import { Observable, of } from 'rxjs';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { IsoCountryService } from '../../../shared/localities/iso-country.service';
import { atLeastOneRequiredValidator } from '../../../shared/forms/input/validators/at-least-one-required.validator';
import { filter, startWith, takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';

import { WorkEffortsRepository } from '../../../shared/backend-services/work-efforts/work-efforts.repository';
import { ActivatedRoute, Router } from '@angular/router';
import { patternInputValidator } from '../../../shared/forms/input/input-field/pattern-input.validator';
import { EMAIL_REGEX, URL_REGEX } from '../../../shared/forms/regex-patterns';
import { LinkPanelId } from '../../../shared/layout/link-panel/link-panel.component';
import { ZipCityFormValue } from '../../../shared/forms/input/zip-city-input/zip-city-form-value.types';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { phoneInputValidator } from '../../../shared/forms/input/input-field/phone-input.validator';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { ActionsOnClose, SuccessModalComponent } from './success-modal/success-modal.component';
import { IconKey } from '../../../shared/icons/custom-icon/custom-icon.component';
import {
  ApplyChannelsFormValue,
  emptyWorkEffortFormValue,
  formPossibleApplyChannels,
  formPossibleResults,
  ResultsFormValue,
  WorkEffortFormValue,
  WorkLoadFormOption
} from './work-effort-form.types';
import { deltaDate, mapDateToNgbDate } from '../../../shared/forms/input/ngb-date-utils';
import { createInitialZipAndCityFormValue } from '../../../shared/forms/input/zip-city-input/zip-city-form-mappers';
import { getAllErrors } from '../../../shared/forms/forms.utils';
import { LayoutConstants } from '../../../shared/layout/layout-constants.enum';
import { requiredIfValidator } from '../../../shared/forms/input/validators/required-if.validator';
import { conditionalValidator } from '../../../shared/forms/input/validators/conditional.validator';

const workLoadPrefix = 'portal.work-efforts.edit-form.work-loads';
const appliedThroughRavPrefix = 'portal.global';

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
  readonly IconKey = IconKey;
  readonly layoutConstants = LayoutConstants;
  countryIsoCode$: Observable<String>;
  allErrors = getAllErrors;
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
  private previousResultsValue;

  constructor(private fb: FormBuilder,
              private isoCountryService: IsoCountryService,
              private workEffortsRepository: WorkEffortsRepository,
              private route: ActivatedRoute,
              public router: Router,
              private modalService: ModalService) {

    super();
    this.countryOptions$ = this.isoCountryService.countryOptions$;
    const today = new Date();
    this.minDate = mapDateToNgbDate(deltaDate(today, 0, this.MIN_MONTHS_DIFF, 0));
    this.maxDate = mapDateToNgbDate(deltaDate(today, this.MAX_DAYS_DIFF, 0, 0));
  }

  get applyChannelsValue(): ApplyChannelsFormValue {
    return this.workEffortFormGroup.get('applyChannels').value;
  }

  isCompanyAddressRequired(applyChannel) {
    return applyChannel.MAIL || applyChannel.PERSONAL || applyChannel.PHONE
  }

  isContactPersonRequired(applyChannel) {
    return applyChannel.PERSONAL || applyChannel.PHONE
  }

  isCompanyEmailAndUrlRequired(applyChannel) {
    return applyChannel.ELECTRONIC
  }

  isPhoneRequired(applyChannel) {
    return applyChannel.PHONE
  }

  ngOnInit() {
    //todo also update the zip city
    this.initialWorkEffort = this.route.snapshot.data.initialFormValue || emptyWorkEffortFormValue;
    const controlsConfig = {
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
            validator: [conditionalValidator(() => this.isCompanyAddressRequired(this.applyChannelsValue),
              atLeastOneRequiredValidator(['street', 'postOfficeBoxNumber']))]
          }),
        }
      ),
      contactPerson: ['', [conditionalValidator(() => this.isContactPersonRequired(this.applyChannelsValue),
        Validators.required)]],
      companyEmailAndUrl: this.fb.group(
        {
          email: ['', [
            patternInputValidator(EMAIL_REGEX),
            Validators.maxLength(this.EMAIL_MAX_LENGTH)
          ]],
          url: ['', [
            patternInputValidator(URL_REGEX),
            Validators.maxLength(this.FORM_URL_MAX_LENGTH)
          ]]
        }, {
          validators: [
            conditionalValidator(() => this.isCompanyEmailAndUrlRequired(this.applyChannelsValue),
              atLeastOneRequiredValidator(['email', 'url']))
          ]
        }
      ),
      phone: ['', [phoneInputValidator,
        conditionalValidator(() => this.isPhoneRequired(this.applyChannelsValue),
          Validators.required)]],
      occupation: ['', [Validators.required, Validators.maxLength(this.OCCUPATION_MAX_LENGTH)]],
      appliedThroughRav: ['', Validators.required],
      workload: [''],
      results: this.generateResultsGroup(),
      rejectionReason: ['', [
        Validators.maxLength(this.REJECTION_REASON_MAX_LENGTH),
        requiredIfValidator(() => this.workEffortFormGroup.get('results').value.REJECTED)
      ]]
    };

    this.workEffortFormGroup = this.fb.group(controlsConfig);

    this.workEffortFormGroup.patchValue(this.initialWorkEffort);

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
        startWith(this.initialWorkEffort.companyAddress.countryIsoCode)
      );
    this.initialZipAndCity = createInitialZipAndCityFormValue(this.initialWorkEffort.companyAddress.zipAndCity, this.initialWorkEffort.companyAddress.countryIsoCode);
  }

  async submit() {
    await this.openSuccessModal();
  }

  async openSuccessModal() {
    // if all fields in the the form are okay
    const successModalRef = this.modalService.openLarge(SuccessModalComponent);
    const res = await successModalRef.result;
    if (res === ActionsOnClose.RECORD_NEW) {
      await this.router.navigate(['work-efforts', 'create']);
    } else if (res === ActionsOnClose.GO_TO_LIST) {
      await this.goToWorkEffortsList();
    }
  }

  async goToWorkEffortsList() {
    return await this.router.navigate(['work-efforts']);
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
      });
  }
}
