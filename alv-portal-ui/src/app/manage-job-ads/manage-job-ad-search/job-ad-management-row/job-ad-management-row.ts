import { JobAdvertisement } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { JobAdvertisementUtils } from '../../../shared/backend-services/job-advertisement/job-advertisement.utils';
import { JobAdvertisementRepository } from '../../../shared/backend-services/job-advertisement/job-advertisement.repository';

/**
 * A decorator around job advertisement for the representation of the
 * ManageJobAdSearch table row
 */
export class JobAdManagementRow {

  id: string;

  egov: string;

  avam: string;

  publicationDate: string;

  title: string;

  location: string;

  status: string;

  isCancellable: boolean;

  constructor(private jobAdvertisement: JobAdvertisement, private currentLanguage: string) {
    this.id = this.jobAdvertisement.id;
    this.egov = this.jobAdvertisement.stellennummerEgov;
    this.avam = this.jobAdvertisement.stellennummerAvam;
    this.publicationDate = this.jobAdvertisement.publication.startDate;
    this.title = JobAdvertisementUtils.getJobDescription(this.jobAdvertisement, this.currentLanguage).title;
    this.location = this.jobAdvertisement.jobContent.location.city;
    this.status = this.jobAdvertisement.status.toString();
    this.isCancellable = JobAdvertisementRepository.isJobAdvertisementCancellable(this.status);
  };

}


