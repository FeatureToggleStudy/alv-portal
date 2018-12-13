import {
  hasImmediately,
  hasStartDate,
  isPermanent,
  isShortEmployment,
  isTemporary
} from '../job-ad-rules';
import { JobCenter } from '../../shared/backend-services/reference-service/reference-service.types';
import {
  JobAdvertisement,
  JobDescription
} from '../../shared/backend-services/job-advertisement/job-advertisement.types';

/**
 * A "view-model" for the Job-Detail Page that has all of our business logic in it to
 * avoid duplication and calculations in functions. Delegate pattern.
 */
export class JobDetailModel {

  constructor(public jobDescription: JobDescription, public jobCenter: JobCenter, public jobAdvertisement: JobAdvertisement) {
  }

  hasStartDate() {
    console.log('hasStartDate');
    debugger;
    return hasStartDate(this.jobAdvertisement);
  }

  hasImmediately() {
    return hasImmediately(this.jobAdvertisement);
  }

  isTemporary() {
    return isTemporary(this.jobAdvertisement);
  }

  isPermanent() {
    return isPermanent(this.jobAdvertisement);
  }

  isShortEmployment() {
    return isShortEmployment(this.jobAdvertisement);
  }

  get firstOccupation() {
    // We take only the first occupation for now, but theoretically the model
    // will allow us to have more than one occupation in the future
    const occupation = this.jobAdvertisement.jobContent.occupations[0];
    if (occupation.workExperience && occupation.educationCode) {
      return occupation;
    }
    return null;
  }

  get jobContent() {
    return this.jobAdvertisement.jobContent;
  }

  get employment() {
    return this.jobContent.employment;
  }

  get applyChannel() {
    return this.jobContent.applyChannel;
  }

  get publication() {
    return this.jobAdvertisement.publication;
  }

  get id() {
    return this.jobAdvertisement.id;
  }

  get stellennummerAvam() {
    return this.jobAdvertisement.stellennummerAvam;
  }

  get stellennummerEgov() {
    return this.jobAdvertisement.stellennummerEgov;
  }

}
