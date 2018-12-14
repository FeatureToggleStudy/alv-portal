import { JobAdvertisement, JobDescription } from './job-advertisement.types';
import { FALLBACK_LANGUAGE } from '../../../core/languages.constants';

export class JobAdvertisementUtils {

  static getJobDescription(jobAdvertisement: JobAdvertisement, lang: string = FALLBACK_LANGUAGE): JobDescription {
    return jobAdvertisement.jobContent.jobDescriptions
        .find(d => d.languageIsoCode === lang)
      || jobAdvertisement.jobContent.jobDescriptions[0];
  }
}
