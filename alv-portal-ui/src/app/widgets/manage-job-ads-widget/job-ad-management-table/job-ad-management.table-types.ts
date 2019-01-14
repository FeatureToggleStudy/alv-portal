import { JobAdvertisement } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';

export enum ManagedJobAdsSortingColumn {
  EGOV = 'jobAdvertisement.stellennummerEgov',
  AVAM = 'jobAdvertisement.stellennummerAvam',
  PUBLICATION_DATE = 'jobAdvertisement.publication.startDate',
  TITLE = 'jobAdvertisement.jobContent.jobDescriptions.title',
  LOCATION = 'jobAdvertisement.jobContent.location.city',
  STATUS = 'jobAdvertisement.status',
  OWNER_NAME = 'jobAdvertisement.owner.userDisplayName'
}

export enum SortDirection {
  DESC = 'DESC',
  ASC = 'ASC'
}

export interface MangedJobAdsSorting {
  column: ManagedJobAdsSortingColumn;
  direction: SortDirection;
}

export enum MangedJobAdsActionType {
  ON_CANCEL, ON_OPEN, ON_DUPLICATE
}

export interface MangedJobAdsAction {
  type: MangedJobAdsActionType;
  row: JobAdManagementRow;
}

export interface ManagedJobAdsSearchFilter {
  query: string;
  onlineSinceDays: number;
  ownerUserId: string;
  sort: MangedJobAdsSorting;
}

export interface JobAdManagementRow {
  jobAdvertisement: JobAdvertisement;
  title: string;
  isCancellable: boolean;
  detailRouterLink: string[];
}

export interface JobAdColumnDefinition {
  backendKey: ManagedJobAdsSortingColumn;
  columnName: string;
  render: (job: JobAdvertisement) => string;
}
