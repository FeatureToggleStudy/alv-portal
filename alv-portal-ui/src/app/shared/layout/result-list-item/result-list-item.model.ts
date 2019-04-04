import { InlineBadge } from '../inline-badges/inline-badge.types';

export interface ResultListItem {
  id: string;
  title: string;
  subtitle: string;
  badges: InlineBadge[];
  header: string;
  description: string;
  routerLink: string[];
  visited: boolean;
  hasActions?: boolean;
  isFavourite?: boolean;
  hasNote?: boolean;
}

