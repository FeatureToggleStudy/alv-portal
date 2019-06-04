import {
  WorkEffort,
  WorkEffortApplyChannel,
  WorkEffortResult
} from '../../../shared/backend-services/work-efforts/work-efforts.types';
import { mapToNgbDateStruct } from '../../../job-advertisement/job-publication/job-publication-form/job-publication-form.mapper';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


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

export interface WorkEffortFormValue {
  date: NgbDateStruct,
  applyChannels: ApplyChannelsFormValue,
  companyAddress?: {
    countryIsoCode: string,
    postOfficeBoxNumberOrStreet: {
      street?: string,
      houseNumber?: string,
      postOfficeBoxNumber?: string
    }
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

function mapToResultsFormValue(results: WorkEffortResult[]): ResultsFormValue {
  return {
    EMPLOYED: results.includes(WorkEffortResult.EMPLOYED),
    INTERVIEW: results.includes(WorkEffortResult.INTERVIEW),
    PENDING: results.includes(WorkEffortResult.PENDING),
    REJECTED: results.includes(WorkEffortResult.REJECTED),
  }
}

export function mapToWorkEffortFormValue(workEffort: WorkEffort): WorkEffortFormValue {
  return {
    date: mapToNgbDateStruct(workEffort.date),
    applyChannels: mapToApplyChannelsFormValue(workEffort.applicationForms),
    companyAddress: {
      countryIsoCode: workEffort.company.countryIsoCode,
      postOfficeBoxNumberOrStreet: {
        houseNumber: workEffort.company.houseNumber,
        postOfficeBoxNumber: workEffort.company.postOfficeBoxNumber,
        street: workEffort.company.street
      }
    },
    companyEmailAndUrl: {
      email: workEffort.company.email,
      url: workEffort.company.applyFormUrl
    },
    occupation: workEffort.occupation,
    phone: workEffort.company.phone,
    results: mapToResultsFormValue(workEffort.results),
    contactPerson: workEffort.company.contactPerson,
    appliedThroughRav: workEffort.appliedThroughRav
  };
}
