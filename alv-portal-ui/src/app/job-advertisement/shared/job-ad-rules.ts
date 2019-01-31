import { JobAdvertisement } from '../../shared/backend-services/job-advertisement/job-advertisement.types';

export function isTemporary(job: JobAdvertisement) {
  return !job.jobContent.employment.permanent && !job.jobContent.employment.endDate;
}

export function isPermanent(job: JobAdvertisement) {
  return job.jobContent.employment.permanent;
}

export function isShortEmployment(job: JobAdvertisement) {
  return Boolean(job.jobContent.employment.shortEmployment) && !job.jobContent.employment.permanent;
}

export function hasEndDate(job: JobAdvertisement) {
  return !job.jobContent.employment.permanent && Boolean(job.jobContent.employment.endDate) && !job.jobContent.employment.shortEmployment;
}

export function hasStartDate(job: JobAdvertisement) {
  return job.jobContent.employment.startDate;
}

export function hasImmediately(job: JobAdvertisement) {
  return job.jobContent.employment.immediately != null && !job.jobContent.employment.startDate;
}

export function isReportingObligation(job: JobAdvertisement) {
  return job.reportingObligation;
}

export function hasLocation(job: JobAdvertisement) {
  return job.jobContent.location;
}

export function isDeactivated(job: JobAdvertisement) {
  return job.status.toString() === 'CANCELLED' || job.status.toString() === 'ARCHIVED';
}

export function isExternal(job: JobAdvertisement) {
  return job.sourceSystem.toString() === 'EXTERN';
}

export function isUnvalidated(job: JobAdvertisement) {
  return job.sourceSystem.toString() === 'API' && !job.stellennummerAvam;
}
