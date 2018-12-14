import { JobAdvertisement } from '../shared/backend-services/job-advertisement/job-advertisement.types';

export const isTemporary = (job: JobAdvertisement) => {
  return !job.jobContent.employment.permanent && !job.jobContent.employment.endDate;
};

export const isPermanent = (job: JobAdvertisement) => {
  return job.jobContent.employment.permanent;
};

export const isShortEmployment = (job: JobAdvertisement) => {
  return Boolean(job.jobContent.employment.shortEmployment) && !job.jobContent.employment.permanent;
};

export const hasEndDate = (job: JobAdvertisement) => {
  return !job.jobContent.employment.permanent && Boolean(job.jobContent.employment.endDate) && !job.jobContent.employment.shortEmployment;
};

export const hasStartDate = (job: JobAdvertisement) => {
  return job.jobContent.employment.startDate;
};

export const hasImmediately = (job: JobAdvertisement) => {
  return job.jobContent.employment.immediately != null && !job.jobContent.employment.startDate;
};

export const isReportingObligation = (job: JobAdvertisement) => {
  return job.reportingObligation;
};

export const hasLocation = (job: JobAdvertisement) => {
  return job.jobContent.location;
};

export const isDeactivated = (job: JobAdvertisement) => {
  return job.status.toString() === 'CANCELLED' || job.status.toString() === 'ARCHIVED';
};

export const isExternal = (job: JobAdvertisement) => {
  return job.sourceSystem.toString() === 'EXTERN';
};

export const isUnvalidated = (job: JobAdvertisement) => {
  return job.sourceSystem.toString() === 'API' && !job.stellennummerAvam;
};
