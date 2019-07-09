import {
  WorkEffort,
  WorkEffortApplyChannelType,
  WorkEffortApplyStatus
} from '../../../shared/backend-services/work-efforts/proof-of-work-efforts.types';
import { fromISODate, toISOLocalDate } from '../../../shared/forms/input/ngb-date-utils';
import {
  createInitialZipAndCityFormValue,
  mapToPostalCodeAndCity
} from '../../../shared/forms/input/zip-city-input/zip-city-form-mappers';
import {
  ApplyChannelsFormValue,
  ResultsFormValue,
  WorkEffortFormValue,
  WorkLoadFormOption
} from './work-effort-form.types';


function mapToApplyChannelsFormValue(applyChannels: WorkEffortApplyChannelType[]): ApplyChannelsFormValue {
  return {
    ELECTRONIC: applyChannels.includes(WorkEffortApplyChannelType.ELECTRONIC),
    MAIL: applyChannels.includes(WorkEffortApplyChannelType.MAIL),
    PERSONAL: applyChannels.includes(WorkEffortApplyChannelType.PERSONAL),
    PHONE: applyChannels.includes(WorkEffortApplyChannelType.PHONE),
  };
}

function mapBackendResultsToResultsFormValue(results: WorkEffortApplyStatus[]): ResultsFormValue {
  return {
    EMPLOYED: results.includes(WorkEffortApplyStatus.EMPLOYED),
    INTERVIEW: results.includes(WorkEffortApplyStatus.INTERVIEW),
    PENDING: results.includes(WorkEffortApplyStatus.PENDING),
    REJECTED: results.includes(WorkEffortApplyStatus.REJECTED),
  };
}

function mapResultsFormValueToBackendResults(results: ResultsFormValue): WorkEffortApplyStatus[] {
  return Object.keys(results).filter(resultKey => results[resultKey]) as WorkEffortApplyStatus[];
}

function mapApplyChannelsFormValueToBackend(applyChannels: ApplyChannelsFormValue): WorkEffortApplyChannelType[] {
  return Object.keys(applyChannels).filter(channelKey => applyChannels[channelKey]) as WorkEffortApplyChannelType[];
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
    id: workEffort.id,
    companyName: workEffort.applyChannel.address ? workEffort.applyChannel.address.name : undefined,
    date: fromISODate(workEffort.applyDate),
    applyChannels: mapToApplyChannelsFormValue(workEffort.applyChannel.types),
    companyAddress: {
      countryIsoCode: workEffort.applyChannel.address ? workEffort.applyChannel.address.country : undefined,
      postOfficeBoxNumberOrStreet: {
        houseNumber: workEffort.applyChannel.address ? workEffort.applyChannel.address.houseNumber : undefined,
        postOfficeBoxNumber: workEffort.applyChannel.address ? workEffort.applyChannel.address.poBox : undefined,
        street: workEffort.applyChannel.address ? workEffort.applyChannel.address.street : undefined
      },
      zipAndCity: createInitialZipAndCityFormValue({
        city: workEffort.applyChannel.address ? workEffort.applyChannel.address.city : undefined,
        zipCode: workEffort.applyChannel.address ? workEffort.applyChannel.address.postalCode : undefined
      }, workEffort.applyChannel.address ? workEffort.applyChannel.address.country : undefined)
    },
    companyEmailAndUrl: {
      email: workEffort.applyChannel.email,
      url: workEffort.applyChannel.formUrl
    },
    occupation: workEffort.occupation,
    phone: workEffort.applyChannel.phone,
    results: mapBackendResultsToResultsFormValue(workEffort.applyStatus),
    contactPerson: workEffort.applyChannel.contactPerson,
    appliedThroughRav: workEffort.ravAssigned,
    workload: mapToWorkloadFormValue(workEffort.fullTimeJob),
    rejectionReason: workEffort.rejectionReason
  };
}

export function mapToWorkEffortBackendValue(formValue: WorkEffortFormValue): WorkEffort {
  const zipAndCity = mapToPostalCodeAndCity(formValue.companyAddress.zipAndCity);
  return {
    id: formValue.id,
    applyDate: toISOLocalDate(formValue.date),
    ravAssigned: formValue.appliedThroughRav,
    applyChannel: {
      contactPerson: formValue.contactPerson,
      email: formValue.companyEmailAndUrl.email,
      formUrl: formValue.companyEmailAndUrl.url,
      phone: formValue.phone,
      types: mapApplyChannelsFormValueToBackend(formValue.applyChannels),
      address: {
        name: formValue.companyName,
        street: formValue.companyAddress.postOfficeBoxNumberOrStreet.street,
        houseNumber: formValue.companyAddress.postOfficeBoxNumberOrStreet.houseNumber,
        postalCode: zipAndCity ? zipAndCity.postalCode : undefined,
        country: formValue.companyAddress.countryIsoCode,
        city: zipAndCity ? zipAndCity.city : undefined,
        poBox: formValue.companyAddress.postOfficeBoxNumberOrStreet.postOfficeBoxNumber
      }
    },
    applyStatus: mapResultsFormValueToBackendResults(formValue.results),
    occupation: formValue.occupation,
    fullTimeJob: mapWorkloadToBackend(formValue.workload),
    rejectionReason: formValue.rejectionReason,
  };
}
