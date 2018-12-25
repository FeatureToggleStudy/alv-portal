import { JobBadge } from '../../../job-ad-search/job-badges-mapper.service';

export interface ResultListItem {
  id: string;
  title: string;
  subtitle: string;
  badges: JobBadge[];
  header: string;
  description: string;
  routerLink: string[];
  visited: boolean;
}

