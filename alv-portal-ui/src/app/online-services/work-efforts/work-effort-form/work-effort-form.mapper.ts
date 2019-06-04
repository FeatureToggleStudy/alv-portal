import {
  WorkEffort,
  WorkEffortApplyChannel,
  WorkEffortResult
} from '../../../shared/backend-services/work-efforts/work-efforts.types';
import { mapToNgbDateStruct } from '../../../job-advertisement/job-publication/job-publication-form/job-publication-form.mapper';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { WorkLoad } from '../../../shared/backend-services/candidate/candidate.types';


export interface ApplyChannelsFormValue {
  ELECTRONIC: boolean,
  MAIL: boolean,
  PERSONAL: boolean,
  PHONE: boolean,
}

export const formPossibleApplyChannels = ['ELECTRONIC', 'MAIL', 'PERSONAL', 'PHONE'];


export interface ResultsFormValue {
  PENDING: boolean;
  REJECTED: boolean;
  EMPLOYED: boolean;
  INTERVIEW: boolean
}

export const formPossibleResults = ['PENDING', 'REJECTED', 'EMPLOYED', 'INTERVIEW'];

export enum WorkLoadFormOption {
  FULLTIME = "FULLTIME",
  PARTTIME = "PARTTIME"
};

export interface WorkEffortFormValue {
  companyName: string,
  date: NgbDateStruct,
  applyChannels: ApplyChannelsFormValue,
  companyAddress?: {
    countryIsoCode: string,
    postOfficeBoxNumberOrStreet: {
      street?: string,
      houseNumber?: string,
      postOfficeBoxNumber?: string
    }
    postalCode?: string;
    city: string,
  }
  contactPerson?: string,
  companyEmailAndUrl?: {
    email?: string,
    url?: string
  }
  phone?: string,
  occupation: string;
  appliedThroughRav: boolean;
  results: ResultsFormValue;
  rejectionReason: string;
  workload: WorkLoadFormOption;
}


const applyChannelOptionsKeys: string[] = Object.keys(WorkEffortApplyChannel);

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
  }
}

function mapResultsFormValueToBackendResults(results: ResultsFormValue): WorkEffortResult[] {
  return Object.keys(results).filter(resultKey => results[resultKey]) as WorkEffortResult[];
}

function mapApplyChannelsFormValueToBackend(applyChannels: ApplyChannelsFormValue): WorkEffortApplyChannel[] {
  return Object.keys(applyChannels).filter(channelKey => applyChannels[channelKey]) as WorkEffortApplyChannel[];
}

function mapNgbDateStructToString(struct: NgbDateStruct): string {
  return new Date(struct.year, struct.month-1, struct.day).toISOString();
}

function mapToWorkloadFormValue(isFulltime: boolean):WorkLoadFormOption {
  return isFulltime ? WorkLoadFormOption.FULLTIME : WorkLoadFormOption.PARTTIME;
}

/**
 *
 * @return true if full time
 */
function mapWorkloadToBackend(workLoadFormValue: WorkLoadFormOption): boolean {
  return workLoadFormValue===WorkLoadFormOption.FULLTIME;
}
export function mapToWorkEffortFormValue(workEffort: WorkEffort): WorkEffortFormValue {
  //todo fulltimejob
  return {
    companyName: workEffort.company.name,
    date: mapToNgbDateStruct(workEffort.date),
    applyChannels: mapToApplyChannelsFormValue(workEffort.applicationForms),
    companyAddress: {
      city: workEffort.company.city,
      countryIsoCode: workEffort.company.countryIsoCode,
      postOfficeBoxNumberOrStreet: {
        houseNumber: workEffort.company.houseNumber,
        postOfficeBoxNumber: workEffort.company.postOfficeBoxNumber || '',
        street: workEffort.company.street
      },
      postalCode: workEffort.company.postalCode
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
  // todo fulltime job
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
      postalCode: formValue.companyAddress.postalCode,
      name: formValue.companyName,
      city: formValue.companyAddress.city,

    },
    results: mapResultsFormValueToBackendResults(formValue.results),
    applicationForms: mapApplyChannelsFormValueToBackend(formValue.applyChannels),
    occupation: formValue.occupation,
    fullTimeJob: mapWorkloadToBackend(formValue.workload),
    rejectionReason: formValue.rejectionReason,
  }
}
