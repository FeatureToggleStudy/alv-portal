import { JobAdvertisement, JobDescription } from './job-advertisement.types';
import { FALLBACK_LANGUAGE } from '../../../core/languages.constants';

export class JobAdvertisementUtils {

  static getJobDescription(jobAdvertisement: JobAdvertisement, lang: string = FALLBACK_LANGUAGE): JobDescription {
    let jobDescription = jobAdvertisement.jobContent.jobDescriptions
      .find((jobDesc) => jobDesc.languageIsoCode === lang);
    if (!jobDescription) {
      jobDescription = jobAdvertisement.jobContent.jobDescriptions
        .find((jobDesc) => jobDesc.languageIsoCode === FALLBACK_LANGUAGE);
    }
    if (!jobDescription) {
      jobDescription = jobAdvertisement.jobContent.jobDescriptions[0];
    }
    return jobDescription;
  }
}
