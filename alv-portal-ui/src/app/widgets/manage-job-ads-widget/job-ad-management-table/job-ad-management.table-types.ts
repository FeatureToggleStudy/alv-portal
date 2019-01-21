import {
  JobAdvertisement,
  JobAdvertisementStatus
} from '../../../shared/backend-services/job-advertisement/job-advertisement.types';

export enum ManagedJobAdsSortingColumn {
  EGOV = 'jobAdvertisement.stellennummerEgov',
  AVAM = 'jobAdvertisement.stellennummerAvam',
  PUBLICATION_DATE = 'jobAdvertisement.publication.startDate',
  TITLE = 'jobAdvertisement.jobContent.jobDescriptions.title.keyword',
  LOCATION = 'jobAdvertisement.jobContent.location.city.keyword',
  STATUS = 'jobAdvertisement.status',
  OWNER_NAME = 'jobAdvertisement.owner.userDisplayName'
}

export enum SortDirection {
  DESC = 'DESC',
  ASC = 'ASC'
}

export interface ManagedJobAdsSorting {
  column: ManagedJobAdsSortingColumn;
  direction: SortDirection;
}

export enum ManagedJobAdsActionType {
  ON_CANCEL, ON_OPEN, ON_DUPLICATE
}

export interface ManagedJobAdsAction {
  type: ManagedJobAdsActionType;
  row: ManagedJobAdRow;
}

export interface ManagedJobAdsSearchFilter {
  query: string;
  status: JobAdvertisementStatus;
  onlineSinceDays: number;
  ownerUserId: string;
  sort: ManagedJobAdsSorting;
}

export interface ManagedJobAdRow {
  jobAdvertisement: JobAdvertisement;
  title: string;
  isCancellable: boolean;
  detailRouterLink: string[];
}

export interface ManagedJobAdColumnDefinition {
  column: ManagedJobAdsSortingColumn;
  sortingEnabled: boolean;
  columnName: string;
  render: (job: JobAdvertisement) => string;
}
