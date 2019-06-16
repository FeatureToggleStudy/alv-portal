import {
  WorkEffort,
  WorkEffortApplyChannel,
  WorkEffortResult
} from '../../../shared/backend-services/work-efforts/work-efforts.types';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { fromISODate } from '../../../shared/forms/input/ngb-date-utils';
import { mapToPostalCodeAndCity } from '../../../shared/forms/input/zip-city-input/zip-city-form-mappers';
import {
  ApplyChannelsFormValue,
  ResultsFormValue,
  WorkEffortFormValue,
  WorkLoadFormOption
} from './work-effort-form.types';


function mapToApplyChannelsFormValue(applyChannels: WorkEffortApplyChannel[]): ApplyChannelsFormValue {
  return {
    ELECTRONIC: applyChannels.includes(WorkEffortApplyChannel.ELECTRONIC),
    MAIL: applyChannels.includes(WorkEffortApplyChannel.MAIL),
    PERSONAL: applyChannels.includes(WorkEffortApplyChannel.PERSONAL),
    PHONE: applyChannels.includes(WorkEffortApplyChannel.PHONE),
  };
}

function mapBackendResultsToResultsFormValue(results: WorkEffortResult[]): ResultsFormValue {
  return {
    EMPLOYED: results.includes(WorkEffortResult.EMPLOYED),
    INTERVIEW: results.includes(WorkEffortResult.INTERVIEW),
    PENDING: results.includes(WorkEffortResult.PENDING),
    REJECTED: results.includes(WorkEffortResult.REJECTED),
  };
}

function mapResultsFormValueToBackendResults(results: ResultsFormValue): WorkEffortResult[] {
  return Object.keys(results).filter(resultKey => results[resultKey]) as WorkEffortResult[];
}

function mapApplyChannelsFormValueToBackend(applyChannels: ApplyChannelsFormValue): WorkEffortApplyChannel[] {
  return Object.keys(applyChannels).filter(channelKey => applyChannels[channelKey]) as WorkEffortApplyChannel[];
}

function mapNgbDateStructToString(struct: NgbDateStruct): string {
  return new Date(struct.year, struct.month - 1, struct.day).toISOString();
}

function mapToWorkloadFormValue(isFulltime: boolean): WorkLoadFormOption {
  return isFulltime ? WorkLoadFormOption.FULLTIME : WorkLoadFormOption.PARTTIME;
}

/**
 *
 * @return true if full time
 */
function mapWorkloadToBackend(workLoadFormValue: WorkLoadFormOption): boolean {
  return workLoadFormValue === WorkLoadFormOption.FULLTIME;
}

export function mapToWorkEffortFormValue(workEffort: WorkEffort): WorkEffortFormValue {
  return {
    companyName: workEffort.company.name,
    date: fromISODate(workEffort.date),
    applyChannels: mapToApplyChannelsFormValue(workEffort.applicationForms),
    companyAddress: {
      countryIsoCode: workEffort.company.countryIsoCode,
      postOfficeBoxNumberOrStreet: {
        houseNumber: workEffort.company.houseNumber,
        postOfficeBoxNumber: workEffort.company.postOfficeBoxNumber || '',
        street: workEffort.company.street
      },
      zipAndCity: {
        city: workEffort.company.city, //todo check that the mapping works
        zipCode: workEffort.company.postalCode,
        zipCityAutoComplete: null
      }
    },
    companyEmailAndUrl: {
      email: workEffort.company.email,
      url: workEffort.company.applyFormUrl
    },
    occupation: workEffort.occupation,
    phone: workEffort.company.phone,
    results: mapBackendResultsToResultsFormValue(workEffort.results),
    contactPerson: workEffort.company.contactPerson,
    appliedThroughRav: workEffort.appliedThroughRav,
    workload: mapToWorkloadFormValue(workEffort.fullTimeJob),
    rejectionReason: workEffort.rejectionReason
  };
}

export function mapToWorkEffortBackendValue(formValue: WorkEffortFormValue): WorkEffort {
  const zipAndCity = mapToPostalCodeAndCity(formValue.companyAddress.zipAndCity);
  return {
    date: mapNgbDateStructToString(formValue.date),
    appliedThroughRav: formValue.appliedThroughRav,
    company: {
      contactPerson: formValue.contactPerson,
      phone: formValue.phone,
      applyFormUrl: formValue.companyEmailAndUrl.url,
      email: formValue.companyEmailAndUrl.email,
      street: formValue.companyAddress.postOfficeBoxNumberOrStreet.street,
      postOfficeBoxNumber: formValue.companyAddress.postOfficeBoxNumberOrStreet.postOfficeBoxNumber,
      houseNumber: formValue.companyAddress.postOfficeBoxNumberOrStreet.houseNumber,
      countryIsoCode: formValue.companyAddress.countryIsoCode,
      postalCode: zipAndCity.postalCode,
      city: zipAndCity.city,
      name: formValue.companyName,

    },
    results: mapResultsFormValueToBackendResults(formValue.results),
    applicationForms: mapApplyChannelsFormValueToBackend(formValue.applyChannels),
    occupation: formValue.occupation,
    fullTimeJob: mapWorkloadToBackend(formValue.workload),
    rejectionReason: formValue.rejectionReason,
  };
}
