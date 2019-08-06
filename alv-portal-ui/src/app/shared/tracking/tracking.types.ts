import { EXPAND_CONTACT_INFO } from '../../candidate/candidate-search/state-management/actions';

export enum CandidateSearchEventType {
  SEARCH_SUBMITTED = 'SEARCH_SUBMITTED',
  SEARCH_RESULTS_LOADED = 'SEARCH_RESULTS_LOADED',
  SELECT_CANDIDATE = 'SELECT_CANDIDATE',
}

export enum CandidateDetailsEventType {
  PREVIOUS_CANDIDATE_CLICKED = 'PREVIOUS_CANDIDATE_CLICKED',
  NEXT_CANDIDATE_CLICKED = 'NEXT_CANDIDATE_CLICKED',
  PRINT_PAGE_CLICKED = 'PRINT_PAGE_CLICKED',
  EMAIL_LINK_CLICKED = 'EMAIL_LINK_CLICKED',
  COPY_LINK_CLICKED = 'COPY_LINK_CLICKED',
  CANDIDATE_CONTACT_CLICKED = 'CANDIDATE_CONTACT_CLICKED',
  CANDIDATE_PHONE_CLICKED = 'CANDIDATE_PHONE_CLICKED',
  CANDIDATE_PROFILE_LOADED = 'CANDIDATE_PROFILE_LOADED',
  RAV_PHONE_CLICKED = 'RAV_PHONE_CLICKED',
  CANDIDATE_CONTACT_INFO_EXPANDED = 'CANDIDATE_CONTACT_INFO_EXPANDED'
}

export type TrackingTypes = CandidateSearchEventType | CandidateDetailsEventType;

export class TrackingEvent {
  locale?: string;
  trackingId?: string;

  constructor(public eventType: TrackingTypes, public data: { [key: string]: any; }) {
  }
}

