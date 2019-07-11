export interface InlineBadge {
  cssClass: string;
  label?: string;
  labelParams?: {};
}

export interface FilterBadge extends InlineBadge {
  key: string; // is needed to identify the filter that corresponds to a badge
}
