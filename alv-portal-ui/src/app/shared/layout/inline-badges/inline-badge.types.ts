import { JobBadgeType } from '../../../job-ad-search/job-badges-mapper.service';

export interface InlineBadge {
  badgeType: JobBadgeType;
  cssClass: string;
  label?: string;
  labelParams?: {};
}
