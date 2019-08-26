export const enum CompanySource {
  'AVG',
  'UID'
}

export interface Company {
  id: string;
  externalId: string;
  name: string;
  street: string;
  zipCode: string;
  city: string;
  email: string;
  phone: string;
  source: CompanySource;

}

export enum FeatureCodeListErrors {
  NOT_FOUND_OR_ALREADY_TAKEN = 'http://www.job-room.ch/problem/feature-code-not-found-or-already-taken'
}
